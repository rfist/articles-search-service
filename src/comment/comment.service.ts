import { Injectable, NotFoundException } from '@nestjs/common';
import { IComment } from '../interface/comment.interface';
import { CreateCommentDto } from './create-comment.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentService {
    constructor(@InjectModel('Comment') private commentModel: Model<IComment>) {
    }

    async createComment(createCommentDto: CreateCommentDto): Promise<IComment> {
        const newComment = await new this.commentModel(createCommentDto);
        return newComment.save();
    }

    async createManyComments(createCommentDtos: CreateCommentDto[]) {
        return this.commentModel.insertMany(createCommentDtos)
    }

    async getAllComments(): Promise<IComment[]> {
        const commentData = await this.commentModel.find();
        if (!commentData || commentData.length == 0) {
            throw new NotFoundException('Comments data not found!');
        }
        return commentData;
    }

    async getComment(commentId: string): Promise<IComment> {
        const existingComment = await this.commentModel.findById(commentId).exec();
        if (!existingComment) {
            throw new NotFoundException(`Comment #${commentId} not found`);
        }
        return existingComment as IComment;
    }

    async deleteComment(commentId: string): Promise<IComment> {
        const deletedComment = await this.commentModel.findByIdAndDelete(commentId);
        if (!deletedComment) {
            throw new NotFoundException(`Comment #${commentId} not found`);
        }
        return deletedComment;
    }

    async deleteAll() {
        return this.commentModel.deleteMany();
    }

}
