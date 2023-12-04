import mongoose, {Schema, ObjectId } from 'mongoose'


const Areainformationmodel = new Schema({
    id: { type: ObjectId},
    areainformation_name:{
        type: String,
        required: true,
    },
    areainformation_img:{
        type: String,
        required: true,
    }
});

const Areainformation = mongoose.model('AreaInformation', Areainformationmodel);

export default Areainformation;