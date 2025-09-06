const Block = require("./Block"); // Capital B

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newData) {
    const latestBlock = this.getLatestBlock();
    const newBlock = new Block(this.chain.length, Date.now(), newData, latestBlock.hash);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      if (current.hash !== current.calculateHash()) return false;
      if (current.previousHash !== previous.hash) return false;
    }
    return true;
  }

  printChain() {
    console.log(JSON.stringify(this.chain, null, 2));
  }
}

module.exports = Blockchain;
