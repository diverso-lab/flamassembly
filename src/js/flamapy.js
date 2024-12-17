let pyodide;

const loadAndRunPythonScript = async (scriptPath, functionCall) => {
    try {
        const response = await fetch(scriptPath);
        const pythonScript = await response.text();
        await pyodide.runPythonAsync(`${pythonScript}\n${functionCall}`);
    } catch (err) {
        console.error(`Error executing Python script from ${scriptPath}:`, err);
        throw err;
    }
};

export const prepareWASM = async (onReadyCallback) => {
    try {
        pyodide = await loadPyodide();
        await pyodide.loadPackage("micropip");

        await loadAndRunPythonScript("src/py/packages.py", "await install_flamapy_packages()");

        if (onReadyCallback && typeof onReadyCallback === "function") {
            onReadyCallback();
        }
    } catch (err) {
        console.error("Error preparing Pyodide and Flamapy:", err);
    }
};

export const runFlamapyMethod = async (param, showLoadingCallback, hideLoadingCallback, resultCallback) => {
    if (showLoadingCallback) showLoadingCallback();

    try {
        // Expose the callback function in Pyodide
        pyodide.globals.set("callback", resultCallback);

        await loadAndRunPythonScript(
            "src/py/flamapy_methods.py",
            `run_flamapy_method("${param}", callback)`
        );
    } catch (err) {
        console.error("Error running Flamapy:", err);
    } finally {
        if (hideLoadingCallback) hideLoadingCallback();
    }
};
