let pyodide;

const loadAndRunPythonScript = async (scriptPath, functionCall) => {
    try {
        const response = await fetch(scriptPath);
        const pythonScript = await response.text();
        await pyodide.runPythonAsync(`${pythonScript}\n${functionCall}`);
    } catch (err) {
        console.error(`Error ejecutando el script Python desde ${scriptPath}:`, err);
        throw err;
    }
};

export const prepareWASM = async (onReadyCallback) => {
    try {
        pyodide = await loadPyodide();
        await pyodide.loadPackage("micropip");
        console.log("Micropip cargado.");

        await loadAndRunPythonScript("src/packages.py", "await install_flamapy_packages()");
        console.log("Paquetes de Flamapy instalados.");

        if (onReadyCallback && typeof onReadyCallback === "function") {
            onReadyCallback();
        }
    } catch (err) {
        console.error("Error preparando Pyodide y Flamapy:", err);
    }
};

export const runFlamapyMethod = async (param, showLoadingCallback, hideLoadingCallback, resultCallback) => {
    if (showLoadingCallback) showLoadingCallback();

    try {
        // Exponer la función callback en Pyodide
        pyodide.globals.set("callback", resultCallback);

        await loadAndRunPythonScript(
            "src/flamapy_methods.py",
            `run_flamapy_method("${param}", callback)`
        );
    } catch (err) {
        console.error("Error ejecutando Flamapy:", err);
    } finally {
        if (hideLoadingCallback) hideLoadingCallback();
    }
};
