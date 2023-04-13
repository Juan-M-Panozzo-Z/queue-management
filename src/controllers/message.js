import Message from "../models/Message";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    messages == 0
      ? res.status(404).json({ message: "No hay mensajes" })
      : res.json(messages);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const createMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const newMessage = new Message({ message });
    const messageSaved = await newMessage.save();
    res.status(201).json({
      message: `mensaje creado: ${messageSaved.message}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'El mensaje no puede estar vacio, reintente',
    });
  }
};

export const findMessagesByDate = async (req, res) => {
  try {
    const { date } = req.body;
    const messages = await Message.find({
      createdAt: {
        $gte: new Date(date),
      },
    });
    res.json(messages);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const lastMessage = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(1);
    res.json(messages);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
}
