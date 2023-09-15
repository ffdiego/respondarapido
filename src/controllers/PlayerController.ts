import { Controller, Get } from '@nestjs/common';
import { Player } from 'src/models/Player';
import { PlayerService } from 'src/services/PlayerService';


@Controller()
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  async getHello(): Promise<Player[]> {
    return await this.playerService.findAll();
  }
}
