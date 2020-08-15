const Block = require('./block');
const cryptoHash = require('./crypto-hash');

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

    // go through every block after genesis
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const actualLastHash = chain[i - 1].hash;

      // check to see if the lastHash is consistant to previous blocks hash
      const { timestamp, lastHash, hash, data } = block;
      if (lastHash !== actualLastHash) return false;

      // checks to see if hash matches
      const validatedHash = cryptoHash(timestamp, lastHash, data);
      if (hash !== validatedHash) return false;
    }
    return true;
  }
  
  // not static because it's based on an instance of an object
  replaceChain(chain) {
    // if chain length is shorter or equivalent, no need for change and also it doesn't meet our rules
    if (chain.length <= this.chain.length) {
      return;
    }

    // if hashes or data is altered, ignore and exit out of the chain
    if (!Blockchain.isValidChain(chain)) {
      return;
    }
    // replace the updated chain with the new and longer chain
    this.chain = chain;
  }
}

module.exports = Blockchain;