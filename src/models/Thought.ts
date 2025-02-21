import mongoose from 'mongoose';
import { Schema, model, Document } from 'mongoose';

interface IReactions extends Document {
    reactionId: mongoose.Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
  } 

interface IThought extends Document {
  thoughtText: string;
  username: string;
  reactions: IReactions[];
  createdAt: Date;
  reactionCount?: number;
}

const reactionSchema = new Schema<IReactions>({
    reactionId: {type: Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId()},
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });
// Construct a new instance of the schema class
const thoughtSchema = new Schema<IThought>({
    thoughtText: {type: String, required: true, minlength: 1, maxlength: 280},
    username: { type: String, required: true },
    reactions: [reactionSchema],
    createdAt: { type: Date, default: Date.now }

});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions?.length;
})

// Using model() to compile a model based on the schema 'ThoughtSchema'
const Thought = model('MyThought', thoughtSchema);

// Create a new instance of the model, a document

export default Thought;
