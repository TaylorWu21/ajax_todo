$(document).ready(function() {
	$('#add_task').on('submit', function(e) {
		e.preventDefault();
		var title = $(this).children('input').val();

		$.ajax({
			url: '/tasks',
			type: 'POST',
			data: { title: title },
			dataType: 'JSON'
		}).done(function(data) {
			$('#add_task input').val('');
			getAllTasks();
			console.log(data);
		}).fail(function(err) {
			console.log(err);
		});
	});

	function getAllTasks() {
		$.ajax({
			url: '/tasks',
			type: 'GET',
			dataType: 'JSON'
		}).done(function(data) {
			updateTaskList(data);
		}).fail(function(err) {
			console.log(err);
		});
	}

	function updateTaskList(tasks) {
    var list = $('#task_list');
    list.empty();
    tasks.forEach( function(task) {
      $.ajax({
      	url: '/tasks/task_template',
      	type: 'POST',
      	dataType: 'HTML',
      	data: { id: task._id, title: task.title, complete: task.complete }
      }).done( function(data) {
      	list.append(data);
      });
    });
  }

  $(document).on('change', '#task_list input', function() {
  	var input = $(this);
  	var url = '/tasks/' + input.attr('id');

  	$.ajax({
  		url: url,
  		type: 'PUT',
  		data: { complete: input.is(':checked') }
  	}).done(function(data) {
  		input.closest('.row').find('.title').toggleClass('.complete');
  	}).fail(function(err) {
  		input.attr('checked', !input.is(':checked'));
  	});
  });

  $(document).on('click', '.remove-task', function() {
  	var url = '/tasks/' + $(this).data('id');

  	$.ajax({
  		url: url,
  		type: 'DELETE',
  		dataType: 'JSON'
  	}).done(function() {
  		getAllTasks();
  	});
  });

	getAllTasks();

});