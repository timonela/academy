var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pg = require('pg')(promise);
const { Pool, Client } = require('pg');
var connectionString = 'postgresql://postgres:123456789@localhost/AmbrogioAcademy';
var db = pg(connectionString);

// add query functions

module.exports = {
  /* getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy */
};
