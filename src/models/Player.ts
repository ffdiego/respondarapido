import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from "mongoose";

@Schema()
export class Player {
  @Prop({required: true})
  username: string;
  @Prop({required: true})
  passwordHash: string;
}

export type PlayerDTO = {
  username: string;
  password: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
export type PlayerDocument = HydratedDocument<Player>;
