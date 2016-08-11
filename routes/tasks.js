var express = require('express');
var router = express.Router();
var Task = require('../models/task');

router.get('/', function(req, res) {
	Task.find( function(err, tasks) {
		if(err)
			return res.status(500).json({ error: 'Something went wrong' });
		return res.json(tasks);
	});
});

router.post('/', function(req,res) {
	new Task({
		title: req.body.title
	}).save( function(err, task) {
		if(err)
			return res.status(500).json({ error: 'Something went wrong' });
		return res.json(task);
	});
});

router.post('/task_template', function(req, res) {
	var task = req.body;
	res.render('task', { id: task.id, title: task.title, complete: task.complete });
});

router.put('/:id', function(req, res) {
 Task.findByIdAndUpdate(
	 req.params.id,
	 { $set: { complete: req.body.complete }},
	 function (err, task) {
	   res.send(task);
	 });
});

router.delete('/:id', function(req, res) {
	Task.findById(req.params.id, function(err, task) {
		task.remove();
		res.status(200).send({ success: true });
	});
});

module.exports = router;