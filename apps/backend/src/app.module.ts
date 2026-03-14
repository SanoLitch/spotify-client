import { Module } from '@nestjs/common';
import {
  ConfigModule, ConfigService,
} from '@nestjs/config';
import { LoggerModule } from '@libs/logger';
import { AuthModule } from './auth';
import { LibraryModule } from './library';
import { StreamingModule } from './streaming';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('NODE_ENV') || 'development',
    }),
    AuthModule,
    LibraryModule,
    StreamingModule,
  ],
})
export class AppModule { }
