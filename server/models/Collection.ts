import * as mongoose from 'mongoose'

export const Collection = mongoose.model('Collection', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    collectedItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CollectedItem',
    }],
}))

export const CollectedItem = mongoose.model('CollectedItem', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    assignedCollection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
    },
}))
