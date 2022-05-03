import { UserDto } from 'src/users/dto/user.dto';

export class TodoDto {
  id: string;
  body: string;
  state: string;
  user: UserDto;
}
