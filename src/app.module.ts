import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-blog-project', {
      useNewUrlParser: true,
    } as MongooseModuleOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
