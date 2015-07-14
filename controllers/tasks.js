var express = require('express'),
	ObjectID = require('mongodb').ObjectID;
	router  = express.Router();

var Task = require('../models/Task');

router.get('/', function(req, res) {
	Task.all(function(err, docs) {
		res.render('index', {tasks: docs} );
	});
});

router.post('/tasks/:id/toggle-complete', function(req, res) {
	var id = new ObjectID(req.params.id);
	var task;
	Task.findById(id, function(err, instance) {
		task = instance;
		task.set('is_complete', !task.get('is_complete'));
		task.save(function(err, result) {
			if (result) {
				res.redirect('/');
			} else {
				res.send(err);
			}
		});
	});
});

router.post('/tasks/clear-complete', function(req, res) {
	Task.clearComplete(function(err, result) {
		if (result) {
			res.redirect('/');
		} else {
			res.send(err);
		}
	});
});

router.post('/tasks', function(req, res) {
	var name = req.body.name;
	var now = Date.now();
	if (name) {
		var task = new Task({name: name});
		task.set('created_at', now);
		task.set('is_complete', false);
		task.save(function(err, result) {
			if (result) {
				res.redirect('/');
			} else {
				res.send(err);
			}
		});
	}
});

module.exports = router;