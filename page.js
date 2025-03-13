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
  ["paniyam", "MR19"],
];

const locationMap = new Map(roomNameAndId);

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchBox");
  input.focus();
  input.addEventListener("input", debouncedShowSuggestions);
});

class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    word = word.toLowerCase();
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEnd = true;
  }

  searchPrefix(prefix) {
    prefix = prefix.toLowerCase();
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) return [];
      node = node.children[char];
    }
    return this._getWordsFromNode(node, prefix);
  }

  _getWordsFromNode(node, prefix) {
    let results = [];
    if (node.isEnd) results.push(prefix);
    for (let char in node.children) {
      results.push(...this._getWordsFromNode(node.children[char], prefix + char));
    }
    return results;
  }
}

const trie = new Trie();
// const rooms = ["Deluxe Room", "Deluxe King", "Standard Room", "Suite", "Family Suite", "Penthouse", "pearl"];
// rooms.forEach((room) => trie.insert(room));
roomNameAndId.flat().forEach((room) => trie.insert(room));

let debounceTimeout;

function debounce(func, delay) {
  return function (...args) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => func(...args), delay);
  };
}

function showSuggestions() {
  const input = document.getElementById("searchBox").value;
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
    div.onclick = () => {
      document.getElementById("searchBox").value = match;
      suggestionsDiv.style.display = "none"; // Hide dropdown after selection

      highlightCell();
    };
    suggestionsDiv.appendChild(div);
  });

  suggestionsDiv.style.display = "block"; // Show dropdown if matches found
}

const debouncedShowSuggestions = debounce(showSuggestions, 200);

// Hide suggestions when clicking outside
document.addEventListener("click", function (event) {
  const searchBox = document.getElementById("searchBox");
  const suggestionsDiv = document.getElementById("suggestions");
  if (!searchBox.contains(event.target) && !suggestionsDiv.contains(event.target)) {
    suggestionsDiv.style.display = "none";
  }
});

function highlightCell() {
  const cells = document.querySelectorAll(".cell");
  // Clear all highlights
  cells.forEach((cell) => cell.classList.remove("highlight"));
  const input = document.getElementById("searchBox");

  const id = input.value.trim().toLowerCase();

  if (id === "") {
    input.style.border = "none";
    return;
  }

  const cellFound = (cell) => {
    cell.classList.add("highlight");
    input.style.borderColor = "green";
    input.style.borderStyle = "solid";
  };

  const cellNotFound = () => {
    input.style.borderColor = "red";
    input.style.borderStyle = "solid";
  };

  const findCellFromName = (name) => {
    const id = locationMap.get(name)?.toLowerCase();
    return document.getElementById(`cell-${id}`);
  };

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
}
