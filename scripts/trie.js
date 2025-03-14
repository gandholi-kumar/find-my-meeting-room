class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

export class Trie {
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
