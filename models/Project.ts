import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  order: number;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: [String], required: true },
    githubUrl: { type: String },
    liveUrl: { type: String },
    image: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
