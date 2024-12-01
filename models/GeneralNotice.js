import mongoose from "mongoose";

const GeneralNoticeSchema = new mongoose.Schema({
    notice: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("GeneralNotice", GeneralNoticeSchema);
