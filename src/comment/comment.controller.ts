import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(
    @Res() response,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    try {
      const newComment = await this.commentService.createComment(
        createCommentDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Comment has been created successfully',
        newComment,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Comment not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async getComments(@Res() response) {
    try {
      const commentData = await this.commentService.getAllComments();
      return response.status(HttpStatus.OK).json({
        message: 'All comment data found successfully',
        commentData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getComment(@Res() response, @Param('id') commentId: string) {
    try {
      const existingComment = await this.commentService.getComment(commentId);
      return response.status(HttpStatus.OK).json({
        message: 'Comment found successfully',
        existingComment,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteComment(@Res() response, @Param('id') commentId: string) {
    try {
      const deletedComment = await this.commentService.deleteComment(commentId);
      return response.status(HttpStatus.OK).json({
        message: 'Comment deleted successfully',
        deletedComment,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
