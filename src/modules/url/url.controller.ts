import { CreateUrlDto } from "@/modules/url/dto/url.create.dto";
import { UrlEntity } from "@/modules/url/url.entity";
import { UrlService } from "@/modules/url/url.service";
import { ApiDocumentation } from "@/resources/dto/documentation.decorator";
import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { PaginationQueryDto } from "@/resources/dto/pagination.in.dto";

@ApiTags('Url')
@Controller('url')
export class UrlController {
    constructor(
        private readonly urlService: UrlService
    ) {}

    @Delete(':id')
    @ApiDocumentation({
        summary: 'Удаление url по ID'
    })
    delete(@Param('id') id: string) {
        return this.urlService.delete(id)
    }

    @Post()
    @ApiDocumentation({
        summary: 'Создание новой записи url',
        type: UrlEntity
    })
    create(@Body() body: CreateUrlDto){
        const url = this.urlService.create(body)
        return plainToInstance(UrlEntity, url)
    }

    @Get(':id')
    @ApiDocumentation({
        summary: 'Получение url по id'
    })
    getById(@Param('id') id: string) {
        return this.urlService.findByIdOrError(id)
    }

    @Get()
    @ApiDocumentation({
        summary: 'Получение записей url с пагинацией'
    })
    getAll(@Query() query: PaginationQueryDto) {
        return this.urlService.findByPaginationParams(query)
    }

}
