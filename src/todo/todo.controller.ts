// import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
// import { TodoService } from './todo.service';
// import { CreateTodoDto, UpdateTodoDto } from './create-todo.dto';
// @Controller('todos')
// export class TodoController {
//     constructor(private readonly TodoService: TodoService) { }
//     @Get()
//     getAllTodos(): CreateTodoDto[] {
//         return this.TodoService.getAllTodos();
//     }

//     @Post('create')
//     createTodo(@Body() createTodoDto: CreateTodoDto): CreateTodoDto {
//         console.log('create todo', createTodoDto);
//         return this.TodoService.createTodo(createTodoDto.title);
//     }

//     @Delete(':id')
//     deleteTodo(@Param('id') id: number): void {
//         console.log('delete todo', id);
//         const todoId = Number(id);
//         this.TodoService.deleteTodo(todoId);
//     }



// }
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './create-todo.dto';
import { Todo } from 'src/schemas/todo.schema';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Get()
    async getAllTodos(): Promise<Todo[]> {
        return await this.todoService.getAllTodos();
    }

    @Post('create')
    async createTodo(@Body() createTodoDto: CreateTodoDto) {

        return this.todoService.createTodo(createTodoDto.title);
    }

    @Delete(':id')
    async deleteTodo(@Param('id') id: number) {
        console.log('delete todo', id);

        const deleteTodo = await this.todoService.deleteTodo(id);

        return {
            message: 'Todo deleted successfully',
            todo: deleteTodo,
            status: 200
        }
    }

    @Put(':id')
    async updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        console.log('update todo', id, updateTodoDto);
        const updatedTodo = await this.todoService.updateTodo(Number(id), updateTodoDto);
        console.log('updated todo', updatedTodo);
        return {
            message: 'Todo updated successfully',
            todo: updatedTodo,
            status: 200
        }
    }
}
