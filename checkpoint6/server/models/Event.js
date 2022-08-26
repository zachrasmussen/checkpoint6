import { Schema } from 'mongoose'
const ObjectId = Schema.Types.ObjectId

export const EventSchema = new Schema({

    creatorId: { type: String, required: true, ref: 'Account' },
    name: { type: String, required: true, minlength: 1, maxlength: 1000 },
    description: { type: String, required: true, minlength: 1, maxlength: 1000 },
    coverImg: { type: String, required: true },
    location: { type: String, required: true, minlength: 1, maxlength: 1000 },
    capacity: { type: Number },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true, default: 'misc', lowercase: true },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, default: false }

},
    { timestamps: true, toJSON: { virtuals: true } }
)

EventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})
