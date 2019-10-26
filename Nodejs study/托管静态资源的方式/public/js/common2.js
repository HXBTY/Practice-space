setInterval(function () {
  val += 10;
  h4.style.textIndent = val + 'px';
  if (val > document.body.offsetWidth) {
    val = -150;
  }
}, 80);