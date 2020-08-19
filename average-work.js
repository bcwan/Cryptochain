const Blockchain = require('./blockchain');

const blockchain = new Blockchain();

blockchain.addBlock({ data: 'initial '})

console.log('first block', blockchain.chain[blockchain.chain.length - 1]);

// timestamps help us generate hashes
let prevTimestamp;
let nextTimestamp;
let nextBlock;
let timeDiff;

// average time it takes to generate a block, which will help adjust difficulty level
let average;

// store times a block is made
let times = [];

// generate 10,000 blocks
for (let i = 0; i < 10000; i++) {
  prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;

  blockchain.addBlock({ data: `block ${i}`});
  // get the recently added block
  nextBlock = blockchain.chain[blockchain.chain.length - 1];

  nextTimestamp = nextBlock.timestamp;
  timeDiff = nextTimestamp - prevTimestamp;
  times.push(timeDiff);

  average = times.reduce((total, num) => (total + num)) / times.length;

  //console.log(`Time to mine block: ${timeDiff}ms. Difficulty: ${nextBlock.difficulty}. Average time: ${average}ms`)
}