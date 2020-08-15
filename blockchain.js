const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  // add blocks after creation of genesis block, appends after previous block
  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data
    });

    this.chain.push(newBlock);
  }

  // checks to see if chain doesn't have discrepancies
  static isValidChain(chain) {
    // use stringify to convert objects into string values, and compare them if they are the same values
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

    // check to see if the lastHash is consistant to previous blocks hash
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const actualLastHash = chain[i - 1].hash;
      const { timestamp, lastHash, hash, data } = block;
      if (lastHash !== actualLastHash) return false;
    }
  }
}

module.exports = Blockchain;