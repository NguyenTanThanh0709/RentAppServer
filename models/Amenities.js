import mongoose, {Schema, ObjectId } from 'mongoose'


const AmenitiesSchema = new Schema({
    id: { type: ObjectId},
    amenity_name:{
        type: String,
        required: true,
    },
    amenity_img:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean
    }
});

const Amenities = mongoose.model('Amenities', AmenitiesSchema);

export default Amenities;