import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Comment {
  @Prop()
  body: string;

  @Prop({ ref: 'User', required: true })
  author: Types.ObjectId;

  @Prop({ ref: 'Article', required: true })
  article: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
