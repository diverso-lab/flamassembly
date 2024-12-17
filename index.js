import { prepareWASM, runFlamapyMethod } from "./src/js/flamapy.js";
import { showLoading, hideLoading, enableOperationButtons, updateResult } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    
    prepareWASM(enableOperationButtons);

    document.querySelectorAll('.operation').forEach(button => {
        button.addEventListener("click", () => {
            const param = button.getAttribute("data-param");
            runFlamapyMethod(param, showLoading, hideLoading, updateResult);
        });
    });
});
