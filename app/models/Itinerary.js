import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    time: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ["adventure", "relaxation", "culture", "wildlife", "food", "sightseeing", "transport", "other"],
      default: "sightseeing"
    }
  },
  { _id: false }
);

const daySchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    activities: [activitySchema],
    accommodation: { type: String, default: "" }
  },
  { _id: false }
);

const itinerarySchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    preferences: {
      destination: { type: String, default: "" },
      budget: { type: String, default: "" },
      travelers: { type: Number, default: 1 },
      duration: { type: Number, default: 5 },
      interests: [{ type: String }],
      travelStyle: { type: String, default: "" }
    },

    itinerary: [daySchema],

    shareId: {
      type: String,
      unique: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

itinerarySchema.pre("save", function (next) {
  if (!this.shareId) {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.shareId = id;
  }
  next();
});

const Itinerary =
  mongoose.models.Itinerary ||
  mongoose.model("Itinerary", itinerarySchema);

export default Itinerary;
