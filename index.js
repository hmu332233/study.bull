const Queue = require('bull');


const testQueue = new Queue('testQueue2', {
  redis: {
    host: '',
    port: 0,
  }
});

const options = {
  // delay: 60000, // 1 min in ms
  attempts: 2
};

// 3. Consumer
testQueue.process(async (job, done) => {
  console.log(job.id, job.attemptsMade)
  // job.data contains the custom data passed when the job was created
  // job.id contains id of this job.


  setTimeout(() => {
    done(null, job.data);
  }, job.data);
  // or give a error if error
  

});

testQueue.on('completed', function(job, result){
  console.log(result);
  // Job completed with output result!
})


testQueue.add(100, options);
testQueue.add(1000, options);
testQueue.add(100, options);
testQueue.add(1000, options);
