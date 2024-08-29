import { CreateUrlDto } from "@/modules/url/dto/url.create.dto";
import { UrlEntity } from "@/modules/url/url.entity";
import { PaginationQueryDto } from "@/resources/dto/pagination.in.dto";
import { ApiResponseWithPagination } from "@/resources/dto/types";
import getPaginationMeta from "@/utils/getPaginationMeta";
import getPaginationParams from "@/utils/getPaginationParams";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(UrlEntity)
        private readonly urlRepository: Repository<UrlEntity>
    ) {}

    async create(url: CreateUrlDto) {
        const newUrl = this.urlRepository.create(url)
        await newUrl.save()
        return newUrl;
    }

    async delete(urlId: string) {
        const url = await this.findByIdOrError(urlId)
        await this.urlRepository.delete({ id: url.id })
        return true
    }

    async findByPaginationParams(
        params: PaginationQueryDto
    ): Promise<ApiResponseWithPagination<UrlEntity>>  {
        const { skip, limit, page } = getPaginationParams(params);
        const [urls, total]  = await this.urlRepository.findAndCount({
            skip: skip,
            take: limit
        })

        const meta = getPaginationMeta({ total, limit, page });
        return { list: urls, meta: meta }
    }

    async findByIdOrError(urlId: string) {
        const url = await this.urlRepository.findOne({ where: {id: urlId }})
        if(!url) {
            throw new HttpException('url: url with given id not found', HttpStatus.NOT_FOUND)
        }
        return url
    }
}
