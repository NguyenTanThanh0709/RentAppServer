import mongoose, { Schema, ObjectId } from 'mongoose';


const SearchCriteriaSchema = new Schema({
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
    },
    location: String,
    maxPrice: Number,
    peopleNumber:Number,
    typehouse: {
        type: Schema.Types.ObjectId,
        ref: 'TypeHouse',
        required: false, // Add this line if it's a required field
      },
      amenities: [{
          type: Schema.Types.ObjectId,
          ref: 'Amenities',
      }],
  });
  
  const SearchCriteria = mongoose.model('SearchCriteria', SearchCriteriaSchema);

  export default SearchCriteria;