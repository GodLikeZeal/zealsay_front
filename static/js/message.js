function renderTip(template, context) {
  // eslint-disable-next-line no-useless-escape
  const tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g
  return template.replace(tokenReg, function(word, slash1, token, slash2) {
    if (slash1 || slash2) {
      return word.replace('\\', '')
    }
    const variables = token.replace(/\s/g, '').split('.')
    let currentObject = context
    let i, length, variable
    for (i = 0, length = variables.length; i < length; ++i) {
      variable = variables[i]
      currentObject = currentObject[variable]
      if (currentObject === undefined || currentObject === null) return ''
    }
    return currentObject
  })
}

// eslint-disable-next-line no-extend-native
String.prototype.renderTip = function(context) {
  return renderTip(this, context)
}

function initTips() {
  // eslint-disable-next-line no-undef
  $.ajax({
    cache: true,
    url: 'live2d/message.json',
    dataType: 'json',
    success: function(result) {
      // eslint-disable-next-line no-undef
      $.each(result.mouseover, function(index, tips) {
        // eslint-disable-next-line no-undef
        $(tips.selector).mouseover(function() {
          let text = tips.text
          if (Array.isArray(tips.text))
            text =
              tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1]
          // eslint-disable-next-line no-undef
          text = text.renderTip({ text: $(this).text() })
          showMessage(text, 5000)
        })
      })
      // eslint-disable-next-line no-undef
      $.each(result.click, function(index, tips) {
        // eslint-disable-next-line no-undef
        $(tips.selector).click(function() {
          let text = tips.text
          if (Array.isArray(tips.text))
            text =
              tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1]
          // eslint-disable-next-line no-undef
          text = text.renderTip({ text: $(this).text() })
          showMessage(text, 5000)
        })
      })
    }
  })
}

initTips()

function showDateTip() {
  let text
  const now = new Date().getHours()
  if (now > 23 || now <= 5) {
    text = '没想到你居然也是夜猫子呀？ﾟÅﾟ)'
  } else if (now > 5 && now <= 11) {
    text = '哦嗨哟！今天也是元气满满呢！(≧∀≦)ゞ'
  } else if (now > 11 && now <= 12) {
    text = '我要去次饭啦！─=≡Σ((( つ•̀ω•́)つ'
  } else if (now > 12 && now <= 14) {
    text = '午觉时间到啦，再忙也要休息一会哟！(¦3[▓▓]'
  } else if (now > 14 && now <= 17) {
    text = '我要开始努力工作啦！(つд⊂)'
  } else if (now > 17 && now <= 18) {
    text = '窗外夕阳的景色很美丽呢！(ﾉ>ω<)ﾉ'
  } else if (now > 18 && now <= 21) {
    text = '晚上好，今天过得怎么样？(ゝ∀･)'
  } else if (now > 21 && now <= 23) {
    text = '已经这么晚了呀，早点休息吧，晚安ξ( ✿＞◡❛)'
  }
  showMessage(text, 5000)
}

setTimeout(function() {
  showDateTip()
}, 4000)

window.setInterval(showHitokoto, 25000)

function showHitokoto() {
  // eslint-disable-next-line no-undef
  $.getJSON('https://v1.hitokoto.cn/', function(result) {
    showMessage(result.hitokoto, 5000)
  })
}

function showMessage(text, timeout) {
  if (Array.isArray(text)) {
    text = text[Math.floor(Math.random() * text.length + 1) - 1]
  }
  if (text.length <= 45) {
    // eslint-disable-next-line no-undef
    const msg = $('.msg')
    // eslint-disable-next-line no-undef
    const messageBox = $('.messageBox')
    messageBox.stop()
    msg.html(text).fadeTo(200, 1)
    if (timeout === null) timeout = 5000
    hideMessage(timeout)
  }
}

function hideMessage(timeout) {
  // eslint-disable-next-line no-undef
  const messageBox = $('.messageBox')
  messageBox.stop().css('opacity', 0.5)
  if (timeout === null) timeout = 5000
  messageBox.delay(timeout).fadeTo(200, 0)
}
