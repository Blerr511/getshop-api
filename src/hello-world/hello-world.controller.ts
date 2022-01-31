import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { HelloWorldDto } from './dto/hello-world.dto';
import { HelloWorldService } from './hello-world.service';
import { HelloWorldResponse } from './responses/hello-world.response';

@Controller('hello-world')
export class HelloWorldController {
  constructor(private readonly helloWorldService: HelloWorldService) {}

  @Get('hello/:name')
  @ApiResponse({
    type: HelloWorldResponse,
  })
  helloWorld(@Param() { name }: HelloWorldDto): HelloWorldResponse {
    const message = this.helloWorldService.helloWorld({ name });

    return HelloWorldResponse.from({ message });
  }
}
