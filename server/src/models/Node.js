class Node {
  constructor(name, id, index) {
    this.name = name;
    this.id = id;
    this.index = index;
    this.category = index;
    this.value = 1;
    this.symbolSize = 2;
  }

  addValue() {
    this.value += 1;
  }

  getIndex() {
    return this.index;
  }

  getValue() {
    return this.value;
  }

  setSymbolSize(symbolSize) {
    this.symbolSize = symbolSize;
  }

  addAdjacent(node) {
    this.adjacents.push(node);
  }

  removeAdjacent(node) {
    const index = this.adjacents.indexOf(node);
    if (index > -1) {
      this.adjacents.splice(index, 1);
      return node;
    }
  }

  getAdjacents() {
    return this.adjacents;
  }

  isAdjacent(node) {
    return this.adjacents.indexOf(node) > -1;
  }
}

module.exports = Node;
