console.log("Creating the Web Worker...");
const worker = new Worker('./src/js/pyodideWorker.js');
console.log("Web Worker created.");

// Configure the message handler
worker.onmessage = (event) => {
    console.log("Message received from the Worker:", event.data);

    const { type, message, result } = event.data;

    if (type === "ready") {
        console.log("Pyodide is ready.");
        if (worker.onReadyCallback) worker.onReadyCallback(); // Call the preparation callback
    } else if (type === "result") {
        console.log("Result received from the Worker:", result);
        if (worker.onResultCallback) worker.onResultCallback(result);
    } else if (type === "error") {
        console.error("Error in the Worker:", message);
        if (worker.onErrorCallback) worker.onErrorCallback(message);
    } else {
        console.warn("Unknown message type:", type);
    }
};

// Prepare Pyodide and load packages
export const prepareWASM = (onReadyCallback) => {
    console.log("Sending 'prepareWASM' message to the Worker...");
    worker.onReadyCallback = onReadyCallback; // Store the callback
    worker.postMessage({ type: "prepareWASM" });
    console.log("Sent 'prepareWASM' message to the Worker...");
};

// Execute Flamapy methods
export const runFlamapyMethod = (param, showLoadingCallback, hideLoadingCallback, resultCallback) => {
    if (showLoadingCallback) showLoadingCallback();

    // Store the callback for the result
    worker.onResultCallback = (result) => {
        if (resultCallback) resultCallback(result);
        if (hideLoadingCallback) hideLoadingCallback();
    };

    worker.onErrorCallback = (message) => {
        console.error("Error executing method:", message);
        if (hideLoadingCallback) hideLoadingCallback();
    };

    // Get the UVL file content from the DOM
    const fileContent = document.getElementById('uvlfile').value;

    console.log("Sending 'runFlamapyMethod' message to the Worker...");
    worker.postMessage({
        type: "runFlamapyMethod",
        data: { param, fileContent },
    });
};
