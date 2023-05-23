import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },

    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },

    pseudo: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },

    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
  
    password: {
      type: String,
      required: true,
      min: 5,
    },
         
    role: {
      type: String,
      enum: ["Lecteur", "Reparateur", "Vendeur", "Empereur"],
      default: "Lecteur",
    },

  repair: Array,

  },
  { timestamps: true }
);

 /* --------------- CRYPTAGE ET SALAGE DU MDP AVEC BCRYPT --------------------------- */

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);
export default User;
