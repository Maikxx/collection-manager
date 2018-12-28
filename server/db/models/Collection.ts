import * as Mongoose from 'mongoose'

export const Collection = Mongoose.model('Collection', new Mongoose.Schema({
    _id: Mongoose.Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    collectedItems: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'CollectedItem',
    }],
}))

export const CollectedItem = Mongoose.model('CollectedItem', new Mongoose.Schema({
    _id: Mongoose.Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    assignedCollection: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
    },
}))
