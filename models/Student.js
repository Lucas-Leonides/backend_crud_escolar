import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthDate: { type: Date, required: true },
    registrationNumber: { type: String, required: true, unique: true },
    class: { type: String, required: true },
});

export default mongoose.model("Student", StudentSchema);
