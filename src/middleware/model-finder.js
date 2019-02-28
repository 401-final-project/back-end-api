'use strict';

module.exports = (req,res,next) => {
  let modelName = req.params.model.replace(/[^a-z0-9-_]/gi, '');
  console.log(`../models/${modelName}/${modelName}-model.js`)
  req.model = require(`../models/${modelName}/${modelName}-model.js`);
  next();
};
