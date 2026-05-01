import mongoose, { Schema, models, model } from "mongoose";

const ActivitySchema = new Schema({
  time: String,
  description: String,
  cost: Number,
});

const ItineraryDaySchema = new Schema({
  day: Number,
  date: Date,
  title: String,
  activities: [ActivitySchema],
  accommodation: String,
  meals: [String],
  estimatedCost: Number,
});

const TripSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    duration: { type: Number },
    itinerary: [ItineraryDaySchema],
    totalEstimatedCost: { type: Number },
    status: {
      type: String,
      enum: ["planning", "confirmed", "completed"],
      default: "planning",
    },
    tags: [String],
  },
  { timestamps: true }
);

const Trip = models.Trip || model("Trip", TripSchema);
export default Trip;
