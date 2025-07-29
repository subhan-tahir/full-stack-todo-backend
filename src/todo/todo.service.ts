import { Injectable } from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './create-todo.dto';

@Injectable()
export class TodoService {
    private todos: CreateTodoDto[] = [];
    getHello(): string {
        return 'Hello World!';
    }
getAllTodos(): CreateTodoDto[] {
console.log('get all todos', this.todos);
return this.todos;
}

    createTodo(title: string): CreateTodoDto {
        const newTodo: CreateTodoDto = {
            title,
            id: Date.now(), // unique ID
            completed: false
        };
        this.todos.push(newTodo);
        return newTodo;
    }

    deleteTodo(id: number): void {
        console.log('Before delete:', this.todos);

        this.todos = this.todos.filter(todo => {
            const match = todo.id !== id;
            return match;
        });


        // return this.todos;
    }
  


}
