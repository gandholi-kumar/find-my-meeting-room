import { fourthFloorRoomNameAndId } from "./constants.js";

const input = document.getElementById("input-meeting-room");
const cells = document.querySelectorAll(".cell");
const roomNameAndIdMapper = new Map(fourthFloorRoomNameAndId);

const onCellNotFound = () => {
  input.style.borderColor = "red";
  input.style.borderStyle = "solid";
};

const onCellFound = (cell) => {
  cell.classList.add("highlight");
  input.style.borderColor = "green";
  input.style.borderStyle = "solid";
};

const findCellFromName = (name) => {
  const id = roomNameAndIdMapper.get(name)?.toLowerCase();
  return document.getElementById(`cell-${id}`);
};

const highlightCell = () => {
  const id = input?.value?.trim().toLowerCase();

  if (id === "") {
    removeBorderOnEmptyInput();
    return;
  }

  let getCellId = document.getElementById(`cell-${id}`);
  if (getCellId) {
    onCellFound(getCellId);
    return;
  }

  getCellId = findCellFromName(id);
  getCellId ? onCellFound(getCellId) : onCellNotFound();
};

const removeBorderOnEmptyInput = () => {
  if (input.value.trim() === "") {
    input.style.border = "none";
    return;
  }
};

const removeAllHighlightedCells = () => {
  cells.forEach((cell) => cell.classList.remove("highlight"));
};

const onInputChange = () => {
  input.addEventListener("input", () => {
    removeAllHighlightedCells();
    removeBorderOnEmptyInput();
    highlightCell();
  });
};

const onLoadFocusInputBox = () => {
  input.focus();
};

const createMeetingRoom = (id) => {
  const cell = document.createElement("div");
  cell.id = `cell-${id}`;
  cell.classList.add("cell", `${id}`);
  cell.ariaLabel = id;
  cell.textContent = id.toUpperCase();
  cell.tabIndex = 0;
  return cell;
};

const createMeetingRooms = () => {
  const floorDiv = document.querySelector(".floor");

  roomNameAndIdMapper.forEach((value, _key) => {
    const cell = createMeetingRoom(value.toLowerCase());
    floorDiv?.appendChild(cell);
  });
};

export const onDocumentLoad = () => {
  createMeetingRooms();
  onLoadFocusInputBox();
  onInputChange();
};
