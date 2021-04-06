$('a[href=#ufs]').click(function() {
	let selectCourse = $('select#selectCourse').material_select();
	$.getJSON("data/courses.json", function( data ) {
		$.each(data, function(course, dataCourse) {
			$(selectCourse).appendTo(`<option>${dataCourse.name}</option>`);
		});
	});
});

function showModulesOfCourse(courseIndex) {
	$.getJSON("data/courses.json", function( data ) {
		$('div#ufs .row[0] .col h5').html(data[courseIndex]['name']);
		$.each(data[courseIndex]['modules'], function(module, dataModule) {
			$('div#ufs').append(`
			<div class="row">
				<div class="col s4">
					<h6>${dataModule['code']}. ${dataModule['name']}</h6>
				</div>
				<div class="col s8">
					<ul class="collapsible" id="uf-${dataModule['code']}"></ul>
				</div>
			</div>`);

			$.each(dataModule['ufs'], function(uf, dataUf) {
				$(`ul#uf-${dataModule['code']}`).append(`
				<li>
					<div class="collapsible-header">${dataUf['code']}. ${dataUf['name']}</div>
					<div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
				</li>`);
			});
		});
	});
}