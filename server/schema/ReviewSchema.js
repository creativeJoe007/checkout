import mongoose from 'mongoose';
import validator from 'validator';

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value)
    }
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true,
    lowercase: true,
  },
  reviewedOn: {
    type: Number,
    required: true,
    default: Date.now()
  }
})

export default mongoose.model('Reviews', reviewSchema)