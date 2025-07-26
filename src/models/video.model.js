import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema= new mongoose.Schema({
    videoFile:{
        type: String, //claudinary url
        required: true
    },
    thumbnail:{
        type: String, //claudinary url
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    duration:{
        type: Number, 
        required: true
    },
    views:{
        type: Number,
        default: 0
    },
    isPublished:{
        type: Boolean,
        default: true
    },
    owner:{
        type: mongoose.Types.ObjectId, 
        ref: "User"
    },
     





},{timestamps: true})

//ye simply isliye ye btata h ki hm kitne video ek page p dikhana chahte h
videoSchema.plugin(mongooseAggregatePaginate)

export const Video= mongoose.model("Video", videoSchema)