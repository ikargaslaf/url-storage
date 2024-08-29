import { UrlController } from "@/modules/url/url.controller";
import { UrlEntity } from "@/modules/url/url.entity";
import { UrlService } from "@/modules/url/url.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    exports: [UrlService],
    providers: [UrlService],
    controllers: [UrlController],
    imports: [TypeOrmModule.forFeature([UrlEntity])]
})
export class UrlModule {}
