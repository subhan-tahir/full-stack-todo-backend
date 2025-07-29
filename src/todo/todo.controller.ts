import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './create-todo.dto';
@Controller('todos')
export class TodoController {
    constructor(private readonly TodoService: TodoService) { }
    @Get()
    getAllTodos(): CreateTodoDto[] {
        return this.TodoService.getAllTodos();
    }

    @Post('create')
    createTodo(@Body() createTodoDto: CreateTodoDto): CreateTodoDto {
        console.log('create todo', createTodoDto);
        return this.TodoService.createTodo(createTodoDto.title);
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: number): void {
        console.log('delete todo', id);
        const todoId = Number(id);
        this.TodoService.deleteTodo(todoId);
    }

   

}
