let pyodide;

async function loadAndRunPythonScript(scriptPath, functionCall) {
    try {
        const response = await fetch(scriptPath);
        const pythonScript = await response.text();
        await pyodide.runPythonAsync(pythonScript + `\n${functionCall}`);
    } catch (err) {
        console.error(`Error ejecutando el script Python desde ${scriptPath}:`, err);
        throw err;
    }
}

async function prepareWASM() {
    try {
        // Cargar Pyodide y micropip
        pyodide = await loadPyodide();
        await pyodide.loadPackage("micropip");
        console.log("Micropip cargado.");

        // Cargar y ejecutar el script de instalación de paquetes
        await loadAndRunPythonScript("packages.py", "await install_flamapy_packages()");
        console.log("Paquetes de Flamapy instalados.");

        enableOperationButtons();
    } catch (err) {
        console.error("Error preparando Pyodide y Flamapy:", err);
    }
}

async function runFlamapyMethod(param) {
    showLoading();

    try {
        await loadAndRunPythonScript("flamapy_methods.py", `run_flamapy_method("${param}")`);
    } catch (err) {
        console.error("Error ejecutando Flamapy:", err);
    } finally {
        hideLoading();
    }
}