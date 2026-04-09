const express = require('express');
const notesRouter = require('./routes/notes');

const app = express();

app.use(express.json());
app.use('/notes', notesRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
