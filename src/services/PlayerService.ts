import { Model } from "mongoose";
import { Player, PlayerDTO } from "src/models/Player";
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayerService {
  constructor(@InjectModel(Player.name) private playerModel: Model<Player>) {}

  async findAll(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  async cadastrarUsuario(playerDTO: PlayerDTO): Promise<Boolean> {
    if(playerDTO.password.length < 5) {
      return false;
    }

    const newPlayer = new this.playerModel(playerDTO);
    newPlayer.passwordHash = playerDTO.password;

    if(!newPlayer.save()) {
      return false;
    }

    return true;
  }
}
