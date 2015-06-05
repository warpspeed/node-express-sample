var express = require('express'),
	ObjectID = require('mongodb').ObjectID;
	router  = express.Router();

var Tasks = require('../models/tasks');

	router.get('/', function(req, res) {
		Tasks.all(function(err, docs) {
			res.render('index', {tasks: docs} );
		});
	});

	router.post('/tasks/:id/toggle-complete', function(req, res) {
		var id = new ObjectID(req.params.id);
		Tasks.toggle(id, function(err, result) {
			if(result) {
				res.redirect('/');
			} else {
				res.send(err);
			}

		});


	});

	router.post('/tasks/clear-complete', function(req, res) {
		Tasks.clearComplete(function(err, result) {
			if(result) {
				res.redirect('/');
			} else {
				res.send(err);
			}
		});
	});

	router.post('/tasks' ,function(req, res) {
		if(req.body.name) {
			Tasks.create(req.body.name, function(err, result){
				if(result) {
					res.redirect('/');
				} else {
					res.send(err);
				}
			});
		}
	});

module.exports = router;