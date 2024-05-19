const nools = require("nools");

// Load the flow from the .nools file

let flow = nools.compile("../Rules/rules.nools");

let SistemaLogico = flow.getDefined("SistemaLogico");

function run_rules(estado) {
    // Create a session
    let session = flow.getSession();

    let sistemaLogico = new SistemaLogico();
    sistemaLogico.estado =estado;

    // Insert the fact into the session
    session.assert(sistemaLogico);

    // Match the rules
    session.match(function(err){
        if(err){
            console.error(err.stack);
            
        }else{
            return {"options":sistemaLogico.options, "message": sistemaLogico.mensaje}
        }
    })
    session.dispose();
}

run_rules("Inicio")

module.exports = run_rules;
