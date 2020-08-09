const Queue = require('bull');


const testQueue = new Queue('testQueue2', {
  redis: {
    host: '',
    port: 0,
  },
  limiter: {
    max: 2,
    duration: 1000,
  }
});

const options = {
  // delay: 60000, // 1 min in ms
  attempts: 2
};

// 3. Consumer
testQueue.process(async (job) => {
  // console.log(job)
  // job.data contains the custom data passed when the job was created
  // job.id contains id of this job.

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(job.data);
    }, job.data);
  });

  return promise;
});

testQueue.on('completed', function(job, result){
  console.log(job.id);
  console.log(job.processedOn - job.finishedOn);
  // Job completed with output result!
})


testQueue.add(100, options);
testQueue.add(100, options);

testQueue.add(100, options);
testQueue.add(100, options);

testQueue.add(100, options);
testQueue.add(100, options);

