import { model, Schema } from "mongoose";

const PostSchema = new Schema(
  {
    title: String,
    content: String,
    author: { type: Schema.Types.ObjectId, ref: "users", required: true },
    category: String,
    views: Number,
  },
  { versionKey: false, timestamps: true }
);

const PostModel = model("post", PostSchema);
export default PostModel;
