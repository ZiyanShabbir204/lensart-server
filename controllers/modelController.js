import mongoose, { Mongoose } from "mongoose";
import Favourite from "../models/Favourite.js";
import Model from "../models/Model.js";

export const saveModelinDB = async (req, res) => {
  try {
    const { imageUrl, qrUrl, modelUrl,title,category } = req.body;
    const userId = req.user.id;

    if (!imageUrl || !qrUrl || !modelUrl) {
      return res.status(400).json({ message: "All strings are required." });
    }

    const newEntry = new Model({
      imageUrl,
      qrUrl,
      modelUrl,
      userId,
      title,
      category
    });

    await newEntry.save();

    res
      .status(200)
      .json({ message: "Data added successfully.", data: newEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const getUserModels = async (req, res) => {
  try {
    const userId = req.user.id;
    const {limit,category,title,favourite} = req.query

    let query = {userId}

    if(category){
      query.category = category
    }
    if(title){
      query.title = {$regex : title , $options:'i'}
    }
    if(favourite){
      query.favourite = favourite
    }

    const userModels = await Model.find(query).limit(limit).sort({createdAt: -1})

    res.status(200).json({ data: userModels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching data." });
  }
};

export const getModelById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const model = await Model.findOne({ _id: id, userId });

    if (!model) {
      return res
        .status(404)
        .json({ message: "Model not found or access denied." });
    }

    res.status(200).json({ data: model });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching model." });
  }
};

export const addFavourite = async(req,res) =>{
  try {
    const {modelId} = req.body
    const userId = req.user.id

    const favourite = new Favourite({
      userId,
      modelId
    })
    await favourite.save()
    await Model.findByIdAndUpdate({_id:modelId},{favourite:true})

    res
      .status(200)
      .json({ message: "favourite added successfully.", data: favourite });

  } catch (error) {
    console.log("error", error)

    res.status(500).json({ message: error });

  }
}

export const getAllFavourite = async(req,res)=>{
  try {
    const userId = req.user.id
    const favourites = await Favourite.find({userId}).populate("modelId")
    res
    .status(201)
    .json({ data: favourites });

    
  } catch (error) {
    console.log("error",error)
    res.status(500).json({ message: "Server error." });

  }
}

export const deleteModel =  async (req, res) =>{
  try {
    const {modelId} = req.query
    const model = await Model.findByIdAndDelete({_id:modelId})

    res.status(200).json({message:"Deleted successfully", data: model });

  } catch (error) {
    res.status(500).json({ message: "Server error." });

  }
}

export const removeFavourite = async (req,res) =>{
  try {
    const {modelId} = req.query
    console.log("model Id", modelId)
    await Model.findByIdAndUpdate({_id:modelId},{favourite:false})
    const favourite = await Favourite.findOneAndDelete({modelId})

    res.status(200).json({message:"Deleted successfully"});

  } catch (error) {
    res.status(500).json({ message: "Server error." });

  }
}