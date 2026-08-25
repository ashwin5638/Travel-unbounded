import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    country: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      enum: ["india", "international"]
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: String,
      required: true,
      trim: true
    },

    image: {
      type: String,
      required: true,
      trim: true
    },

    interests: [{
      type: String,
      enum: ["adventure", "relaxation", "culture", "wildlife", "beach", "mountains", "heritage"]
    }],

    highlights: [{
      type: String,
      trim: true
    }],

    isActive: {
      type: Boolean,
      default: true
    },

    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Destination =
  mongoose.models.Destination ||
  mongoose.model("Destination", destinationSchema);

export default Destination;
