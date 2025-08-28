import { ApiProperty } from '@nestjs/swagger';
import { CreateMenuDto } from './create-menu.dto';
import { exampleRole } from '../../../../../common/utils/faker-examples';

export class UpdateMenuDto extends CreateMenuDto {
  @ApiProperty({ example: exampleRole.role })
  id: string;
}
