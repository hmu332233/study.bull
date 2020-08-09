const Queue = require('bull');


const testQueue = new Queue('testQueue', {
  redis: {
    host: '',
    port: ,
  }
});

const options = {
  delay: 60000, // 1 min in ms
  attempts: 2
};

// 2. Adding a Job to the Queue
testQueue.add({ data: 'hello!' }, options);


// 3. Consumer
testQueue.process(async job => {
  console.log(job)
  return new Promise((resolve, reject) => {
    resolve();
  });
});