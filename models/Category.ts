import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const CategorySchema = new Schema({
  name: String,
});
export default mongoose.model("Category", CategorySchema);
