import mongoose, { Schema, models, model } from "mongoose";

const MessageSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  sessionId: { type: String, required: true },
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = models.Message || model("Message", MessageSchema);
export default Message;
