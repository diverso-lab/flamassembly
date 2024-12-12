const uvlfile = document.getElementById("uvlfile");
let pyodide;

function showLoading() {
    document.getElementById("loading").style.display = "initial";
}

function hideLoading() {
    document.getElementById("loading").style.display = "none";
}

async function preparare_WASM() {
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

    // Habilitar botones después de la preparación
    const operationButtons = document.querySelectorAll('.operation');
    operationButtons.forEach(button => {
        button.disabled = false;
    });
}

async function flamapy(param) {
    showLoading();

    try {
        // Ejecutar el código Python directamente desde una cadena
        await pyodide.runPythonAsync(`
            import js
            from collections.abc import Iterable
            from flamapy.interfaces.python.flamapy_feature_model import FLAMAFeatureModel
            import inspect

            def requires_with_sat(method):
                signature = inspect.signature(method)
                return 'with_sat' in signature.parameters

            file_content = js.document.getElementById('uvlfile').value
            div = js.document.createElement("result")

            with open("uvlfile.uvl", "w") as text_file:
                print(file_content, file=text_file)

            fm = FLAMAFeatureModel("uvlfile.uvl")

            if requires_with_sat(fm.${param}):
                result = fm.${param}(with_sat=True)
            else:
                result = fm.${param}()

            if isinstance(result, Iterable):
                result = "<br>".join([f'P({i}): {p}' for i, p in enumerate(result, 1)])

            div.innerHTML = "<div id='deleteme'>"+str(result)+"</div>"
            exists = js.document.getElementById('deleteme')
            if exists:
                exists.remove()

            js.document.getElementById('result').append(div)
        `);
    } catch (err) {
        console.error("Error ejecutando Flamapy:", err);
    } finally {
        hideLoading();
    }
}
