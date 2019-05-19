var mongoose = require('mongoose');
var async = require('async');
var User = require('../../models/users').User;

async.series([
  open,
  dropDatabase,
  createUsers
], function(err,results) {
  mongoose.connection.close();
});

function open(callback) {
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}, callback);
}

function dropDatabase(callback) {
  var db = mongoose.connection.db;
  db.dropDatabase(callback);
}

function createUsers(callback) {
var users = [
  {
  email: 'pupa@buhgalter.ru',
  username: 'big_smoke',
  password: 123
  },
  {
  email: 'lupa@buhgalter.ru',
  username: 'tupac',
  password: 456
  },
  {
  email: 'zarplata@buhgalter.ru',
  username: 'smith',
  password: 789
                },
                {
  email: 'zalupa@buhgalter.ru',
  username: 'wesson',
  password: 101
                }
];

  async.each(users, function(userData, callback) {
    var user = new mongoose.models.User(userData);
    user.save(callback);
    console.log(user);
  }, callback);

};