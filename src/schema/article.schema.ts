import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Article {
  _id: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop({ ref: 'User', required: true })
  author: Types.ObjectId;

  @Prop({ ref: 'Comment' })
  comments: Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
