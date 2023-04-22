import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly body: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly author: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  readonly comments: Types.ObjectId[];
}
