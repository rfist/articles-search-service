import { Document, Types } from 'mongoose';

export interface IComment extends Document {
  readonly body: string;
  readonly author: Types.ObjectId;
  readonly article: Types.ObjectId;
  readonly createdAt: Date;
}
