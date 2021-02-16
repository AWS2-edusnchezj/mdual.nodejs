/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

	if(localStorage.getItem('tasks') == null) {
		localStorage.setItem('tasks', '[]');
		console.log('[TASKLIST] LocalStorage no existia y se ha creado.')
	} else {
		console.log('[TASKLIST] LocalStorage ya existe.')
	}

	showAllTasks();
}

function addTaskIntoJson(data) {
	let tasksInJson = JSON.parse(localStorage.getItem('tasks'));
	
	tasksInJson.push(data);

	localStorage.setItem('tasks', JSON.stringify(tasksInJson));
}

function showAllTasks() {
	let tasksInJson = JSON.parse(localStorage.getItem('tasks'));

	for(let task in tasksInJson) {
		addTaskToList(tasksInJson[task], task);
	}
}

function addTaskToList(data, idTask) {
	$('#listTasks').append('<li><a class="ui-btn ui-btn-icon-right ui-ica on-carat-r">'+ data +' <button class="deleteButton" value="'+ idTask +'"><i class="far fa-trash-alt"></i> Borrar</button></a></li>');
}

$('input[type=submit]').click(function() {
	var newTaskItem = $('input[name=taskInput]').val();

	addTaskIntoJson(newTaskItem);
	location.reload();
});

$('.deleteButton').click(function() {
	console.log($(this).val());
});