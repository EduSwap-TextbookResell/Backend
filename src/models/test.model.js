import mongoose from 'mongoose';

const TestSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 64,
  },
});

TestSchema.methods.toJSON = function () {
  return {
    id: this._id,
    text: this.text,
  };
};

const Test = mongoose.model('Test', TestSchema);

export default Test;
