var db = require('../db');

var Task = function(data) {
	this.data = data;
};

Task.prototype.data = {};

Task.all = function(cb) {
	var collection = db.get().collection('tasks');
	collection.find().sort({ _id : -1 }).toArray(function(err, docs) {
		cb(err, docs);
	});
};

Task.findById = function(id, cb) {
	var collection = db.get().collection('tasks');
	collection.findOne({ _id: id }, function(err, doc) {
		if (err) return cb(err);
		cb(null, new Task(doc));
	});
};


Task.create = function(name, cb) {
	var collection = db.get().collection('tasks');
	var now = Date.now();
	collection.insert({name: name, is_complete: false, created_at: now }, function(err, result) {
		cb(err, result);
	});
};

Task.prototype.save = function(cb) {
	var self = this;
	var collection = db.get().collection('tasks');

	collection.findOne({_id: self.get('_id')}, function(err, doc) {
		if (!doc) {
			collection.insert(self.data, function(err, doc) {
				if( err ) return cb(err);
				return cb(null, doc);
			});
		} else {
			collection.update({_id: self.get('_id')}, self.data, function(err, doc) {
				if(err) return cb(err);
				return cb(null, doc);
			});
		}
	});
};

Task.prototype.get = function(key) {
	return this.data[key];
};

Task.prototype.set = function(key, value) {
	this.data[key] = value;
};

Task.clearComplete = function(cb) {
	var collection = db.get().collection('tasks');
	collection.remove({is_complete: true}, function(err, result) {
		cb(err, result);
	});
};

module.exports = Task;