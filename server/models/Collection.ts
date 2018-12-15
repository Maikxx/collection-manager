import * as mongoose from 'mongoose'

export const CollectionSchema = mongoose.model('Collection', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
    },
}))
