import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { UrlService } from '@/modules/url/url.service';
import { TelegramService } from '@/modules/telegraf/telegraf.service';
import { UrlModule } from '@/modules/url/url.module';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TELEGRAMM_BOT_TOKEN,
    }),
    UrlModule
  ],
  providers: [TelegramService],
})
export class TelegramModule {}
