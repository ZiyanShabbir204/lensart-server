// const mongoose = require('mongoose');
import mongoose from "mongoose";

const ModelSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    qrUrl: {
      type: String,
      required: true,
    },
    modelUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Model = mongoose.model("Model", ModelSchema);

export default Model;
