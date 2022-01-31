import { Injectable } from '@nestjs/common';
import { GetHelloWorldParams } from './hello-world.types';

@Injectable()
export class HelloWorldService {
  helloWorld({ name }: GetHelloWorldParams): string {
    return `Hello ${name}`;
  }
}
