import mongoose, {Schema, ObjectId } from 'mongoose'


const typeHouseSchema = new Schema({
    id: { type: ObjectId},
  typehouse_name: {
    type: String,
    required: true,
  },
});

const TypeHouse = mongoose.model('TypeHouse', typeHouseSchema);

export default TypeHouse;
