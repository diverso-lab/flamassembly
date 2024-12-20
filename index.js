import { prepareWASM, runFlamapyMethod } from "./src/js/flamapy.js";
import { showLoading, hideLoading, enableOperationButtons, updateResult } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {

    console.log("DOMContentLoaded");

    // Prepare Pyodide and Flamapy, enable buttons when ready
    prepareWASM(() => {
        enableOperationButtons();
        console.log("Flamapy is ready to operate.");
    });

    // Function to get UVL content dynamically
    const getUVLContent = async () => {
        const uvlFileElement = document.getElementById('uvlfile');

        // Example: UVL content from a textarea or input field
        if (uvlFileElement && uvlFileElement.value) {
            return uvlFileElement.value;
        }

        // Example: Load UVL content from a file input or external file
        const fileInput = document.getElementById('uvlfileinput');
        if (fileInput && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            return await file.text(); // Read file content as text
        }

        throw new Error("UVL content is not available");
    };

    // Assign events to operation buttons
    document.querySelectorAll('.operation').forEach(button => {
        button.addEventListener("click", async () => {
            const param = button.getAttribute("data-param");

            console.log(`Executing operation with parameter: ${param}`);

            try {
                // Get UVL content dynamically
                const uvlContent = await getUVLContent();

                // Call Flamapy method with the selected parameter and UVL content
                await runFlamapyMethod(param, uvlContent, showLoading, hideLoading, updateResult);
            } catch (err) {
                console.error("Error executing the operation:", err);
            }
        });
    });

});
