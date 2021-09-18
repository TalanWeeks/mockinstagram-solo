import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema({
  description: { type: String, minlength: 1, required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justone: true
})
