import { Model } from "mongoose";
import { Player, PlayerDTO } from "src/models/Player";
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PlayerService {
  constructor(@InjectModel(Player.name) private playerModel: Model<Player>) {}

  async findAll(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  async cadastrarUsuario(playerDTO: PlayerDTO): Promise<void> {
    if (!playerDTO.username || playerDTO.password?.length < 5) {
      throw new Error('Usuario ou senha invalida');
    }

    if (await this.playerModel.findOne({username: playerDTO.username})) {
      throw new Error('Usuario já existe');
    }

    const newPlayer = new this.playerModel(playerDTO);
    newPlayer.passwordHash = await bcrypt.hash(playerDTO.password, 1);

    newPlayer.save();

  }
}
