from pydantic._internal._model_construction import ModelMetaclass 

class IntervalMeta(ModelMetaclass):
    def __new__(mcs, name, bases, attrs):
        annotations = attrs.get('__annotations__', {})
        new_annotations = {}
        new_values = {}

        for attr_name in list(annotations.keys()):
            if attr_name.endswith('__interval'):
                stem = attr_name[:-10]  # removes '__interval'
                type_ = annotations[attr_name]

                new_annotations[f'{stem}__start'] = type_
                new_annotations[f'{stem}__end'] = type_

                new_values[f'{stem}__start'] = None
                new_values[f'{stem}__end'] = None

                del annotations[attr_name]
                if attr_name in attrs:
                    del attrs[attr_name]

        annotations.update(new_annotations)
        attrs.update(new_values)
        attrs['__annotations__'] = annotations

        return super().__new__(mcs, name, bases, attrs)