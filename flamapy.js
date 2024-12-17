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

const prepareWASM = async () => {
    try {
        pyodide = await loadPyodide();
        await pyodide.loadPackage("micropip");
        console.log("Micropip cargado.");

        await loadAndRunPythonScript("packages.py", "await install_flamapy_packages()");
        console.log("Paquetes de Flamapy instalados.");

        enableOperationButtons();
    } catch (err) {
        console.error("Error preparando Pyodide y Flamapy:", err);
    }
};

const runFlamapyMethod = async (param) => {
    showLoading();
    try {
        await loadAndRunPythonScript("flamapy_methods.py", `run_flamapy_method("${param}")`);
    } catch (err) {
        console.error("Error ejecutando Flamapy:", err);
    } finally {
        hideLoading();
    }
};