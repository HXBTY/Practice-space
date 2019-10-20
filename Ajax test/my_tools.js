(function () {
  let my = {}
  my.ajax = function (params) {
    let type = params.type || 'get';
    let url = params.url;
    let data = params.data ? dataFormat(params.data) : '';
    let success = params.success;

    let xhr = new XMLHttpRequest();

    检测data是否为空
    if (data === '') {
      xhr.open(type, url);
    } else {
      xhr.open(type, type === 'get' ? url + '?' + data : url);
    }
    xhr.open(type, type === 'get' ? url + '?' + data : url);

    if (type === 'get') {
      xhr.send();
    } else {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(data);
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let res;
        if (xhr.getResponseHeader('Content-Type').indexOf('json') !== -1) {
          res = JSON.parse(xhr.responseText);
        } else {
          res = xhr.responseText;
        }
        success && success(res);
      }
    }

  }

  .get = function (url, data, success) {
    let xhr = new XMLHttpRequest();
    url = data ? url + '?' + dataFormat(data) : url;
    xhr.open('get', url);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let res;
        if (xhr.getResponseHeader('Content-Type').indexOf('json') !== -1) {
          res = JSON.parse(xhr.responseText);
        } else {
          res = xhr.responseText;
        }

        // if (typeof success === 'function') {
        //   success(res);
        // }
        //简化写法
        success && success(res);
      }
    };
  }

  my.post = function (url, data, success) {
    let xhr = new XMLHttpRequest();

    let datas = data ? dataFormat(data) : '';

    xhr.open('post', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(datas);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let res;
        if (xhr.getResponseHeader('Content-Type').indexOf('json') !== -1) {
          res = JSON.parse(xhr.responseText);
        } else {
          res = xhr.responseText;
        }
        success && success(res);
      }
    }
  }

  // 数据处理
  function dataFormat(data) {
    let arr = [];
    for (let k in data) {
      arr.push(k + '=' + data[k]);
    }
    let result = arr.join('&');
    return result;
  }

  window.my = my;
})();


