const express = require("express");
const cors = require("cors");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
const passwordHash = require("password-hash");
const cryptoRandomString = require('crypto-random-string');
// Initialize mongodb 
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const uri = "mongodb+srv://<mongodb-username>:<mongodb-password>@<mongodb-uri>";
var db = null;
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology:true }, (err, client) => {
	if (err) throw err;
	db = client;
	app.listen(PORT);
});

app.use(cors());	//avoid CORS policy
app.use(bodyParser.json());	// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));	// parse application/x-www-form-urlencoded

router.get('/',(req,res) => {
    res.send("Nothing to see here, shh shh!");
});

router.post('/register', (req, res) =>{
	db.db("solvetheday").collection("users").findOne({username: req.body.usr}, (e1, r1) => {
		if (e1) throw e1;
		if (!r1){		//If not found username existing
			let data = {username: req.body.usr, password: passwordHash.generate(req.body.psw), fullname: req.body.fname};
			db.db("solvetheday").collection("users").insertOne(data, (err, result) => {
				if (err) throw err;
				if (result){
					db.db("solvetheday").collection("info").insertOne({username: req.body.usr}, (e, result_create) => {
						if (e) throw e;
						let response = {};
						response.status = "ok";
						response.message = "Registered!";
						res.send(response);
					});
				}
			})
		}	// If found username existing already
		else{
			let response = {};
			response.status = "error";
			response.message = "Username exists!";
			res.send(response);
		}
	})
});

router.post('/login', (req, res) => {
	var toFind = {"username": req.body.usr}
	// console.log(toFind);
	db.db("solvetheday").collection("users").findOne(toFind, (err, result) => {
		let response = {};
		// console.log(result);
		if (err)
			throw err;
		if (!result){
			response.status = "error";
			response.message = "notExist";
			res.send(response);
		}
		else{
			let verified = passwordHash.verify(req.body.psw, result.password);
			// console.log(verified);
			if (verified){
				let token = cryptoRandomString({length: 16});
				db.db("solvetheday").collection("token").insertOne({username: req.body.usr, token: token}, (e, r) =>{
					if (e) throw e;
				});
				response.status = "ok";
				response.message = "authorized";
				response.token = token;
				res.send(response);
			}
			else{
				response.status = "error";
				response.message = "unauthorized";
				res.send(response);
			}
		}
	})
});

router.post('/verify', (req, res) => {
	var toFind = {username: req.body.usr, token: req.body.token};
	// console.log(toFind);
	db.db("solvetheday").collection("token").findOne(toFind, (err, result) => {
		if (err) throw err;
		// console.log(result);
		let response = {};
		if (result){
			response.status = "ok";
		}
		else{
			response.status = "error";
		}
		res.send(response);
	})
});

router.post('/addnew', (req, res) => {
	let query = {username: req.body.username};
	let month_num = {Jan: "01", Feb: "02", Mar: "03", Apr: "04", May : "05", Jun : "06", Jul : "07",
								Aug : "08", Sep : "09", Oct : "10", Nov : "11", Dec : "12"};
	let month = month_num[req.body.date.substr(0,3)];
	let date = req.body.date.substr(4,2);
	let year = req.body.date.substr(7,4);
				
	let ndate = {month: month, date: date, year: year, std: year+month+date};
	
	let insertData = {name: req.body.name, note: req.body.note, 
		amount: req.body.amount, date: ndate, category: req.body.category};
	// console.log(query, insertData);
	db.db("solvetheday").collection("info").updateOne(query, {"$push":  {"expends" :insertData}}, (err, result) => {
		if (err) throw err;
		if (result){
			let response = {};
			response.status = "ok";
			response.message = "Added new";
			res.send(response);
		}
		else{
			let response = {};
			response.status = "error";
			response.message = "Did not add anything!";
			res.send(response);
		}
	});
});

function compare( a, b ) {
  if ( a.date.std < b.date.std ){
    return -1;
  }
  if ( a.date.std > b.date.std ){
    return 1;
  }
  return 0;
}

router.post('/getExpends', (req, res) => {
	let query = {username: req.body.username};
	let projection = {_id: 0, expends: 1};
	db.db("solvetheday").collection("info").findOne(query, {projection:projection}, (err, result) => {
		if (err) throw err;
		let response = {};
		if (result.expends){
			response.status = "ok";
			response.message = "Found expends";
			response.expends = result.expends.sort(compare).reverse();
			res.send(response);
		} else {
			response.status = "error";
			response.message = "not found any!";
			response.expends = [];
			res.send(response);
		}
	});
});

router.get('/wake', (req, res) => {
	res.send("ok");
});

app.use(router);
