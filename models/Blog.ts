import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  category: string;
  date: string;
  image?: string;
  excerpt: string;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String },
    excerpt: { type: String, required: true },
    published: { type: Boolean, default: false },
    seoTitle: { type: String },
    seoDescription: { type: String },
    keywords: { type: [String], default: [] },
  },
  { timestamps: true },
);

export default mongoose.models.Blog ||
  mongoose.model<IBlog>("Blog", BlogSchema);
