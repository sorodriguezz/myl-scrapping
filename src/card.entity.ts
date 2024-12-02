import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardDocument = Card & Document;

@Schema()
export class Card {
  @Prop()
  slugCard: string;

  @Prop()
  name: string;

  @Prop()
  flavour: string;

  @Prop()
  ability: string;

  @Prop()
  ability_html: string;

  @Prop()
  damage: string;

  @Prop()
  cost: string;

  @Prop()
  type: string;

  @Prop()
  race: string;

  @Prop()
  rarity: string;

  @Prop()
  ilustrador: string;

  @Prop()
  ilustradorSlug: string;

  @Prop()
  slug_edicion: string;

  @Prop()
  edicion: string;

  @Prop()
  image: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
