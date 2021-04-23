$('a[href=ufs]').click(function() {
	let selectCourse = $('select#selectCourse').material_select();
	$.getJSON("data/courses.json", function( data ) {
		$.each(data, function(course, dataCourse) {
			$(selectCourse).appendTo(`<option>${dataCourse.name}</option>`);
		});
	});
});

function showModulesOfCourse(courseIndex) {
	$('div#showUfs').html(`
	<div class="preloader-wrapper big active">
      	<div class="spinner-layer spinner-blue">
        	<div class="circle-clipper left">
          		<div class="circle"></div>
        	</div><div class="gap-patch">
          	<div class="circle"></div>
        	</div><div class="circle-clipper right">
          		<div class="circle"></div>
        	</div>
      	</div>
	</div>`);
	$.getJSON("data/courses.json", function(data) {
		$('#selectAllCourse').removeAttr('disabled');
		$('div#showUfs').html('');
		$.each(data[courseIndex]['modules'], function(module, dataModule) {
			$('div#showUfs').append(`
			<div class="col s4">
				<span>${dataModule['code']}. ${dataModule['name']}</span>
			</div>
			<div class="col s8">
				<ul class="collapsible" id="uf-${dataModule['code']}"></ul>
			</div>`);

			$.each(dataModule['ufs'], function(uf, dataUf) {
				$(`ul#uf-${dataModule['code']}`).append(`
				<li>
					<div class="collapsible-header">
						<label>
							<input type="checkbox" onchange="changeSelectedUf(this);" data-state="false" checked />
							<span idUf="[${dataModule['code']}, ${uf}]">${uf}. ${dataUf['name']}</span>
						</label>
					</div>
					<div class="collapsible-body"><span></span></div>
				</li>`);
			});
		});

		$('div#showUfs').after(`
		<div class="row">
			<div class="col s9"></div>
			<div class="col s3">
				<div class="flex flex-row">
					<span class="flex items-center bg-grey-lighter rounded rounded-r-none px-3 font-bold text-grey-darker">€</span>
					<input type="number" name="price" class="bg-grey-lighter text-grey-darker py-2 font-normal rounded text-grey-darkest border border-grey-lighter rounded-l-none font-bold" value="0" 
					readonly>
				</div>
			</div>
		</div>`);
	});
}

function changeSelectedUf(elementCheckbox) {
	if($(elementCheckbox).prop(true)) {
		console.log($(elementCheckbox).next().attr('idUf') + ' actived');
	}
}

function getRandomColor() {
	let randomColor = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'orange', 'brown', 'grey', 'blue-grey'];
	return randomColor[Math.floor(Math.random() * randomColor.length)];
}

function showDocuments(courseIndex) {
	$('div#showDocs').html(`
	<div class="preloader-wrapper big active">
      	<div class="spinner-layer spinner-blue">
        	<div class="circle-clipper left">
          		<div class="circle"></div>
        	</div><div class="gap-patch">
          	<div class="circle"></div>
        	</div><div class="circle-clipper right">
          		<div class="circle"></div>
        	</div>
      	</div>
	</div>`);
	$.getJSON("data/docs.json", function(data) {
		$('div#showDocs').html('');
		var number = 1;
		$.each(data[courseIndex], function(docIndex) {
			$('div#showDocs').append(`
			<ul class="col s12 collection">
				<li id="document${number}" class="collection-item avatar">
					<i class="material-icons circle ${getRandomColor()}">insert_drive_file</i>
					<span class="title">${data[courseIndex][docIndex][0]}</span>
					<p>Inserte aquí el siguiente documento: ${data[courseIndex][docIndex][0]}<br>
					<div class="p-1.5 mt-3 mb-3 bg-gray-100 float-left rounded">
        				<input onchange="uploadDoc(this)" type="file" accept="image/*"> <em>Només s'accepten imatges</em>
					</div>
					</p>
					<div class="secondary-content">
						<i id="trafficLightGreen" class="material-icons green-text opacity-20" title="Document verificat y correcte">sentiment_very_satisfied</i>
						<i id="trafficLightOrange" class="material-icons yellow-text text-darken-3 opacity-20" title="Document a verificar">sentiment_neutral</i>
						<i id="trafficLightRed" class="material-icons red-text opacity-100" title="No entregat">sentiment_very_dissatisfied</i>
					</div>
				</li>
			</ul>
			`);

			number += 1;
		});
	});
}

function uploadDoc(inputFile) {
	let parentTrafficLight = $(inputFile).parent().parent().attr('id');
	$('#' + parentTrafficLight + ' > .secondary-content > #trafficLightRed').removeClass('opacity-100').addClass('opacity-20');
	$('#' + parentTrafficLight + ' > .secondary-content > #trafficLightOrange').removeClass('opacity-20').addClass('opacity-100');
}