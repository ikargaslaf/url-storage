import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfigService from '@/config/ormconfig';
import { UrlModule } from '@/modules/url/url.module';
import { TelegramModule } from '@/modules/telegraf/telegraf.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UrlModule,
    TelegramModule
  ],
})
export class AppModule {}
