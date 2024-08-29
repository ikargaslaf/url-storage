import { BaseEntityWithDatesAndIdColumns } from "@/resources/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";

@Entity('url')
export class UrlEntity extends BaseEntityWithDatesAndIdColumns {
    @ApiProperty()
    @Column()
    url: string

    @ApiProperty()
    @Column()
    name: string
}
