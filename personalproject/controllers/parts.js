const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const getAll = async (req, res, next) => {
  try{
  const result = await mongodb.getDb().db('week2').collection('inventory').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); // we just need the first one (the only one)
    
  });
  // } catch (error){
  //   console.log(error);
  // }
}catch(error){
  res.status(500).json({message : error})
  }
};


const getSingle = async (req, res, next) => {
  try{
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('week2').collection('inventory').find({_id:userId});
  if (!result){
    res.status(404).json({message : "unable to find ID"})
  }
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]); // we just need the first one (the only one)
  });
}catch(error){
  res.status(500).json({message : "unable to get ID, make sure you have entered a valid ID"})
  }
};


const createPart = async (req, res) => {
  try {
  const part = {
    name: req.body.name,
    quantity: req.body.quantity,
    system: req.body.system,
    upc: req.body.upc,
    
  }; 
  console.log(part);
  const response = await mongodb.getDb().db('week2').collection('inventory').insertOne(part);
  if (response.acknowledged) {
    res.status(201).json(response); 
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the part entry.');
  }
}catch(error){
res.status(500).json({message : error})
}
};

const updatePart = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  try {
    const part = {
        name: req.body.name,
        quantity: req.body.quantity,
        system: req.body.system,
        upc: req.body.upc,
        
      }; 
  const response = await mongodb
    .getDb()
    .db('week2')
    .collection('inventory')
    .replaceOne({ _id: userId }, part);
    if (!response){
      res.status(404).json({message : "unable to find ID"})
    }
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the entry.');
  }
}catch(error){
  res.status(500).json({message : "unable to get ID, make sure you have entered a valid ID"})
  }
};

const deletePart = async (req, res) => {
  try {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('week2').collection('inventory').deleteOne({ _id: userId }, true);
  if (!response){
    res.status(404).json({message : "unable to find ID"})
  }
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting the part.');
  }
}catch(error){
  res.status(500).json({message : "unable to get ID, make sure you have entered a valid ID"})
  }
};

module.exports = {
  getAll,
  getSingle,
  createPart,
  updatePart,
  deletePart
};