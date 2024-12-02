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
      'mongodb+srv://user-myl:yLFKPPH714nxsCjS@micluster.bo3pw.mongodb.net/myl',
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
