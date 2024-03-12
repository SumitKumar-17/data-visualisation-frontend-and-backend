const express = require('express');
const fs = require('fs')
const cors= require('cors');



const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());
app.use(cors());

// Endpoint to get all users from data.json
app.post('/api', (req, res) => {
  fs.readFile('jsondata.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    try {
      const jsonData = JSON.parse(data);
    //   const users = jsonData.users;
      res.json(jsonData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("POST request to the homepage");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
