'use strict';

const cwd = process.cwd();

const express = require('express');

const modelFinder = require(`${cwd}/src/middleware/model-finder.js`);

const router = express.Router();

// Evaluate the model, dynamically
router.param('model', modelFinder);

// API Routes
router.get('/api/v1/:model', handleGetAll);
// router.post('/api/v1/:model', handlePost);

router.post('/api/v1/find-or-create-:model', handleFindOrCreate);

async function handleFindOrCreate(request,response,next) {

    const data = await request.model.get();
    console.log(`data: `, data);

    for( let i = 0; i < data.length; i++){
      console.log('🍎', data[i].rawData);
      console.log('🍊', request.body.rawData);
      if(data[i].userId.toString() === request.body.userId.toString()){
        response.status(200).json(data[i])
        return;
      }
    }

    request.model.post(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

router.get('/api/v1/:model/:id', handleGetOne);
router.put('/api/v1/:model/:id', handlePut);
router.delete('/api/v1/:model/:id', handleDelete);

// Route Handlers
function handleGetAll(request,response,next) {
  request.model.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function handleGetOne(request,response,next) {

}

function handlePost(request,response,next) {

}

function handlePut(request,response,next) {
  request.model.put(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handleDelete(request,response,next) {
  request.model.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;