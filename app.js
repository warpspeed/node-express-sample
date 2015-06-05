var http    = require('http'),
	path    = require('path'),
	express = require('express'),
	bodyParser = require('body-parser'),
	MongoClient = require('mongodb').MongoClient;


var app = express();

var db = require('./db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', './views');
app.set('view engine', 'html');
app.engine('html', require('hogan-express'));

app.use('/', require('./controllers/tasks'));
app.use(express.static('public'));

db.connect('mongodb://localhost:27017/tasklist', function(err) {
	if (err) {
		console.log('Unable to connect to Mongo');
		process.exit(1);
	} else {
		app.listen(3000, function() {
			console.log('Listening on port 3000');
		});
	}
});
