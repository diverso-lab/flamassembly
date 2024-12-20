import {prepareWASM, runFlamapyMethod} from "./src/js/flamapy.js";
import { showLoading, hideLoading, enableOperationButtons, updateResult } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {

    console.log("DOMContentLoaded");

    // Prepare Pyodide and Flamapy, enable buttons when ready
    prepareWASM(() => {
        enableOperationButtons();
        console.log("Flamapy is ready to operate.");
    });

    // Assign events to operation buttons
    document.querySelectorAll('.operation').forEach(button => {
        button.addEventListener("click", async () => {
            const param = button.getAttribute("data-param");

            console.log(`Executing operation with parameter: ${param}`);

            try {
                // Call Flamapy method with the selected parameter
                await runFlamapyMethod(param, showLoading, hideLoading, updateResult);
            } catch (err) {
                console.error("Error executing the operation:", err);
            }
        });
    });
    
});
