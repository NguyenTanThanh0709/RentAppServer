import mongoose, {Schema, ObjectId } from 'mongoose'

export default mongoose.model('FavoritesRoom',
    new Schema({
        id: { type: ObjectId},
        user: {
            type: Schema.Types.ObjectId,
            ref: 'Tenant', // Reference to the 'Tenant' model
        },
        
        room: [{
            type: Schema.Types.ObjectId,
            ref: 'RoomingHouse', // Reference to the 'RoomingHouse' model
            require:false
        }]
        
    })
)

