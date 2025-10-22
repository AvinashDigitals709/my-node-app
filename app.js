// app.js
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Simple route
app.get('/', (req, res) => {
  res.send('Hello from Jenkins Node.js App!');
});

// Start server only if not in test mode
if (require.main === module) {
  app.listen(PORT,"0.0.0.0",() => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
