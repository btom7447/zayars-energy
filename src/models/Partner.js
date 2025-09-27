import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema(
    {
        organization: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        orgType: {
            type: String,
            required: true,
        },
        otherOrgType: {
            type: String,
            trim: true,
        },
        interest: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        agree: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// Prevent model overwrite issue in Next.js hot reload
export default mongoose.models.Partner ||
  mongoose.model("Partner", PartnerSchema);
