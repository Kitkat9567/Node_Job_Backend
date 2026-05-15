const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyUrl: { type: String, required: false },
    location: { type: String, required: false },
  },
  { timestamps: true },
);

companySchema.pre("save", async function () {
  if (!this.isModified("password"));
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("cmpny_mstr", companySchema);
