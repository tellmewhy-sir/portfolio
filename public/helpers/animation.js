function highlightMenuItem(slider, item) {
  let x = item.offsetLeft;
  let y = item.offsetTop;
  let w = item.clientWidth;
  let h = item.offsetHeight;

  slider.style.left = `${x}px`;
  slider.style.top = `${y}px`;
  slider.style.width = `${w}px`;
  slider.style.height = `${h}px`;
}

function animateActiveTab(nav, navItem, scrollDistance) {
  let activeItem = nav.querySelector('.active');

  // if (activeItem === navItem) {
  //   return activeItem;
  // }

  activeItem.classList.remove('active');
  navItem.classList.add('active');

  let distanceFromTitle = Math.abs(navItem.offsetTop - scrollDistance);

  let itemOrder = parseInt(navItem.dataset.order);
  let activeItemOrder = parseInt(activeItem.dataset.order);

  console.log(itemOrder, activeItemOrder);

  if (itemOrder > activeItemOrder) {
    distanceFromTitle = -distanceFromTitle;
  }

  console.log(distanceFromTitle);

  nav.style.transform = `translateY(${distanceFromTitle}px)`;

  return navItem
}