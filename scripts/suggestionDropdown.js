import { fourthFloorRoomNameAndId } from "./constants.js";

const input = document.getElementById("searchBox");
export const roomNameAndIdMapper = new Map(fourthFloorRoomNameAndId);

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

export const removeBorderOnEmptyInput = () => {
  if (input.value.trim() === "") {
    input.style.border = "none";
    return;
  }
};

export const removeAllHighlightedCells = () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.classList.remove("highlight"));
};

export const highlightCell = () => {
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

const onSelection = (match, suggestionsDiv) => {
  document.getElementById("searchBox").value = match;
  suggestionsDiv.style.display = "none"; // Hide dropdown after selection
  highlightCell();
  input.focus();
  input.select();
};

// Hide suggestions when clicking outside
document.addEventListener("click", function (event) {
  const searchBox = document.getElementById("searchBox");
  const suggestionsDiv = document.getElementById("suggestions");
  if (!searchBox.contains(event.target) && !suggestionsDiv.contains(event.target)) {
    suggestionsDiv.style.display = "none";
  }
});

export const showSuggestions = (trie) => {
  const input = document.getElementById("searchBox")?.value;
  const suggestionsDiv = document.getElementById("suggestions");
  suggestionsDiv.innerHTML = "";

  if (input.length === 0) {
    suggestionsDiv.style.display = "none";
    return;
  }

  const matches = trie.searchPrefix(input);

  if (matches.length === 0) {
    suggestionsDiv.style.display = "none";
    return;
  }

  matches.forEach((match) => {
    const div = document.createElement("div");
    div.classList.add("suggestion-item");
    div.textContent = match;
    div.tabIndex = 0;
    div.onkeydown = (e) => {
      if (e.key === "ArrowDown") {
        div.nextSibling.focus();
      } else if (e.key === "ArrowUp") {
        div.previousSibling.focus();
      } else if (e.key === "Enter") {
        onSelection(match, suggestionsDiv);
      }
    };

    div.onclick = () => {
      onSelection(match, suggestionsDiv);
    };
    suggestionsDiv.appendChild(div);
  });

  suggestionsDiv.style.display = "block"; // Show dropdown if matches found
};
