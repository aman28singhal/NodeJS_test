const express = require("express");
const mysql = require("mysql");
const url = require("url")

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password", // Enter you password here
    database: "testDetails"
});

//Insert a candidate into database
app.post("/api/candidate/new", (req, res) => {
    //  api/candidate/new?name=NAME&email=EMAIL
    //  http://localhost:3001/api/candidate/new?name=aman&email=aman@gmail.com
    let name = req.query.name;
    let email = req.query.email;
    var insert = "insert into candidate (name, email) values (?, ?)";
    db.query(insert, [name, email], (err, result) => {
        if(err) console.log(err)
        else {
            res.send("Inserted Candidate");
        }
    })
})

//Assign score for a candidate based on the test
app.post("/api/test/:id/:round/assign", (req, res) => {
    //  api/test/:CANDIDATE_ID/:ROUND/assign?score=SCORE
    //  http://localhost:3001/api/test/1/1/assign?score=8
    let id = req.params.id;
    let round = req.params.round;
    let score = req.query.score;
    var candidate_check = "select * from candidate where id=?";
    db.query(candidate_check, id, (err, result) => {
        if(err) console.log(err)
        else {
            if(result.length >0){
                var insert = "insert into test (candidate_id , round, score) values (?, ?, ?)";
                db.query(insert, [id,round, score], (err, result) => {
                if(err) console.log(err)
                else {
                    res.send("Score Inserted");
                }
                })
            } else {
                res.send("Candidate with ID:"+ id +" doesn't exist");
            }
        }
    })
})

// highest scoring candidate
app.get("/api/test/highest", (req, res) => {
    //  http://localhost:3001/api/test/highest
    var highest = "SELECT t.candidate_id, c.name, SUM(t.score) as Total from test t JOIN candidate c ON c.id = t.candidate_id GROUP BY candidate_id ORDER BY Total desc LIMIT 1"
    db.query(highest, (err, result) => {
        if(err) console.log(err)
        else{
            res.send(result);
        }
    })
})

//  average scores per round for all candidates
app.get("/api/test/avg", (req, res) => {
    //  http://localhost:3001/api/test/avg
    var highest = "SELECT round, AVG(score) as Average from test GROUP BY round"
    db.query(highest, (err, result) => {
        if(err) console.log(err)
        else{
            res.send(result);
        }
    })
})



app.listen(3001, (err) => {
    if(err) console.log(err)
    else console.log("API Server running...")
})