const crypto = require("crypto");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data; 
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const blockString = this.index + this.timestamp + this.data + this.previousHash;
    return crypto.createHash("sha256").update(blockString).digest("hex");
  }
}

module.exports = Block;
