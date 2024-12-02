import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { AxiosService } from './services/axios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './card.entity';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot(
      'mongodb+srv://<user>:<password>@cluster.1234.mongodb.net/',
      {
        dbName: 'myl',
      },
    ),
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, AxiosService],
})
export class AppModule {}
