import Model from "../models/Model.js";

export const saveModelinDB = async (req, res) => {
  try {
    const { imageUrl, qrUrl, modelUrl } = req.body;
    const userId = req.user.id;

    if (!imageUrl || !qrUrl || !modelUrl) {
      return res.status(400).json({ message: "All strings are required." });
    }

    const newEntry = new Model({
      imageUrl,
      qrUrl,
      modelUrl,
      userId,
    });

    await newEntry.save();

    res
      .status(201)
      .json({ message: "Data added successfully.", data: newEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const getUserModels = async (req, res) => {
  try {
    const userId = req.user.id;

    const userModels = await Model.find({ userId });

    res.status(200).json({ data: userModels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching data." });
  }
};
