import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const CategorySchema = new Schema({
  id: ObjectId,
  name: String,
})
export default mongoose.model("Category", CategorySchema)

