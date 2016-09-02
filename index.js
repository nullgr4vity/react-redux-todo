let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');

let app = express();

app.use(favicon(path.join(__dirname + '/public/favicon.ico')));
app.use(express.static('public'));

let data = [1,2,3,4,5,6,7,8,9].map( (value, index) => {
  let tag = index % 2;
  let item = {title: `lorem ipsum ${value}, lorem ipsum ${value}, lorem ipsum ${value}`, tag: tag, id: `item-id-${value}`}
  item.data = [
    {name: `title-${value}-1`, completed: false, id: `item-id-${value}-1`},
    {name: `title-${value}-2`, completed: true, id: `item-id-${value}-2`},
    {name: `title-${value}-3`, completed: false, id: `item-id-${value}-3`},
    {name: `title-${value}-4`, completed: true, id: `item-id-${value}-4`}
  ];

  return item;
});

app.get('/api/data', (req,res) => {
  res.json({ status: true, data: data });
})

app.delete('/api/data/:gids', (req,res) => {
  let gids = req.params.gids;
  if (gids && gids.length > 0) {
    gids = gids.split(',').filter(Boolean) || [];
  }

  let removed = false;
  let removedGids = [];
  data = data.map((group, index) => {
    if (gids.indexOf(group.id) < 0) {
      return group;
    };

    removedGids.push(group.id);
    removed = true;
  }).filter(Boolean);

  res.json({ status: true, gids: removedGids.join(','), removed: removed });
})

app.put('/api/data/:gid/todo/:tid', (req,res) => {
  let gid = req.params.gid;
  let tid = req.params.tid;

  let todo = {};
  for(let i=0; i< data.length; i++) {
    if (data[i].id !== gid) {
      continue;
    }

    for (let ii = 0; ii < data[i].data.length; ii++) {
      if (data[i].data[ii].id !== tid) {
        continue;
      }
      todo = data[i].data[ii];
      break;
    }
    break;
  }
  todo.completed = !todo.completed;
  res.json({ status: true, gid: gid, tid: tid, completed: todo.completed }); 
})

app.listen(3000, function () {
  console.log('goodies are available at localhost:3000!');
});