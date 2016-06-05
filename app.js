var amountOfImages = 15,
    seenImages = [],
    unseenImages = [],
    inScreenTime = 500; // milliseconds

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

for(var i = 1; i <= amountOfImages; i++) {
  seenImages.push("seen-" + i + ".jpg");
  unseenImages.push("unseen-" + i + ".jpg");
}

shuffleArray(seenImages);
shuffleArray(unseenImages);

function createSeenImagesSlides() {
  for(var i = 0; i < seenImages.length; i++) {
    var imgHtml = '<img src="img/' + seenImages[i] + '" />'
    $('.slides').append('<section>' + imgHtml + '</section>');
  }
}

function createUnseenImagesSlides() {
  shuffleArray(seenImages);
  for(var i = 0; i < unseenImages.length; i++) {
    var correctLeft = Math.random() > 0.5;
    var emptyHtml = '<div style="float: left; width: 50%; height: 100vh;"></div>';
    var seenHtml = '<div style="float: left; width: 50%; height: 100vh;"><img src="img/' + seenImages[i] + '" /></div>';
    var unseenHtml = '<div style="float: left; width: 50%; height: 100vh;"><img src="img/' + unseenImages[i] + '" /></div>';
    if(correctLeft) {
      $('.slides').append('<section>' + seenHtml + unseenHtml + '</section>');
      $('.slides').append('<section>' + seenHtml + emptyHtml + '</section>');
    } else {
      $('.slides').append('<section>' + unseenHtml + seenHtml + '</section>');
      $('.slides').append('<section>' + emptyHtml + seenHtml + '</section>');
    }
  }
}

function createBlankSlide() {
  $('.slides').append('<section>...</section>');
}

$('.initialize').on('click', function(ev) {
  $('.initialize').html('Preparando...');
  ev.preventDefault();
  var current = -1;
  function showNextImage() {
    current += 1;
    if(current <= seenImages.length) {
      Reveal.next();
      setTimeout(showNextImage, inScreenTime);
    }
  }
  setTimeout(showNextImage, 1000);
});

$(document).ready(function() {
  createSeenImagesSlides();
  createBlankSlide();
  createUnseenImagesSlides();

  Reveal.initialize({
    transition: 'none'
  });
});
