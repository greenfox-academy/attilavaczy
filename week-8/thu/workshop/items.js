"use-strict";
var TodoItem = function () {
  this.id = nextId();
  this.text = "";
  this.completed = false;
}
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'testgyuri',
  password: 'test',
  database: 'todo'
});
connection.connect();
module.exports = {
  add: addItem,
//  get: getUser,
//  getUserById: getUserById
};
TodoItem.prototype.update = function(attributes) {
  this.text = attributes.text || "";
  this.completed = !!attributes.completed;
};
var currId = 0;
function nextId() {
  return ++currId;
}
var items = {};
function getItem(id) {
  return items[id];
}
function addItem(attributes) {
  connection.query('INSERT INTO todo SET ?', attributes, function(err, result) {
    if (err) throw err;
    console.log(result.insertID);
  })
}
function removeItem(id) {
  delete items[id];
}
function allItems() {
  var values = [];
  for (id in items) {
    values.push(items[id]);
  }
  return values;
}
module.exports = {
  get: getItem,
  add: addItem,
  remove: removeItem,
  all: allItems,
};
