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

    let hash;
    let timestamp;

    const lastHash = lastBlock.hash;
    const { difficulty } = lastBlock;
    let nonce = 0;

    // keep generating hash until it meets difficulty
    do {
      nonce++;
      timestamp = Date.now();
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

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
    const difference = timestamp - originalBlock.timestamp;
    if (difference > MINE_RATE) {
      return difficulty - 1;
    } else if (difference < MINE_RATE) {
      return difficulty + 1;
    }
  }
}

module.exports = Block;
