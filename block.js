class Block {
  // wrapping parameters into objects allows us to put input arguments in any order upon creation
  constructor({ timestamp, lastHash, hash, data }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }
}

module.exports = Block;
