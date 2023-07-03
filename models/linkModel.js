const mongoose = require('mongoose')

const entitySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter name"]
        },
        link: {
            type: String,
            required: [true, "Please enter link!"]
        },
        size: {
            type: String,
            required: true,
        }
    },
    { versionKey: false }
)


const gdtotEntity = mongoose.model('WZML', entitySchema, process.env.GDTOT);
const gdflixEntity = mongoose.model('WZML', entitySchema, process.env.GDFLIX);
const filepressEntity= mongoose.model('WZML', entitySchema, process.env.FILEPRESS);


module.exports = {
    gdtotEntity,
    gdflixEntity,
    filepressEntity
}