import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { sendUseCaseHttpResponse } from '@utils/response';
import { GetTodoUseCase } from '@business/useCases/todo/getTodoUseCase';
import { ListTodoUseCase } from '@business/useCases/todo/listTodoUseCase';
import { UpdateTodoUseCase } from '@business/useCases/todo/updateTodoUseCase';
import { DeleteTodoUseCase } from '@business/useCases/todo/deleteTodoUseCase';
import { InputPaginated } from '@framework/serializers/common/inputPaginated';
import { serializePagination } from '@shared/pagination';
import { TodoEntity } from '@framework/serializers/todo/todo';
import { right } from '@shared/either';
import { InputCreateTodo } from '@framework/serializers/todo/create';
import { CreateTodoUseCase } from '@business/useCases/todo/createTodoUseCase';
import { InputUpdateTodo } from '@framework/serializers/todo/update';
import { plainToInstance } from 'class-transformer';

@ApiTags('Todo')
@Controller('/todo')
export class TodoController {
  private readonly logger: Logger = new Logger(TodoController.name, {
    timestamp: true,
  });

  constructor(
    private readonly getTodoUseCase: GetTodoUseCase,
    private readonly listTodoUseCase: ListTodoUseCase,
    private readonly createTodoUseCase: CreateTodoUseCase,
    private readonly updateTodoUseCase: UpdateTodoUseCase,
    private readonly deleteTodoUseCase: DeleteTodoUseCase,
  ) {
    this.logger.debug('new instance');
  }

  @Get('/')
  @HttpCode(200)
  @ApiOperation({
    description: 'Route to list todos',
  })
  async list(@Res() res: Response, @Query() input: InputPaginated) {
    let todos = await this.listTodoUseCase.execute(input);
    if (todos.isRight()) {
      todos = right(serializePagination(TodoEntity, todos.value));
    }
    return sendUseCaseHttpResponse({
      res,
      resource: todos,
      loggerInstance: this.logger,
    });
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiOperation({
    description: 'Route to get a todo',
  })
  async get(@Res() res: Response, @Param('id') id: string) {
    let todo = await this.getTodoUseCase.execute({ id });
    if (todo.isRight()) {
      todo = right(plainToInstance(TodoEntity, todo.value));
    }
    return sendUseCaseHttpResponse({
      res,
      resource: todo,
      loggerInstance: this.logger,
    });
  }

  @Post('/')
  @HttpCode(201)
  @ApiOperation({
    description: 'Route to create a todo',
  })
  async create(@Res() res: Response, @Body() input: InputCreateTodo) {
    let todo = await this.createTodoUseCase.execute(input);
    if (todo.isRight()) {
      todo = right(plainToInstance(TodoEntity, todo.value));
    }
    return sendUseCaseHttpResponse({
      res,
      resource: todo,
      loggerInstance: this.logger,
    });
  }

  @Put('/:id')
  @HttpCode(200)
  @ApiOperation({
    description: 'Route to update a todo',
  })
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() input: InputUpdateTodo,
  ) {
    let todo = await this.updateTodoUseCase.execute({
      id,
      data: input,
    });
    if (todo.isRight()) {
      todo = right(plainToInstance(TodoEntity, todo.value));
    }
    return sendUseCaseHttpResponse({
      res,
      resource: todo,
      loggerInstance: this.logger,
    });
  }

  @Delete('/:id')
  @HttpCode(200)
  @ApiOperation({
    description: 'Route to delete a todo',
  })
  async delete(@Res() res: Response, @Param('id') id: string) {
    return sendUseCaseHttpResponse({
      res,
      resource: await this.deleteTodoUseCase.execute({
        id,
      }),
      loggerInstance: this.logger,
    });
  }
}
