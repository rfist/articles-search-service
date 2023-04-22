import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArticleSchema } from './schema/article.schema';
import { ArticleService } from './article/article.service';
import { ArticleController } from './article/article.controller';
import { CommentSchema } from './schema/comment.schema';
import { CommentService } from './comment/comment.service';
import { CommentController } from './comment/comment.controller';
import { TypesenseService } from './typesense/typesense.service';
import { ContentController } from './content/content.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_DB'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Article', schema: ArticleSchema },
      { name: 'Comment', schema: CommentSchema },
    ]),
  ],
  controllers: [
    UserController,
    ArticleController,
    CommentController,
    ContentController,
  ],
  providers: [UserService, ArticleService, CommentService, TypesenseService],
})
export class AppModule {}
