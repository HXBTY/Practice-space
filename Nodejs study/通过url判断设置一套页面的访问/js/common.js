let h4 = document.querySelector('h4');
let val = 0;
setInterval(function () {
  val += 10;
  // text-indent 属性规定文本块中首行文本的缩进
  h4.style.textIndent = val + 'px';
  if (val > document.body.offsetWidth) {
    val = -150;
  }
}, 80);