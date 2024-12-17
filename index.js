import { prepareWASM, runFlamapyMethod } from "./src/flamapy.js";
import { showLoading, hideLoading, enableOperationButtons, updateResult } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("Pasando enableOperationButtons como callback:", enableOperationButtons);
    prepareWASM(enableOperationButtons);

    document.querySelectorAll('.operation').forEach(button => {
        button.addEventListener("click", () => {
            const param = button.getAttribute("data-param");
            runFlamapyMethod(param, showLoading, hideLoading);
        });
    });
});