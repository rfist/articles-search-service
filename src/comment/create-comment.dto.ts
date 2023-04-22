import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  readonly body: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly author: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  readonly article: Types.ObjectId;
}
