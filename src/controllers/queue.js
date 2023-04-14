import Queue from "../models/Queue";

export const getQueues = async (req, res) => {
  try {
    const queues = await Queue.find();
    queues == 0
      ? res.status(404).json({ message: "No hay turnos en fila" })
      : res.json(queues);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const lastQueue = async (req, res) => {
  try {
    const queue = await Queue.find({ isWaiting: false })
      .sort({ createdAt: -1 })
      .limit(1)
      .select("idup");
    res.json(queue);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "No hay turnos en fila",
    });
  }
};

export const nextQueue = async (req, res) => {
  try {
    const queue = await Queue.find({ isWaiting: true })
      .sort({ createdAt: 1 })
      .limit(1)
      .select("idup");
    res.json(queue);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `No hay turnos en fila ${err}`,
    });
  }
};

export const isWaiting = async (req, res) => {
  try {
    const queues = await Queue.find({ isWaiting: true });
    queues == 0
      ? res.status(404).json({ message: "No hay turnos en fila" })
      : res.json(queues);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "No hay turnos en fila",
    });
  }
};

export const getQueueById = async (req, res) => {
  try {
    const queue = await Queue.findById(req.params.queueId);
    res.status(200).json(queue);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const createQueue = async (req, res, next) => {
  try {
    const { idup } = req.body;
    const newQueue = new Queue({ idup });
    const count = await Queue.countDocuments({ isWaiting: true });
    const queueSaved = await newQueue.save();
    res.status(201).json({
      message: `¡Estas en la fila!, delante tuyo hay: ${count} personas`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const updateQueueById = async (req, res) => {
  try {
    const updatedQueue = await Queue.findByIdAndUpdate(req.params.queueId, {
      isWaiting: false,
    });
    res.status(200).json({
      message: `turno en fila atendido: ${updatedQueue.idup}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};