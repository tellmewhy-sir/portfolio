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