import {
  MessageBox
} from "element-ui";

function success(msg, callback) {
  MessageBox.alert(msg, "提示", {
    type: 'success',
    callback: action => {
      if (callback != null && callback != undefined) {
        callback();
      }
    }
  });
}

function error(err) {
  MessageBox.alert(err, "提示", {
    type: 'error',
    dangerouslyUseHTMLString: true
  });
}

function render(msgs) {
  let html = '<div style="color: #F56C6C;max-height: 400px;overflow: auto;">';
  msgs.map(msg => {
    html = html + "<div>" + msg + "</div>";
  });
  html = html + "</div>";
  return html
}

export default {
  success,
  error,
  render
}
