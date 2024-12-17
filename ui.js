export const showLoading = () => {
    document.getElementById("loading").style.display = "initial";
};

export const hideLoading = () => {
    document.getElementById("loading").style.display = "none";
};

export const enableOperationButtons = () => {
    console.log("activating enableOperationButtons");
    document.querySelectorAll('.operation').forEach(button => button.disabled = false);
};

export const updateResult = (content) => {
    const resultContainer = document.getElementById("result");
    const existingResult = document.getElementById("deleteme");
    if (existingResult) existingResult.remove();

    const div = document.createElement("div");
    div.id = "deleteme";
    div.innerHTML = content;
    resultContainer.append(div);
};
