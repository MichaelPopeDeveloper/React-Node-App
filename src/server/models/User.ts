import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [{
    title: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: false,
    },
    created_at: {
      type: Date,
      required: true,
    },
    updated_at: {
      type: Date,
      required: true,
    },
  }],
});

export const user = mongoose.model('User', userSchema);
