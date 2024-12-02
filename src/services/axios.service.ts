import { CARTAS_EDICIONES, IMAGE_CARD, PROFILE_CARD } from './../constants';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AxiosService {
  constructor(private readonly http: HttpService) {}

  async fetchCardsForEdition(nameEdition: string) {
    let retries = 0;
    while (true) {
      try {
        const resp = await firstValueFrom(
          this.http.get(
            CARTAS_EDICIONES.replace('SLUG_EDICION', nameEdition).replace(
              /\s+/g,
              '',
            ),
          ),
        );

        return resp.data;
      } catch (error) {
        retries++;
        if (retries >= Infinity) {
          throw new Error('Exceeded maximum number of retries');
        }
      }
    }
  }

  async fetchProfileCard(editionSlug: string, cardSlug: string) {
    let retries = 0;
    while (true) {
      try {
        console.log(
          PROFILE_CARD.replace('ED_SLUG', editionSlug).replace(
            'CARD_SLUG',
            cardSlug,
          ),
        );
        const resp = await firstValueFrom(
          this.http.get(
            PROFILE_CARD.replace('ED_SLUG', editionSlug)
              .replace('CARD_SLUG', cardSlug)
              .replace(/\s+/g, ''),
          ),
        );

        return resp.data;
      } catch (error) {
        retries++;
        if (retries >= Infinity) {
          throw new Error('Exceeded maximum number of retries');
        }
      }
    }
  }

  async fetchImageCard(editionId: string, cardId: string) {
    let retries = 0;
    while (true) {
      try {
        const resp = await firstValueFrom(
          this.http.get(
            IMAGE_CARD.replace('ID_EDICION', editionId)
              .replace('EDID_CARD', cardId)
              .replace(/\s+/g, ''),
            { responseType: 'arraybuffer' },
          ),
        );

        return resp.data;
      } catch (error) {
        console.log(error);
        retries++;
        if (retries >= Infinity) {
          throw new Error('Exceeded maximum number of retries');
        }
      }
    }
  }
}
