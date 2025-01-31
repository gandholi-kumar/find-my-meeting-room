document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("cell-id");
  const cells = document.querySelectorAll(".cell");

  input.addEventListener("input", () => {
    // Clear all highlights
    cells.forEach((cell) => cell.classList.remove("highlight"));

    const id = input.value.trim().toLowerCase();
    const cell = document.getElementById(`cell-${id}`);

    if (cell) {
      cell.classList.add("highlight");
    }
  });
});
