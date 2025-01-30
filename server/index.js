const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

// Basic route to test
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('DB connection error:', err));