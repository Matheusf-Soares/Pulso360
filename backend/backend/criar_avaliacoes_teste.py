"""
Script para criar avaliações de teste no banco de dados.
"""

import asyncio
import uuid
from datetime import datetime, timedelta
from sqlalchemy import text

from backend.core.database import Session


async def criar_avaliacoes_teste():
    """Cria avaliações de teste no banco de dados."""
    async with Session() as session:
        try:
            # Buscar usuários existentes
            result = await session.execute(
                text("SELECT id, nome, email FROM usuario LIMIT 5")
            )
            usuarios = result.fetchall()

            if len(usuarios) < 2:
                print(
                    "❌ Não há usuários suficientes no banco. Execute criar_usuario_teste.py primeiro."
                )
                return

            # Buscar ou criar ciclo de avaliação
            result = await session.execute(
                text("SELECT id FROM ciclo_avaliacao LIMIT 1")
            )
            ciclo = result.fetchone()

            if not ciclo:
                print("Criando ciclo de avaliação...")
                novo_ciclo_id = uuid.uuid4()
                await session.execute(
                    text(
                        """
                    INSERT INTO ciclo_avaliacao (id, nome, descricao, data_inicio, data_fim, status)
                    VALUES (:id, :nome, :descricao, :data_inicio, :data_fim, :status)
                    """
                    ),
                    {
                        "id": novo_ciclo_id,
                        "nome": "Ciclo de Avaliação 2024 - Q4",
                        "descricao": "Avaliação de desempenho do quarto trimestre de 2024",
                        "data_inicio": datetime.now() - timedelta(days=30),
                        "data_fim": datetime.now() + timedelta(days=30),
                        "status": "ativo",
                    },
                )
                ciclo_id = novo_ciclo_id
            else:
                ciclo_id = ciclo[0]

            print(f"Usando ciclo: {ciclo_id}")

            # Criar avaliações de teste
            avaliacoes = [
                {
                    "avaliado_id": usuarios[0][0],
                    "avaliador_id": usuarios[1][0],
                    "tipo": "gestor",
                    "status": "em_andamento",
                    "nota_global": None,
                },
                {
                    "avaliado_id": usuarios[0][0],
                    "avaliador_id": usuarios[0][0],
                    "tipo": "autoavaliacao",
                    "status": "concluida",
                    "nota_global": 8.5,
                },
                {
                    "avaliado_id": usuarios[1][0],
                    "avaliador_id": usuarios[0][0],
                    "tipo": "gestor",
                    "status": "rascunho",
                    "nota_global": None,
                },
            ]

            if len(usuarios) >= 3:
                avaliacoes.append(
                    {
                        "avaliado_id": usuarios[1][0],
                        "avaliador_id": usuarios[2][0],
                        "tipo": "360",
                        "status": "aguardando",
                        "nota_global": None,
                    }
                )

            for avaliacao_data in avaliacoes:
                avaliacao_id = uuid.uuid4()
                await session.execute(
                    text(
                        """
                    INSERT INTO avaliacao 
                    (id, avaliado_id, avaliador_id, ciclo_id, tipo, status, nota_global, data_criacao)
                    VALUES (:id, :avaliado_id, :avaliador_id, :ciclo_id, :tipo, :status, :nota_global, :data_criacao)
                    """
                    ),
                    {
                        "id": avaliacao_id,
                        "avaliado_id": avaliacao_data["avaliado_id"],
                        "avaliador_id": avaliacao_data["avaliador_id"],
                        "ciclo_id": ciclo_id,
                        "tipo": avaliacao_data["tipo"],
                        "status": avaliacao_data["status"],
                        "nota_global": avaliacao_data["nota_global"],
                        "data_criacao": datetime.now(),
                    },
                )
                print(
                    f"✅ Avaliação criada: {avaliacao_data['tipo']} - {avaliacao_data['status']}"
                )

            await session.commit()
            print("\n✅ Avaliações de teste criadas com sucesso!")

        except Exception as e:
            await session.rollback()
            print(f"❌ Erro ao criar avaliações: {e}")
            raise


if __name__ == "__main__":
    asyncio.run(criar_avaliacoes_teste())
