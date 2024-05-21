const express = require('express');
const run_rules = require('./rules_engine.js')
const app = express();
const port = 4000;

app.use(express.json());

const nools = require("nools");

// Load the flow from the .nools file

let flow = nools.compile("../Rules/rules.nools");

let SistemaLogico = flow.getDefined("SistemaLogico");


// POST request
app.post('/question', (req, res) => {
    // Create a session
    let session = flow.getSession();

    let sistemaLogico = new SistemaLogico();
    sistemaLogico.estado =req.body.question;

    // Insert the fact into the session
    session.assert(sistemaLogico);
    // Match the rules
    session.match(function(err){
        if(err){
            console.error(err.stack);
            return null
        }else{
            return res.status(201).json({options:sistemaLogico.opciones, message: sistemaLogico.mensaje});
        }
    })
    session.dispose();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});