'use strict';

const Model = require('../mongo.js');
const schema = require('./users-schema.js');

class Users extends Model {}

module.exports = new Users(schema);

