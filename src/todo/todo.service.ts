import { Injectable, Request } from '@nestjs/common';
import { TodoEntity } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todosRepository: Repository<TodoEntity>,
    private readonly usersService: UsersService,
  ) {}

  async getAllTodos() {
    const todos = await this.todosRepository.find({
      relations: ['todos', 'user'],
    });
    console.log(todos);
    return 'xyu';
  }

  async create(task: CreateTodoDto, user: UserEntity) {
    const currentUser = await this.usersService.findOne(user.username);
    const todo = this.todosRepository.create();
    todo.body = task.body;
    todo.state = task.state;
    todo.user = currentUser;
    await this.todosRepository.save(todo);
  }

  async delete(id: number) {
    await this.todosRepository.delete(id);
  }
}
