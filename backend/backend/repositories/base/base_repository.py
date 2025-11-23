from fastapi import Depends
from core.dependencies import get_session
from sqlalchemy.ext.asyncio import AsyncSession
from abc import ABC

from typing import Any, List, Optional, Union, Tuple
from sqlalchemy.future import select
from sqlalchemy import Select, func

from models.base.base_entity_model import BaseEntityModel


class BaseRepository(ABC):
    def __init__(self, db: AsyncSession = Depends(get_session)):
        self.db = db

    async def add(self, entity: BaseEntityModel):
        self.db.add(entity)
        # flush para gerar valores (ex: defaults, timestamps) sem finalizar transação
        await self.db.flush()

    async def add_all(self, entities: List[BaseEntityModel]):
        self.db.add_all(entities)
        await self.db.flush()

    async def get_by(
        self, model_type: type, attr: str, value: Any, one: bool = False
    ) -> Union[Optional[Any], List[Any]]:
        column: Any = getattr(model_type, attr, None)
        query = select(model_type).filter(column == value)
        result = await self.db.execute(query)
        if one:
            entity: Any = result.scalars().unique().first()
            return entity
        entities: List[Any] = result.scalars().unique().all()
        return entities

    async def get(self, model_type: type, id: int) -> Optional[Any]:
        return await self.get_by(model_type=model_type, attr="id", value=id, one=True)

    async def get_columns(self, model_type: type, columns: List[str]) -> List[Any]:
        available_columns = [getattr(model_type, column, None) for column in columns]
        available_columns = [
            column for column in available_columns if column is not None
        ]
        if not available_columns:
            return []
        query: Select[Tuple] = Select(*available_columns)
        result = await self.db.execute(query)
        elements: List[Any] = result.scalars().unique().all()
        return elements

    async def get_entity_with_max_column_value(
        self, model_type: type, filter_data: dict, column_name: str
    ) -> Optional[Any]:
        column = getattr(model_type, column_name, None)
        if column is None:
            raise ValueError(f"O atributo '{column_name}' não existe no modelo.")
        base_query = self.__get_filter_query(
            filter_data=filter_data, model_type=model_type
        )
        subquery = base_query.subquery()
        query = select(func.max(getattr(subquery.c, column_name)))
        max_value_result = await self.db.execute(query)
        max_value = max_value_result.scalar()
        if max_value is None:
            return None
        query_for_entity_with_max_value = select(model_type).filter(column == max_value)
        result = await self.db.execute(query_for_entity_with_max_value)
        entity = result.scalars().first()
        return entity

    def __query_for_interval(
        self, intervals: List[Tuple], query: Select[Tuple], model_type: type
    ) -> Select[Tuple]:
        intervals_dict = dict(intervals)
        stems: dict = {}
        for key in intervals_dict:
            stem = key.split("__")[0]
            if stems.get(stem, None) is not None:
                continue
            start = intervals_dict.get(stem + "__start", None)
            end = intervals_dict.get(stem + "__end", None)
            column = getattr(model_type, stem, None)
            if start == end and start is not None:
                query = self.__query_for_point(query, column, start, end)
            else:
                if start is not None:
                    query = self.__query_for_start_interval(query, column, start)
                if end is not None:
                    query = self.__query_for_end_interval(query, column, end)
            stems[stem] = 1
        return query

    def __query_for_point(
        self,
        query: Select[Tuple],
        column: Any,
        start_value: List[Any],
        end_value: List[Any],
    ) -> Select[Tuple]:
        return query.filter(column >= start_value, column <= end_value)

    def __query_for_start_interval(
        self, query: Select[Tuple], column: Any, start_value: Any
    ) -> Select[Tuple]:
        return query.filter(column >= start_value)

    def __query_for_end_interval(
        self, query: Select[Tuple], column: Any, start_value: Any
    ) -> Select[Tuple]:
        return query.filter(column <= start_value)

    def __query_for_common_attributes(
        self, common_attributes: List[Tuple], query: Select[Tuple], model_type: type
    ) -> Select[Tuple]:
        for attr, value in common_attributes:
            column = getattr(model_type, attr, None)
            if column is not None and value is not None:
                if isinstance(value, str):
                    query = query.filter(column.ilike(f"%{value}%"))
                else:
                    query = query.filter(column == value)
        return query

    def __get_filter_query(
        self, filter_data: dict, model_type: type, query: Select[Tuple] = None
    ) -> Select[Tuple]:
        query = select(model_type) if query is None else query
        items = filter_data.items()
        intervals = [
            (attr, value)
            for attr, value in items
            if str(attr).endswith("__start") or str(attr).endswith("__end")
        ]
        not_intervals = list(set(items) - set(intervals))
        query = self.__query_for_interval(
            intervals=intervals, query=query, model_type=model_type
        )
        query = self.__query_for_common_attributes(
            common_attributes=not_intervals, query=query, model_type=model_type
        )
        return query

    async def filter(self, filter_data: dict, model_type: type) -> List[Any]:
        query = self.__get_filter_query(filter_data=filter_data, model_type=model_type)
        result = await self.db.execute(query)
        entities: List[Any] = result.scalars().unique().all()
        return entities

    async def filter_and_get_first(
        self, filter_data: dict, model: type
    ) -> Optional[Any]:
        entities: List[Any] = await self.filter(
            filter_data=filter_data, model_type=model
        )
        return entities[0] if entities else None

    async def filter_records(
        self, filter_data: dict, model_type: type, return_keys: bool = True
    ) -> Any:
        query: Select[Tuple] = Select(*model_type.__table__.columns)
        query = self.__get_filter_query(
            filter_data=filter_data, model_type=model_type, query=query
        )
        result = await self.db.execute(query)
        records = result.all()
        if not return_keys:
            return records
        keys = result.keys()
        return records, keys

    async def filter_columns(
        self, model_type: type, filter_data: dict, columns: List[str]
    ) -> List[Any]:
        selected_columns = [getattr(model_type, col, None) for col in columns]
        selected_columns = [col for col in selected_columns if col is not None]
        if not selected_columns:
            return []
        query: Select[Tuple] = select(*selected_columns)
        query = self.__get_filter_query(
            filter_data=filter_data, model_type=model_type, query=query
        )
        result = await self.db.execute(query)
        elements: List[Any] = result.scalars().unique().all()
        return elements

    async def edit(self, entity: BaseEntityModel) -> Any:
        self.db.add(entity)
        await self.db.flush()
        return entity

    async def remove(self, entity: BaseEntityModel) -> None:
        await self.db.delete(entity)
        await self.db.flush()
