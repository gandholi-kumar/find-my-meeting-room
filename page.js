document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input-meeting-room");
  const cells = document.querySelectorAll(".cell");

  input.focus();
  input.addEventListener("input", () => {
    // Clear all highlights
    cells.forEach((cell) => cell.classList.remove("highlight"));

    const id = input.value.trim().toLowerCase();

    if (id === "") {
      input.style.border = "none";
      return;
    }

    const cell = document.getElementById(`cell-${id}`);

    if (cell) {
      cell.classList.add("highlight");
      input.style.borderColor = "green";
      input.style.borderStyle = "solid";
    } else {
      console.log("else ");
      input.style.borderColor = "red";
    }
  });
});
