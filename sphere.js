$(document).ready(function() {
  var $sphereControl = $('.js-sphere-control'),
  		$item = $('.item'),
  		loop = true,
  		random = true;

  sphereMotion = function (classOut, classIn, $getSphere, $activeSphere, previous, maxRowIndex) {
		var markUp;

  	$activeSphere.find('.sphere--row').each(function(indexTo) {
  		// Set image default
  		var currentImage = 'https://www.apn-gcr.org/wp-content/uploads/2016/01/person-placeholder-200x200.png';
  		
	 		if(previous) {
				var $getImage = $getSphere.find('.sphere--row-'+ (indexTo + 1) +' .item:not(.getted)').first();
				if($getImage.children('img').length) {
	 				currentImage = $getImage.children('img').attr('src');
	 				$getImage.addClass('getted');
				}

	 			for (i = maxRowIndex; i >= 0 ; i--) {
	 				var indexItem = i,
	 						indexItemGet = i + 1;
		 			if(indexItem != maxRowIndex) {
			 			currentImage = $(this).find('.item:eq('+ indexItemGet +')').children('img').last().attr('src');
		 			}
					markUp = '<img class="'+ classIn +'" src="'+ currentImage +'">';
		 			$(this).find('.item:eq('+ indexItem +')').children('img').addClass(classOut);
		 			$(this).find('.item:eq('+ indexItem +')').prepend(markUp);
				};
			}
			else {
				var $getImage = $getSphere.find('.sphere--row-'+ (indexTo + 1) +' .item:not(.getted)').last();
				if($getImage.children('img').length) {
	 				currentImage = $getImage.children('img').attr('src');
	 				$getImage.addClass('getted');
				}

	 			for (i = 0; i <= maxRowIndex ; i++) {
	 				var indexItem = i,
	 						indexItemGet = i - 1;
		 			if(indexItem != 0) {
			 			currentImage = $(this).find('.item:eq('+ indexItemGet +')').children('img').last().attr('src');
		 			}
					markUp = '<img class="'+ classIn +'" src="'+ currentImage +'">';
		 			$(this).find('.item:eq('+ indexItem +')').children('img').addClass(classOut);
		 			$(this).find('.item:eq('+ indexItem +')').prepend(markUp);
				};
			}
  	});

  	setTimeout(function() {
		  $('.'+classOut).remove();
		  $('.'+classIn).removeClass(classIn);
		}, 20);
  };

  $sphereControl.click(function(){

		var $activeSphere = $('.sphere--active');
	  var classOut = 'item-next--out',
	  		previous = false;
	  		classIn = 'item-next--in';
		var dataActive = parseInt($activeSphere.attr('data-active'));
		var sphereLength = $('.sphere--item').length - 1;
		//Get max Row index
		var rowLength = $activeSphere.find('.sphere--row').length;
		var maxRowIndex = rowLength - 1;

		// Next/Prev button with loop
		// Click previous button
		$(this).addClass('deactive');
  	if($(this).hasClass('sphere--prev')) {
  		previous = true,
		  classOut = 'item-prev--out',
		  classIn = 'item-prev--in';
		  // If the first sphere is active;
		  if(dataActive == 1) {
		  	// Get data from the last sphere
	  		dataActive = sphereLength;
		  }
		  else {
		  	// Get data from previous sphere
		  	dataActive = dataActive - 1;
		  }
  	}
  	else {
		  if(dataActive == sphereLength) {
		  	// Get data from the first sphere
	  		dataActive = 1;
		  }
		  else {
		  	// Get data from next sphere
		  	dataActive = dataActive + 1;
		  }
  	}

		var $getSphere = $('.sphere--item-'+ dataActive);
		//Reset data active for active Sphere
		$activeSphere.attr('data-active',dataActive)

		var times = rowLength;
		var loop = setInterval(anim, 100);
		function anim(){
	    times--;
	    if(times === 0){clearInterval(loop);}
	    sphereMotion(classOut, classIn, $getSphere, $activeSphere, previous, maxRowIndex);
		}
		anim();

  	setTimeout(function() {
		  $('.getted').removeClass('getted');
		  $sphereControl.removeClass('deactive');
		}, 100 * rowLength);
  })
});
