import { Schema, model, Document, Types } from 'mongoose';
import validator from 'validator';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts?: Types.ObjectId[];
    friends?: Types.ObjectId[];
    friendCount?: number;
}

// Construct a new instance of the schema class
const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true, trim: true },
    email: {type: String, required: true, unique: true,
        validate: {
          validator: (value: string) => validator.isEmail(value),
          message: 'Must be a valid email address'
        }},
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'MyThought',
        },
      ],
    friends: [{ type: Schema.Types.ObjectId, ref: 'MyUser' }]
},
{
  // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
  // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
  toJSON: {
    virtuals: true,
  },
  id: false,
});

userSchema.virtual('friendCount').get(function () {
    return this.friends?.length;
  })

// Using model() to compile a model based on the schema 'UserSchema'
const User = model('MyUser', userSchema);

// Create a new instance of the model, a document


export default User;
