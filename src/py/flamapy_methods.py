from collections.abc import Iterable
from flamapy.interfaces.python.flamapy_feature_model import FLAMAFeatureModel
import inspect


def requires_with_sat(method):
    signature = inspect.signature(method)
    return 'with_sat' in signature.parameters


def run_flamapy_method(file_content, param, callback):
    # Verificar el contenido del archivo
    if not isinstance(file_content, str):
        raise ValueError("El contenido del archivo debe ser una cadena válida.")

    # Escribir el contenido del archivo UVL en un archivo temporal
    with open("uvlfile.uvl", "w") as text_file:
        text_file.write(file_content)

    # Cargar el modelo de características
    fm = FLAMAFeatureModel("uvlfile.uvl")

    # Ejecutar el método solicitado
    if requires_with_sat(getattr(fm, param)):
        result = getattr(fm, param)(with_sat=True)
    else:
        result = getattr(fm, param)()

    # Formatear el resultado si es iterable
    if isinstance(result, Iterable):
        result = "<br>".join([f'P({i}): {p}' for i, p in enumerate(result, 1)])

    # Enviar el resultado al callback
    callback(result)
