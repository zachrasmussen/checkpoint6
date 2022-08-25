import { Schema } from 'mongoose'
const ObjectId = Schema.Types.ObjectId

export const CommentsSchema = new Schema({

    eventId: { type: String, required: true, ref: 'Event' },
    body: { type: String, required: true, minlength: 1, maxlength: 1000 },
    creatorId: { type: Object, required: true, ref: 'Account' },
},
    { timestamps: true, toJSON: { virtuals: true } }
)

CommentsSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})
