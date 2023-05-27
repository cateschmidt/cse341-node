const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const getAll = async (req, res, next) => {

  const result = await mongodb.getDb().db('week2').collection('boats').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); // we just need the first one (the only one)
    
  });
  // } catch (error){
  //   console.log(error);
  // }
};


const getSingle = async (req, res, next) => {
  // try{
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('week2').collection('boats').find({_id:userId});
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]); // we just need the first one (the only one)
  });
// }catch(error){
//   console.log(error)
// }
};


const createBoat = async (req, res) => {
  try {
  const boat = {
    vesselName: req.body.vesselName,
    vesselType: req.body.vesselType,
    color: req.body.color,
    hin: req.body.hin,
    service: req.body.service,
    ownerEmail: req.body.ownerEmail,
    ownerName: req.body.ownerName
  }; 
  console.log(boat);
  const response = await mongodb.getDb().db('week2').collection('boats').insertOne(boat);
  if (response.acknowledged) {
    res.status(201).json(response); 
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the boat.');
  }
}catch(error){
res.status(500).json({message : error})
}
};

const updateBoat = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  try {
  const boat = {
    vesselName: req.body.vesselName,
    vesselType: req.body.vesselType,
    color: req.body.color,
    hin: req.body.hin,
    service: req.body.service,
    ownerEmail: req.body.ownerEmail,
    ownerName: req.body.ownerName
  };
  const response = await mongodb
    .getDb()
    .db('week2')
    .collection('boats')
    .replaceOne({ _id: userId }, boat);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
}catch(error){
  res.status(500).json({message : error})
  }
};

const deleteBoat = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('week2').collection('boats').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting the boat.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createBoat,
  updateBoat,
  deleteBoat
};


