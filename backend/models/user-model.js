import mangoose from "mongoose";

const userSchema = new mangoose.Schema(
    {
        name:{type: String, required: true},
        email:{type: String, required: true, unique: true},
        password:{type: String, required: true},
    },
    {
        timestamps: true,
    }
);

const user = mangoose.model("users", userSchema);
export default user;