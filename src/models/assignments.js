import { Schema, model } from "mongoose";

const assignmentsSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true, enum: ["todo", "inProgress", "done"] },
  },
  {
    timestamps: true
  }
);

export const Assignments = model("assignments", assignmentsSchema);
