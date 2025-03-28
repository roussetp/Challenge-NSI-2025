document.addEventListener('DOMContentLoaded', function() {
    var imageContainer = document.getElementById('imageContainer');
    var clickPosition = document.getElementById('clickPosition');
  
    imageContainer.addEventListener('click', function(event) {
      var image = document.getElementById('image');
      var rect = image.getBoundingClientRect();
  
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
  
      clickPosition.innerHTML = 'Position du clic : x = ' + x + ', y = ' + y;
      clickPosition.style.top = event.clientY + 'px';
      clickPosition.style.left = event.clientX + 'px';
    });
  });
  