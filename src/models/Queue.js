import mongoose from "mongoose";

const queueSchema = new mongoose.Schema(
  {
    idup: {
      type: Number,
      default: 0,
      maxlength: 12,
      unique: false,
    },
    isWaiting: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Queue = mongoose.model("queue", queueSchema);

export default Queue;