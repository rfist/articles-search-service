import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IArticle } from '../interface/article.interface';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';
import { TypesenseService } from '../typesense/typesense.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article') private articleModel: Model<IArticle>,
    private readonly typesenseService: TypesenseService,
  ) {}

  async createArticle(createArticleDto: CreateArticleDto): Promise<IArticle> {
    const newArticle = await new this.articleModel(createArticleDto);
    const savedArticle = await newArticle.save();
    this.typesenseService.addToIndex(savedArticle);
    return savedArticle as IArticle;
  }

  async createManyArticles(createArticleDtos: CreateArticleDto[]) {
    Promise.all(
      createArticleDtos.map(
        this.typesenseService.addToIndex.bind(this.typesenseService),
      ),
    );
    return this.articleModel.insertMany(createArticleDtos);
  }

  async getAllArticles(): Promise<IArticle[]> {
    const articleData = await this.articleModel.find();
    if (!articleData || articleData.length == 0) {
      throw new NotFoundException('Articles data not found!');
    }
    return articleData;
  }

  async getArticle(articleId: string): Promise<IArticle> {
    const existingArticle = await this.articleModel.findById(articleId).exec();
    if (!existingArticle) {
      throw new NotFoundException(`Article #${articleId} not found`);
    }
    return existingArticle as IArticle;
  }

  async findArticles(text: string) {
    return this.typesenseService.search(text);
  }

  async deleteArticle(articleId: string): Promise<IArticle> {
    const deletedArticle = await this.articleModel.findByIdAndDelete(articleId);
    if (!deletedArticle) {
      throw new NotFoundException(`Article #${articleId} not found`);
    }
    return deletedArticle;
  }

  async deleteAll() {
    return this.articleModel.deleteMany();
  }
}
