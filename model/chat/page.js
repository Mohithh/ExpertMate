import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    senderEmail: { type: String, required: true },
    receiverEmail: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
