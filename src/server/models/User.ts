import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
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
  notes: [{
    // id: {
    //   type: String,
    //   required: false,
    //   unique: true,
    // },
    title: {
      type: String,
      required: false,
    },
    note: {
      type: String,
      required: false,
    },
    // created_at: {
    //   type: Date,
    //   required: true,
    // },
    // updated_at: {
    //   type: Date,
    //   required: true,
    // },
  }],
});

export const user = mongoose.model('User', userSchema);
