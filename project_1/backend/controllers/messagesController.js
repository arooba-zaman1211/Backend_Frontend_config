const message = require("../models/messagesModel");

exports.getmessages = async (req, res) => {
  try {
    const data = await message.find();

    if (!data) {
      return res.status(400).json({ error: "No data found", data: null });
    }

    res.status(200).json({ message: "Data fetched successfully", data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendmessages = async (req, res) => {
  try {
    const { name, email, input } = req.body;

    const messages = await message.create({
      name,
      email,
      input,
    });

    if (!messages) {
      return res
        .status(400)
        .json({ error: "Error in creating a message", data: null });
    }

    res
      .status(200)
      .json({ message: "Message created successfully", data: messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletemessage = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await message.findByIdAndDelete(id);

    if (!data) {
      return res.status(400).json({ error: "No row effected", data: null });
    }

    res.status(200).json({ message: "Data deleted sucessfully", data: id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatedata = async (req, res) => {
  try {
    const id = req.params.id;
    const { input } = req.body;

    const data = await message.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          input: input,
        },
      },
      { new: true }
    );

    if (!data) {
      return res.status(400).json({ error: "No row effected", data: null });
    }

    res.status(200).json({ message: "Data updated sucessfully", data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
