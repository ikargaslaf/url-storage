import { Injectable, OnModuleInit } from '@nestjs/common';
import { Ctx, Start, Update, On, Hears, InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { UrlService } from '@/modules/url/url.service';
import { CreateUrlDto } from '@/modules/url/dto/url.create.dto';
import { PaginationQueryDto } from '@/resources/dto/pagination.in.dto';
import { Context as TelegrafContext } from 'telegraf';
import { isURL } from 'class-validator';
import { commands } from '@/modules/telegraf/telegraf.comands';

interface CustomContext extends TelegrafContext {
  match: RegExpExecArray;
}

@Update()
@Injectable()
export class TelegramService implements OnModuleInit {
  constructor(
    private readonly urlService: UrlService,
    @InjectBot() private readonly bot: Telegraf<CustomContext>
  ) {}

  async onModuleInit() {
    await this.bot.telegram.setMyCommands(commands);
    console.log('Telegram bot started!');
  }

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await ctx.reply('Welcome! You can manage URLs with this bot.');
  }

  @Hears(/^\/create\s+(.+?)\s+(.+)$/)
  async onCreate(@Ctx() ctx: CustomContext) {
    const url = ctx.match[1];
    const name = ctx.match[2];

    if (!url || !isURL(url)) {
      await ctx.reply('Please provide a valid URL.');
      return;
    }

    const createUrlDto: CreateUrlDto = {
      url: url.trim(),
      name: name
    };

    const newUrl = await this.urlService.create(createUrlDto);
    await ctx.reply(`URL created: ${newUrl.id}`);
  }

  @Hears(/^\/delete (.+)$/)
  async onDelete(@Ctx() ctx: CustomContext) {
    const urlId = ctx.match[1];
    try {
      await this.urlService.delete(urlId);
      await ctx.reply(`URL deleted: ${urlId}`);
    } catch (e) {
      await ctx.reply('URL not found or an error occurred.');
    }
  }

  @Hears(/^\/list(?:\s+(\d+))?(?:\s+(\d+))?$/)
  async onList(@Ctx() ctx: CustomContext) {
    const page = parseInt(ctx.match[1]) || 1;
    const limit = parseInt(ctx.match[2]) || 10;
    const paginationParams: PaginationQueryDto = {
      page,
      limit
    };

    const result = await this.urlService.findByPaginationParams(paginationParams);

    const response = result.list
      .map((url) => `ID: ${url.id}\nURL: ${url.url}\nName: ${url.name}`)
      .join('\n');

    await ctx.reply(`URLs:\n${response}\n${JSON.stringify(result.meta)}`,);
  }

  @Hears(/^\/get (.+)$/)
  async onGet(@Ctx() ctx: CustomContext){
    try {
      const url = await this.urlService.findByIdOrError(ctx.match[1])
      await ctx.reply(`ID: ${url.id}\nURL: ${url.url}\nName: ${url.name}`)
    } catch (e) {
      await ctx.reply(JSON.stringify(e))
    }
  }

  @Hears(/^\/help$/)
  async onHelp(@Ctx() ctx: Context) {
    const helpMessage = `
      *Available Commands:*\n
/start - Start interacting with the bot
/create <url> <name> - Create a new URL entry
/delete <id> - Delete a URL entry by ID
/get <id> - Get a URL by given id
/list [page] [limit] - List URLs with optional pagination
  - *page*: Page number (default: 1)
  - *limit*: Number of URLs per page (default: 10)
/help - Show this help message`;
  await ctx.reply(helpMessage);
}
}
