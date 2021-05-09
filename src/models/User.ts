import { model, Schema, Model, Document } from 'mongoose';

interface UserTypeChecking extends Document {
  email: string;
  name: string;
  surname: string;
  password:string
}


const UserSchema:Schema = new Schema({
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});
const User: Model<UserTypeChecking> = model('User', UserSchema);

export default User;