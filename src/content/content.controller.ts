import {
  Controller,
  HttpException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArticleService } from '../article/article.service';
import { UserService } from '../user/user.service';
import { CommentService } from '../comment/comment.service';

@Controller('content')
export class ContentController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}

  @Post('restore')
  @UseInterceptors(FileInterceptor('file'))
  async restoreData(@UploadedFile() file: Express.Multer.File) {
    try {
      const parsedData: any = JSON.parse(file.buffer.toString());

      // Delete current data
      await this.articleService.deleteAll();
      await this.commentService.deleteAll();
      await this.userService.deleteAll();

      // Insert new data
      if (parsedData.users) {
        await this.userService.createManyUsers(parsedData.users);
      }
      if (parsedData.articles) {
        await this.articleService.createManyArticles(parsedData.articles);
      }
      if (parsedData.comments) {
        await this.commentService.createManyComments(parsedData.comments);
      }
    } catch (e) {
      throw new HttpException('Can not parse file', 500);
    }

    return 'Data restored successfully';
  }

  @Post('load')
  @UseInterceptors(FileInterceptor('file'))
  async loadData(@UploadedFile() file: Express.Multer.File) {
    try {
      const parsedData: any = JSON.parse(file.buffer.toString());

      // Insert new data
      if (parsedData.users) {
        await this.userService.createManyUsers(parsedData.users);
      }
      if (parsedData.articles) {
        await this.articleService.createManyArticles(parsedData.articles);
      }
      if (parsedData.comments) {
        await this.commentService.createManyComments(parsedData.comments);
      }
    } catch (e) {
      throw new HttpException('Can not parse file', 500);
    }

    return 'Data restored successfully';
  }
}
