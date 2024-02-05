const express = require('express');
const sql = require("./src/config/db.js");
const app = express();
app.use('/api/pokemons', require('./src/config/routes/routesPokemons.js'))

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

