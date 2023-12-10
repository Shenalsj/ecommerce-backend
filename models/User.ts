import mongoose from "mongoose"

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserSchema = new Schema({
  //id: ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // avatar: {
  //   type: String,
  //   required: true,
  // },
  role: {
    type: String,
    required: true,
    default: "USER",
  },
}
)
export default mongoose.model("User", UserSchema)
