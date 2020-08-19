const hexToBinary = require("hex-to-binary");
const { GENESIS_DATA, MINE_RATE } = require('./config');
const cryptoHash = require('./crypto-hash');

class Block {
  // wrapping parameters into objects allows us to put input arguments in any order upon creation
  constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  // factory method because we are calling on an instance of the class
  static genesis() {
    return new Block(GENESIS_DATA);
  }

  static mineBlock( { lastBlock, data }) {
    const lastHash = lastBlock.hash;
    let hash;
    let timestamp;
    let { difficulty } = lastBlock;
    let nonce = 0;

    // keep generating hash until it meets difficulty
    do {
      nonce++;
      timestamp = Date.now();
      // difficulty will dynamically change based on timestamp of previous block and next
      difficulty = Block.adjustDifficulty({ originalBlock: lastBlock, timestamp });
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
      // convert hex to binary form for harder proof of work, but hex hash is the same
    } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this({
      timestamp,
      lastHash,
      data,
      difficulty,
      nonce,
      hash: cryptoHash(timestamp, lastHash, data, nonce, difficulty)
    });
  }

  // adjust difficulty based on how long it takes to make a block
  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;
    // if we ever encounter a situation where difficulty becomes 0 or lower, set it back to 1
    if (difficulty < 1) return 1;
    const difference = timestamp - originalBlock.timestamp;
    if (difference > MINE_RATE) {
      return difficulty - 1;
    }
    return difficulty + 1;
  }
}

module.exports = Block;
