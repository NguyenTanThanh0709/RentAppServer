import mongoose, { Schema, ObjectId } from 'mongoose';


export default mongoose.model('CommentReview',
  new Schema({
    id: { type: ObjectId },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant', // Reference to the 'Tenant' model
    },
    roomingHouse: {
      type: Schema.Types.ObjectId,
      ref: 'RoomingHouse', // Reference to the 'RoomingHouse' model
    },
    comment_date: Date,
    content: {
      type: String,
      required: true,
    },
  rating: {
    type: Number,
    required: true,
    validate: {
      validator: function(value) {
        return value >= 1 && value <= 5;
      },
      message: 'Rating must be between 1 and 5',
    },
  },
  })
);
