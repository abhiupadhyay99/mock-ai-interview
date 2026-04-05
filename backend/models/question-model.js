import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        session: { type: mongoose.Schema.Types.ObjectId, ref: "Session", required: true },
        question: { type: String, required: true },
        options: [{ type: String }],
        answer: { type: String, required: true },
        note: { type: String, default: "" },
        isPinned: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;
