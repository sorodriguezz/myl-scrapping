import { Injectable } from '@nestjs/common';
import { AxiosService } from './services/axios.service';
import { EDICIONES, IMAGE_CARD } from './constants';
import { InjectModel } from '@nestjs/mongoose';
import { Card, CardDocument } from './card.entity';
import { Model } from 'mongoose';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class AppService {
  constructor(
    private readonly axiosService: AxiosService,
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
  ) {}
  async getCards() {
    let ed: Card[] = [];
    let index = 0;

    for await (const edicion of EDICIONES) {
      const resp = await this.axiosService.fetchCardsForEdition(edicion);

      if (!resp.cards) {
        continue;
      }

      for (const i of resp.cards) {
        const respProfile = await this.axiosService.fetchProfileCard(
          edicion,
          i.slug,
        );

        if (!respProfile.edition || !respProfile.details) {
          continue;
        }

        // const respImg = await this.axiosService.fetchImageCard(
        //   respProfile.edition.id,
        //   respProfile.details.edid,
        // );

        // const buffer = Buffer.from(respImg, 'binary');
        // const base64Image = buffer.toString('base64');

        const card: Card = {
          slugCard: respProfile.details?.slug,
          name: respProfile.details?.name,
          flavour: respProfile.details?.flavour,
          ability: respProfile.details?.ability,
          ability_html: respProfile.details?.ability_html,
          damage: respProfile.details?.damage,
          cost: respProfile.details?.cost,
          type: respProfile.details?.type,
          race: respProfile.details?.race,
          rarity: respProfile.details?.rarity,
          ilustrador: respProfile.illustrator?.name,
          ilustradorSlug: respProfile.illustrator?.slug,
          slug_edicion: respProfile.edition?.slug,
          edicion: respProfile.edition?.title,
          image: IMAGE_CARD.replace('ID_EDICION', respProfile.edition.id)
            .replace('EDID_CARD', respProfile.details.edid)
            .replace(/\s+/g, ''),
        };
        ed.push(card);
      }
      await this.cardModel.insertMany(ed);
      // index++;
      // const jsonContent = JSON.stringify(ed, null, 2);

      // const filePath = path.join('cards', `cards-${index}.json`);
      // fs.writeFileSync(filePath, jsonContent, 'utf8');
      // console.log(`cards-${index}.json`);
    }

    return 'listo';
  }
}
