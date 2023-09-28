import { 
  Schema,
  model
} from "mongoose"

const UserSchema = new Schema(
  {
      name: {
          type: String,
          required: true
      },
      password: {
          type: String,
          requiredd: true
      }
  },
  { timestamps : true }
)

const UserModel = model("user", UserSchema)

export { 
  UserModel 
}

