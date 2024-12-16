// Archivo: flamapy.js

let pyodide;

async function prepareWASM() {
    try {
        // Cargar Pyodide y micropip
        pyodide = await loadPyodide();
        await pyodide.loadPackage("micropip");
        console.log("Micropip cargado.");

        // Instalar los paquetes necesarios usando micropip
        await pyodide.runPythonAsync(`
            import micropip
            await micropip.install("flamapy==2.0.0", deps=False)
            await micropip.install("flamapy-fw==2.0.0")
            await micropip.install("flamapy-fm==2.0.0")
            await micropip.install("flamapy-sat==2.0.0")
        `);
        console.log("Paquetes de Flamapy instalados.");

        // Habilitar botones de operación
        enableOperationButtons();
    } catch (err) {
        console.error("Error preparando Pyodide y Flamapy:", err);
    }
}

async function runFlamapyMethod(param) {
    showLoading();

    try {
        await pyodide.runPythonAsync(`
            import js
            from collections.abc import Iterable
            from flamapy.interfaces.python.flamapy_feature_model import FLAMAFeatureModel
            import inspect

            def requires_with_sat(method):
                signature = inspect.signature(method)
                return 'with_sat' in signature.parameters

            file_content = js.document.getElementById('uvlfile').value

            with open("uvlfile.uvl", "w") as text_file:
                print(file_content, file=text_file)

            fm = FLAMAFeatureModel("uvlfile.uvl")

            if requires_with_sat(fm.${param}):
                result = fm.${param}(with_sat=True)
            else:
                result = fm.${param}()

            if isinstance(result, Iterable):
                result = "<br>".join([f'P({i}): {p}' for i, p in enumerate(result, 1)])

            js.updateResult(str(result))
        `);
    } catch (err) {
        console.error("Error ejecutando Flamapy:", err);
    } finally {
        hideLoading();
    }
}
