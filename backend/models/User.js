const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
  },
  role: {
    type: String,
    enum: ['shipper', 'transporter'], // Restrict to shipper or transporter
    required: true, // Role is mandatory
  },
  location: {
    type: String,
    default: '',
  },
  companyName: {
    type: String,
    default: '',
  },
  vehicleType: { // Optional field for transporters
    type: String,
    default: '',
  },
  phoneNumber: {
    type: String,
    default: '',
  },
  profilePic: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // If confirmPassword is provided, hash it too (optional)
    if (this.confirmPassword) {
      this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);
    }
  }
  next();
});
// Method to compare entered password with the hashed one
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  const match = await bcrypt.compare(enteredPassword, this.password);
  console.log('Password Comparison:', match); // Debugging line
  return match;
};

module.exports = mongoose.model('User', userSchema);  