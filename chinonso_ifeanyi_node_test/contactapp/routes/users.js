var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/connect_list');
var router = express.Router();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('We are connected');
});

 
let Schema = mongoose.Schema;

let userSchema = new Schema({
	name: String, 
	email: String, 
	phone: String,
	password: String
});


let User = mongoose.model('User', userSchema);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res, next) {
	let password =req.body.password;
	var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(password, salt);
	let createUsers = new User({
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		password: hash
	 });
	createUsers.save(function (err,result) {
		if (err) return handleError(err);
  		res.status(200).send(result);
  	});
});


router.post('/login', function(req, res, next) {
  //res.send('respond with a resource');
  let email = req.body.email;
  User.find({email:email},( function(err,result){
  	 let password =req.body.password;
		if(result == false){
			res.send('User does not exist!');	
		}else{
			password = bcrypt.compareSync(req.body.password, result[0].password);
			//console.log(password);
			if(password){
				res.send(result);
			}else{
					res.send('Password does not match!');
			}
			
		}
	}));
});


router.delete('/', function(req, res, next) {
	User.remove({_id:req.body.id}, function(err,result){
		if(err)
			res.send(err);
		res.send('Post deleted successfully!');
	});
});

module.exports = router;
