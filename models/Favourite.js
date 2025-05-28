import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    modelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Model",
      required: true,
    },
  },
  { timestamps: true }
);

const Favourite  = mongoose.model("Favourite",favouriteSchema)

export default Favourite