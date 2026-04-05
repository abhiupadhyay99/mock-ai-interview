import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    role: { type: String, required: true },
    experience: { type: String, required: true },
    topicsToFocus: { type: String },
    description: { type: String },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    score: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);
export default Session;
