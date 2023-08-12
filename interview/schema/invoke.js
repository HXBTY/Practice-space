(function (window, undefined) {

  // 调用schema的封装
  function _invoke_(action, data, callback) {
    // 拼装schema协议
    let schema = `myapp://utils/${action}`
    // 拼接参数
    schema += '?a=a'
    for (const key in data) {
      // 判断是否对象中是否有该属性, 通常用来忽略原型上的属性
      if (Object.hasOwnProperty.call(data, key)) {
        schema += `&${key}=${data[key]}`
      }
    }

    // 处理callbackname
    let callbackName = ''
    if (typeof callback === 'string') {
      callbackName = callback
    } else {
      callbackName = action + Date.now()
      window[callbackName] = callback
    }

    schema += `&callback=${callbackName}`

    // 触发
    let iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = schema
    console.log('src', iframe.src);
    let body = document.body
    body.appendChild(iframe)
    setTimeout(() => {
      body.removeChild(iframe)
      iframe = null
    })
  }
  
  // 暴露到全局变量
  window.invoke = {
    share: (data, callback) => {
      _invoke_('share', data, callback)
    },
    scan: (data, callback) => {
      _invoke_('scan', data, callback)
    }
  }

})(window)