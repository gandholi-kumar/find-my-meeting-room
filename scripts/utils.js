import {
  highlightCell,
  showSuggestions,
  removeBorderOnEmptyInput,
  removeAllHighlightedCells,
  roomNameAndIdMapper,
} from "./suggestionDropdown.js";
import { debounce } from "./debounce.js";
import { Trie } from "./trie.js";

const input = document.getElementById("searchBox");

const onInputChange = () => {
  input.addEventListener("input", () => {
    debouncedShowSuggestions(createTrie());
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

const createTrie = () => {
  const trie = new Trie();
  roomNameAndIdMapper.forEach((value, key) => {
    trie.insert(key);
    trie.insert(value);
  });
  return trie;
};

export const onDocumentLoad = () => {
  createMeetingRooms();
  onLoadFocusInputBox();
  onInputChange();
};

const debouncedShowSuggestions = debounce(showSuggestions, 200);
