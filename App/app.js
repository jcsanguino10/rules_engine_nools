const express = require('express');
const run_rules = require('run_rules')
const app = express();
const port = 4000;

// POST request
app.post('/question', (req, res) => {
    const newQuestion = req.body; 
    let res = run_rules(newQuestion.question)
    res.status(201).json(res);
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});