import { model, Schema, Model, Document } from 'mongoose';
import User from './User';

interface ITokenTypeChecking extends Document {
    owner: string,
    jwt: string,
    refreshToken: string
}

const TokenSchema: Schema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    jwt: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    }
});
const Token: Model<ITokenTypeChecking> = model('token', TokenSchema);

export default Token;