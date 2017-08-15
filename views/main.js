function renderTodos() {
  let addToDoButton = document.getElementById('addToDoButton');
  let addToDoText = document.getElementById('addToDoInput');
  addToDoButton.addEventListener('click', sendAddToDo, false);

  function sendAddToDo() {
    let text = addToDoText.value;
    let url = '/todo/' + 'new' + '/status/' + 'new' + '/text' + text;
    let formsBody = 'FormData() won’t work';
    let pageRefresh = true;
    postFetch(url, formsBody, pageRefresh);
  }

  let classname = document.getElementsbyClassName('checkbox');
  for (let i = 0; i < classname.length; i++) {
    classname[i].addEventListener('change', sendForm, false);
  }

  function sendForm() {
    let complete = false;
    if (this.checked) {
      complete = true;
    }
    let text = this.getAttribute('data-text');
    let url = '/todo/' + this.id + '/status/' + complete + '/text/' + text;
    let formsBody = 'FormData() won’t work';
    let pageRefresh = false;
    postFetch(url, formsBody, pageRefresh);
  }

  function postFetch(url, formsBody, pageRefresh) {
    fetch(url, {
      method: 'post',
      body: formsBody,
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    }).then(function (response) {
      if (pageRefresh) {
        setTimeout(function () {
          window.location = '/';
        }, 300);
      }
    });
  }
}
