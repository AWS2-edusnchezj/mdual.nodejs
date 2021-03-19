function showArtists(query) {
	if(query != '') {
		$('#collection-progress').show();
		$.ajax({
			url: 'https://musicbrainz.org/ws/2/artist?query=' + query,
			type: 'get',
			dataType: 'JSON',
			success: function(data) {
				$('.collection').html('');
				if(data['artists'] != '') {
					for(let artist in data['artists']) {
						$('.collection').append(createCardArtist(data['artists'][artist]));
					}
				} else {
					$('.collection').html('No se ha encontrado ningún artista.');
				}
			},
			complete: function() {
				$('#collection-progress').hide();
			}
		});
	} else {
		$('.collection').html('');
	}
}

function createCardArtist(params) {
	return '<li class="collection-item avatar"><img src="https://pbs.twimg.com/profile_images/1188507013233479681/WuNwaQ8R_400x400.jpg" alt="" class="circle"><span class="title">'+ params['name'] +'</span><p><em>'+ hideUndefined(params['type']) +'</em></p><a href="#details" class="secondary-content"><i class="material-icons">chevron_right</i></a></li>';
	
}

function hideUndefined(value) {
	if(typeof value === "undefined") {
		return '';
	}
	return value;
}