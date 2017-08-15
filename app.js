const bodyParser = require('body-parser');
const express = require('express');
const expressValidator = require('express-validator');
const jsonfile = require('jsonfile');
const mustacheExpress = require('mustache-express');
const path = require('path');

const todosFile = './todosData.json';
const todosObj = 'text';

const app = express();

app.use('/views', express.static(path.join(__dirname, 'views')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

let tasks = jsonfile.readFileSync(todosFile);

app.get("/", function (req, res) {
  return res.render('todo', tasks);
});

app.post("/todo/:todoId/status/:status/text/:text", function (req, res) {
  let todoId = req.params.todoId;
  let todoText = req.params.text;
  let todoStatus = req.params.status;
  let isTrueStatus = req.params.status === 'true';

  function isTodoId(value) {
    return Number(value.id) === Number(todoId);
  }

  let task = tasks.todos.filter(isTodoId);

  if (task[0]) {
    task[0].complete = isTrueStatus;
    let addNewBool = true;
    for (let i = 0; i < tasks.todos.length; i++) {
      if (tasks.todos[i].id === task[0].id) {
        console.log('updated');
        tasks.todos[i].id = task[0].id;
        addNewBool = false;
      }
    }
  } else {
    tasks.todos.push({
      'id': (tasks.todos.length),
      'text': todoText,
      'complete': false
    });
  }
  jsonfile.writeFileSync(todosFile, tasks, { spaces: 2 });
  res.sendStatus(200);
});

app.listen(3000, function () {
  console.log('Successfully started express application!');
});
