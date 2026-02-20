import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { LibraryModule } from './library/library.module';
import { StreamingModule } from './streaming/streaming.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    LibraryModule,
    StreamingModule,
  ],
})
export class AppModule {}