document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input-meeting-room");
  const cells = document.querySelectorAll(".cell");
  input.focus();

  const roomNameAndId = [
    ["polaris", "CR01"],
    ["waypoint", "CR02"],
    ["pilotage", "CR03"],
    ["logbook", "CR04"],
    ["gps", "CR05"],
    ["longitude", "CR06"],
    ["latitude", "CR07"],
    ["landfall", "CR08"],
    ["aquamarine", "FR01"],
    ["larimar", "FR02"],
    ["pearl", "FR03"],
    ["abalone", "FR04"],
    ["coral", "FR05"],
    ["agate", "FR06"],
    ["calcite", "FR07"],
    ["jasper", "FR08"],
    ["seaglass", "FR09"],
    ["sandstone", "FR10"],
    ["oyster", "FR13"],
    ["hyacinth", "FR14"],
    ["basalt", "FR15"],
    ["kelps", "FR16"],
    ["pondweed", "FR17"],
    ["gabbro", "FR18"],
    ["hydrilla", "FR19"],
    ["brook", "FR20"],
    ["creek", "FR21"],
    ["rill", "FR22"],
    ["current", "MR01"],
    ["flow", "MR02"],
    ["torrent", "MR03"],
    ["cascade", "MR04"],
    ["rapids", "MR05"],
    ["drifts", "MR06"],
    ["delta", "MR07"],
    ["waterfall", "MR08"],
    ["reservoir", "MR09"],
    ["jetstream", "MR10"],
    ["riverine", "MR11"],
    ["streamline", "MR12"],
    ["splash", "MR13"],
    ["bayview", "MR14"],
    ["wave", "MR15"],
    ["aalto", "MR16"],
    ["samudra", "MR17"],
    ["mahasagar", "MR18"],
    ["paniyam", "MR19"]
  ];

  const locationMap = new Map(roomNameAndId);

  input.addEventListener("input", () => {
    // Clear all highlights
    cells.forEach((cell) => cell.classList.remove("highlight"));

    const id = input.value.trim().toLowerCase();

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
      input.style.borderStyle = "solid";
    }

    const findCellFromName = (name) => {
      const id = locationMap.get(name)?.toLowerCase();
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
