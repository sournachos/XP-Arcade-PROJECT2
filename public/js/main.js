function handleDragStart(e) {
    this.style.opacity = '0';
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
  }

  let items = document.querySelectorAll('.xp .box');
  items.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });


//   PENDING TO FINISH