import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
    },
});
userSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  });
  userSchema.methods.validatePassword = async function validatePassword(data) {
    console.log(await bcrypt.compare(data, this.password));
    return bcrypt.compare(data, this.password);
  };
const User = mongoose.model('user',userSchema);
export default User;