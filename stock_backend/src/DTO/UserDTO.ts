import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  create_data: Date;

  @ApiProperty()
  update_data: Date;
}

export class LoginUserDTO {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}
