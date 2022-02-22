// console.log('simple node')

// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
//run command ---- node app.js



console.log('I am running!')
const express = require('express');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  region: 'ap-south-1',
})
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const port = 3000
app.use(cors());

app.get('/get-signed-url', async (req, res) => {
  await s3.createPresignedPost({
    Fields: {
      key: uuidv4(),
    },
    Conditions: [
      ["starts-with", "$Content-Type", "video/"],
      ["content-length-range", 0, 10000000000],
    ],
    Expires: 3000,
    Bucket: 'courseporium',
  }, (err, signed) => {
    res.json(signed);
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})