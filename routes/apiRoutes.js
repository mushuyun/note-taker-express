var db = require("../db/db.json");
const fs = require("fs");


module.exports = function(app){
      
    app.get("/api/notes", (req, res) => {
        fs.readFile("./db/db.json", "utf8", (err, data) => {
          if (err) throw err;
          res.json(JSON.parse(data)); // NEED TO PARSE AS JSON
        });
      });
        
    app.post("/api/notes", (req, res) => {

        let notes = db;

        newNote = req.body;
        notes.push(newNote);
        
        fs.writeFile("./db/db.json", JSON.stringify(db), err =>{
            if (err) throw err;
            res.json(notes);
            });
    });   
       
    app.delete("/api/notes/:id", function (req, res) {
        
        let id = req.params.id;
    
        fs.readFile("./db/db.json", "utf8", (error, data) => {
          if (error) throw error;
    
          data = JSON.parse(data);
          db = data.filter(note => id !== note.id);
    
          fs.writeFile("./db/db.json", JSON.stringify(db), (error, data) => {
            if (error) throw error;
    
            res.json(db);
          });
        });
      });
    }
    