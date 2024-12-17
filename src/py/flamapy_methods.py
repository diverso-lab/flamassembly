import js
from collections.abc import Iterable
from flamapy.interfaces.python.flamapy_feature_model import FLAMAFeatureModel
import inspect


def requires_with_sat(method):
    signature = inspect.signature(method)
    return 'with_sat' in signature.parameters


def run_flamapy_method(param, callback):
    file_content = js.document.getElementById('uvlfile').value
    with open("uvlfile.uvl", "w") as text_file:
        print(file_content, file=text_file)

    fm = FLAMAFeatureModel("uvlfile.uvl")

    if requires_with_sat(getattr(fm, param)):
        result = getattr(fm, param)(with_sat=True)
    else:
        result = getattr(fm, param)()

    if isinstance(result, Iterable):
        result = "<br>".join([f'P({i}): {p}' for i, p in enumerate(result, 1)])

    callback(result)
