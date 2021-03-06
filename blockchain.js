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

      // get last difficulty to make sure malicious user won't change it
      const lastDifficulty = chain[i - 1].difficulty;

      // check to see if the lastHash is consistant to previous blocks hash
      const { timestamp, lastHash, hash, data, nonce, difficulty  } = block;
      if (lastHash !== actualLastHash) return false;

      // checks to see if hash matches
      const validatedHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
      if (hash !== validatedHash) return false;

      // prevents difficulties from going too low, which is what malicious users want
      // also prevents difficulties from going to high, because blocks are slowly mined then, freezing the blockchain
      if (Math.abs(lastDifficulty - difficulty) > 1) return false; 
    }
    return true;
  }
  
  // not static because it's based on an instance of an object
  replaceChain(chain) {
    // if chain length is shorter or equivalent, no need for change and also it doesn't meet our rules
    if (chain.length <= this.chain.length) {
      console.error('The incoming chain must be longer');
      return;
    }

    // if hashes or data is altered, ignore and exit out of the chain
    if (!Blockchain.isValidChain(chain)) {
      console.error('The incoming chain must be valid');
      return;
    }

    console.log('Replacing chain with', chain)
    // replace the updated chain with the new and longer chain
    this.chain = chain;
  }
}

module.exports = Blockchain;