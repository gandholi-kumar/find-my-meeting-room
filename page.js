document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input-meeting-room");
  const cells = document.querySelectorAll(".cell");

  input.focus();
  input.addEventListener("input", () => {
    // Clear all highlights
    cells.forEach((cell) => cell.classList.remove("highlight"));

    let id = input.value.trim().toLowerCase();

    const locationMap = new Map([
      ["longitude", "CR06"],
      ["latitude", "CR07"],
      ["landfall", "CR08"],
      ["oyster", "FR13"],
      ["pondweed", "FR17"],
      ["gabbro", "FR18"],
      ["hydrilla", "FR19"],
      ["brook", "FR20"],
      ["creek", "FR21"],
      ["rill", "FR22"],
      ["jetstream", "MR10"],
      ["wave", "MR15"],
      ["aalto", "MR16"],
      ["samudra", "MR17"],
      ["mahasagar", "MR18"],
      ["paniyam", "MR19"],
      ["collab area work cafe", "Collab Area Work Cafe"],
      ["da04", "DA04"],
      ["polaris", "CR01"],
      ["waypoint", "CR02"],
      ["aquamarine", "FR01"],
      ["larimar", "FR02"],
      ["pearl", "FR03"],
      ["abalone", "FR04"],
      ["coral", "FR05"],
      ["agate", "FR06"],
      ["current", "MR01"],
      ["flow", "MR02"],
      ["torrent", "MR03"],
      ["cascade", "MR04"],
      ["rapids", "MR05"],
      ["da01", "DA01"],
      ["gps", "CR05"],
      ["hyacinth", "FR14"],
      ["basalt", "FR15"],
      ["kelps", "FR16"],
      ["riverine", "MR11"],
      ["streamline", "MR12"],
      ["splash", "MR13"],
      ["bayview", "MR14"],
      ["da03", "DA03"]
    ]);

    if (id === "") {
      input.style.border = "none";
      return;
    }

    const cellFound = (cell) => {
      cell.classList.add("highlight");
      input.style.borderColor = "green";
      input.style.borderStyle = "solid";
    }

    const cellNotFound = () => {
      input.style.borderColor = "red";
    }

    const findCellFromName = (name) => {
      id = locationMap.get(name).toLowerCase();
      return document.getElementById(`cell-${id}`);
    }

    let cell = document.getElementById(`cell-${id}`);

    if (cell) {
      cellFound(cell);
    } else {
      cell = findCellFromName(id);
      if (cell) {
        cellFound(cell);
      } else {
        cellNotFound();
      }
    }
  });
});
