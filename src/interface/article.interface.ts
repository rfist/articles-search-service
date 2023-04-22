import { Document, Types } from 'mongoose';

export interface IArticle extends Document {
  readonly title: string;
  readonly body: string;
  readonly author: Types.ObjectId;
  readonly comments: Types.ObjectId[];
  readonly createdAt: Date;
}
