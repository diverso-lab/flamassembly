console.log("Importing Pyodide from CDN.");
importScripts("https://cdn.jsdelivr.net/pyodide/v0.23.3/full/pyodide.js");
console.log("Pyodide imported from CDN.");

let pyodide;

// Initialize Pyodide and the required packages
const initializePyodide = async () => {
    try {
        console.log("Initializing Pyodide...");
        pyodide = await loadPyodide();
        console.log("Pyodide successfully loaded.");

        await pyodide.loadPackage("micropip");
        console.log("Micropip package successfully loaded.");

        const scriptPath = "../py/packages.py";
        await loadAndRunPythonScript(scriptPath, "await install_flamapy_packages()");
        console.log("Flamapy packages successfully installed.");
    } catch (error) {
        console.error("Error initializing Pyodide:", error);
        throw error;
    }
};

// Load and execute a Python script
const loadAndRunPythonScript = async (scriptPath, functionCall) => {
    try {
        console.log(`Loading script from: ${scriptPath}`);
        const response = await fetch(scriptPath);
        if (!response.ok) {
            throw new Error(`Failed to load script from ${scriptPath}: ${response.statusText}`);
        }
        const pythonScript = await response.text();
        console.log(`Script successfully loaded: ${scriptPath}`);
        return await pyodide.runPythonAsync(`${pythonScript}\n${functionCall}`);
    } catch (error) {
        console.error("Error loading or executing Python script:", error);
        throw error;
    }
};

// Handle messages sent to the Worker
self.onmessage = async (event) => {
    console.log("Message received in Worker:", event.data);

    if (!event.data || !event.data.type) {
        console.error("Message does not have a valid 'type':", event.data);
        return;
    }

    const { type, data } = event.data;
    console.log("Processing message with type:", type);

    try {
        if (type === "prepareWASM") {
            console.log("Received message 'prepareWASM'");
            console.log("Preparing Pyodide...");
            await initializePyodide();
            console.log("Preparation completed.");
            self.postMessage({ type: "ready" });
        } else if (type === "runFlamapyMethod") {
            console.log("Executing Flamapy method...");
            const { param, fileContent } = data;

            pyodide.globals.set("callback", (result) => {
                console.log("Result of 'run_flamapy_method':", result);
                self.postMessage({ type: "result", result });
            });

            const scriptPath = "../py/flamapy_methods.py";
            await loadAndRunPythonScript(
                scriptPath,
                `run_flamapy_method(${JSON.stringify(fileContent)}, "${param}", callback)`
            );
        } else {
            console.warn("Unknown message type:", type);
        }
    } catch (error) {
        console.error("Error in Worker:", error);
        self.postMessage({ type: "error", message: error.message });
    }
};
