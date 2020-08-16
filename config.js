const INITIAL_DIFFICULTY = 3;

// hard coded data for genesis or global values
const GENESIS_DATA = { 
  timestamp: 1,
  lastHash: '-----',
  hash: 'hash-one',
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  data: []
}

module.exports = { GENESIS_DATA };