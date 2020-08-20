const express = require("express");
const path = require("path");


const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });
  
  app.get("/api/notes", function (req, res) {
    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8", function(err, data){
      if (err) throw err;
      return data;
    }));
    res.json(notes);
  });
  app.post("/api/notes", function (req, res) {
    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8", function(err, data){
      if (err) throw err;
      return data;
    }));
    req.body.id = uuidv4()
    notes.push(req.body)
    fs.writeFile("./db/db.json", JSON.stringify(notes), "UTF-8", function(err) {
      if (err) throw err
      res.end()
    })
  })
  app.delete("/api/notes/:id", function(req, res) {
    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8", function(err, data){
      if (err) throw err;
      return data;
    }));
    const newNotes = notes.filter(note => note.id !== req.params.id)
    fs.writeFile("./db/db.json", JSON.stringify(newNotes), "UTF-8", function(err) {
      if (err) throw err
      res.end()
    })
  })
  
  
  
  
  
  
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });