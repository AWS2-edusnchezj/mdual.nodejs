$('a[href=#ufs]').click(function() {
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
		$('div#ufs .row[1] .col h5').html(data[courseIndex]['name']);
		$('div#showUfs').html('');
		$.each(data[courseIndex]['modules'], function(module, dataModule) {
			$('div#showUfs').append(`
			<div class="col s4">
				<h6>${dataModule['code']}. ${dataModule['name']}</h6>
			</div>
			<div class="col s8">
				<ul class="collapsible" id="uf-${dataModule['code']}"></ul>
			</div>`);

			$.each(dataModule['ufs'], function(uf, dataUf) {
				$(`ul#uf-${dataModule['code']}`).append(`
				<li>
					<div class="collapsible-header">
						<label>
							<input type="checkbox" onchange="changeSelectedUf(this);" data-state="false" />
							<span idUf="[${dataModule['code']}, ${uf}]">${uf}. ${dataUf['name']}</span>
						</label>
					</div>
					<div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
				</li>`);
			});
		});
	});
}

function changeSelectedUf(elementCheckbox) {
	if($(elementCheckbox).prop(true)) {
		console.log($(elementCheckbox).next().attr('idUf') + ' actived');
	}
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
		$.each(data[courseIndex], function(docIndex) {
			$('div#showDocs .collection').append(`
			<li class="collection-item avatar">
				<i class="material-icons circle">insert_drive_file</i>
				<span class="title">${data[courseIndex][docIndex][0]}</span>
				<p>${data[courseIndex][docIndex][0]}<br>
					Second Line
				</p>
				<div class="secondary-content">
					<i class="material-icons green-text">sentiment_very_satisfied</i>
					<i class="material-icons yellow-text text-darken-3">sentiment_neutral</i>
					<i class="material-icons red-text">sentiment_very_dissatisfied</i>
				</div>
			</li>
			`);
		});
	});
}