import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
    announcement: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Announcement", AnnouncementSchema);
