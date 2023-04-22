import { Injectable, Logger } from '@nestjs/common';
import Typesense, { Client } from 'typesense';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { IArticle } from '../interface/article.interface';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TypesenseService {
    private client: Client;
    private readonly logger = new Logger(TypesenseService.name);

    constructor(private configService: ConfigService) {
        this.client = new Typesense.Client({
            nodes: [
                {
                    host: this.configService.get<string>('TYPESENSE_URI'),
                    port: 8108,
                    protocol: 'http',
                },
            ],
            apiKey: this.configService.get<string>('TYPESENSE_API_KEY'),
            connectionTimeoutSeconds: 5,
        });

        // init collection
        const articleSchema: CollectionCreateSchema = {
            name: 'articles',
            fields: [
                { name: '_id', type: 'string', facet: false },
                { name: 'title', type: 'string', facet: false },
                { name: 'body', type: 'string', facet: false },
                { name: 'author', type: 'string', facet: true },
            ],
        };

        this.client
            .collections()
            .create(articleSchema)
            .then(
                (data) => {
                },
                (err) => {
                },
            );
    }

    async dropIndex() {
        return this.client.collections('articles').delete();
    }

    async addToIndex(article: any) {
        this.client
            .collections('articles')
            .documents()
            .create(article)
            .then(
                (data) => {
                    this.logger.log('index added', data);
                },
                (err) => {
                    this.logger.log('failed to add index', err);
                },
            );
    }

    async search(q: string) {
        const search_query = {
            q,
            query_by: 'body',
            sort_by: '_text_match:desc',
            prioritize_exact_match: true,
            max_candidates: 0,
            exhaustive_search: true,
            num_typos: 1,
        };

        const matching_articles = await this.client
            .collections('articles')
            .documents()
            .search(search_query);

        return matching_articles.hits.map((article) => {
            const document = article.document as IArticle;
            const regexp = new RegExp(q, 'gi');
            const offsets = [...document.body.matchAll(regexp)].map(
                (match) => match.index,
            );
            return { article_id: document._id, offsets: offsets };
        });
    }
}
