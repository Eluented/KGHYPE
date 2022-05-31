const app = require('./app')
const DB = require('./configs/database');

DB.connect();

const port = process.env.PORT || 3001;

// starting the server
app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});