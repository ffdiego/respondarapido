import { Controller, Get, HttpException, HttpStatus, Post, Req, Res, Body } from '@nestjs/common';
import { response } from 'express';
import { Player, PlayerDTO } from 'src/models/Player';
import { PlayerService } from 'src/services/PlayerService';


@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  async getHello(): Promise<Player[]> {
    return await this.playerService.findAll();
  }

  @Post()
  async postUser(@Body() playerDTO: PlayerDTO): Promise<void> {
    try {
      await this.playerService.cadastrarUsuario(playerDTO);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
