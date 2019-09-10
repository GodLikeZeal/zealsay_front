/**
 * 图片细化
 * @param box
 * @param ball
 * @param dia
 */
export function playAnimate(box, ball, dia) {
  const rNum = parseInt(box.getBoundingClientRect().height / dia)
  const cNum = parseInt(box.getBoundingClientRect().width / dia)
  const frag = document.createDocumentFragment()
  ball.style.width = dia + 'px'
  ball.style.height = dia + 'px'
  for (let r = 0; r < rNum; r++) {
    for (let c = 0; c < cNum; c++) {
      const cl = ball.cloneNode(true)
      ball.style.backgroundPosition =
        '-' + c * dia + 'px ' + '-' + r * dia + 'px'
      frag.appendChild(cl)
    }
  }
  box.appendChild(frag)
}
function randNum(min, max) {
  return Math.random() * (max - min) + min
}

/**
 * 图片破碎效果
 */
export function disappear() {
  $('.test-img').fadeOut(1000)
  $('.item-ball').each(function() {
    $(this).animate({
      top: randNum(-110, 110) + 'px',
      left: randNum(-200, 200) + 'px',
      transform: 'scale(' + randNum(0.3, 1.8) + ')',
      opacity: 0
    })
  })
}
