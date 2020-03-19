var db = require("../db/db.json");
const fs = require("fs");
//const uuid = require(uuid);

module.exports = function(app){
    app.get("/api/notes", (req, res)=> {

        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            res.json(data);
        });
        
    });
       
        
    app.post("/api/notes", (req, res) => {

        let notes = db;
        newNote = req.body;
        notes.push(newNote);
        
        fs.writeFile("./db/db.json", JSON.stringify(db, null, 2), err =>{
            if (err) throw err;
            res.json(notes);
            });
    });   
       

    app.delete("api/notes/:id", (req, res) => {

         id = req.params.id;

        fs.readFile("./db/db.json", "utf8", (err, data) =>{
            if (err) throw err;

            data = JSON.parse(data);

            db = data.filter(note => id !== note.id);

            fs.writeFile("./db/db.json", JSON.stringify(db), (err, data) => {
                if (err) throw err;
                res.json(db);
            });

        });
    });
}