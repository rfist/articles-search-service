import { NestFactory } from '@nestjs/core';
import { AppModule } from "./app.module";
import { UserService } from "./user/user.service";
import { CommentService } from "./comment/comment.service";
import { ArticleService } from "./article/article.service";
import * as fs from "fs";
import to from "await-to-js";
import { TypesenseService } from "./typesense/typesense.service";

async function bootstrap() {
    const application = await NestFactory.createApplicationContext(
        AppModule,
    );

    const command = process.argv[2];

    switch (command) {
        case 'save-db':
            const userService = application.get(UserService);
            const articleService = application.get(ArticleService);
            const commentService = application.get(CommentService);

            let err, users, articles, comments;
            [err, users] = await to(userService.getAllUsers());
            [err, articles] = await to(articleService.getAllArticles());
            [err, comments] = await to(commentService.getAllComments());

            const data = { users: users || [], articles: articles || [], comments: comments || [] };
            fs.writeFileSync('db.txt', JSON.stringify(data));
            console.log('Database successfully saved');
            break;
        case 'drop-db':
            await application.get(UserService).deleteAll();
            await application.get(ArticleService).deleteAll();
            await application.get(CommentService).deleteAll();
            await application.get(TypesenseService).dropIndex();
            console.log('Database successfully dropped');
            break;
        default:
            console.log('Command not found');
            process.exit(1);
    }

    await application.close();
    process.exit(0);
}

bootstrap();