// Archivo: ui.js

const uvlfile = document.getElementById("uvlfile");

function showLoading() {
    document.getElementById("loading").style.display = "initial";
}

function hideLoading() {
    document.getElementById("loading").style.display = "none";
}

function enableOperationButtons() {
    const operationButtons = document.querySelectorAll('.operation');
    operationButtons.forEach(button => {
        button.disabled = false;
    });
}

function updateResult(content) {
    const div = document.createElement("div");
    div.id = "deleteme";
    div.innerHTML = content;

    const existingResult = document.getElementById("deleteme");
    if (existingResult) {
        existingResult.remove();
    }

    document.getElementById("result").append(div);
}
