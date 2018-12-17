import * as mongoose from 'mongoose'

export const Collection = mongoose.model('Collection', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: Date,
    name: {
        type: String,
    },
}))
