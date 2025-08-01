import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './create-todo.dto';
import { Todo, TodoDocument } from 'src/schemas/todo.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
    constructor(
        @InjectModel(Todo.name) private todoModel: Model<TodoDocument>
    ) { }
    // private todos: CreateTodoDto[] = []; //inmemory
    getHello(): string {
        return 'Hello World!';
    }
    async getAllTodos(): Promise<Todo[]> {
        return this.todoModel.find().exec();
    }


    async createTodo(title: string) {
        // if(!title){
        //     throw new BadRequestException("Title is required..")
        // }
        const newTodo = new this.todoModel({
            title,
            completed: false,
            id: Date.now(), // optional, MongoDB provides _id by default
        });
        return await newTodo.save();
    }

    async deleteTodo(id: number): Promise<void> {
        const todo = await this.todoModel.findOne({ id }).exec();//findOne read the data
        if (!todo) throw new BadRequestException("Incorrect Id provided");
        await this.todoModel.deleteOne({ id }).exec();//deleteone delete the document
    }

    async updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
        // if(!updateTodoDto.title) throw new Error('Title is required');
        //check if id exists
        //match id client send with id in database
        const todo = await this.todoModel.findOneAndUpdate({ id }, updateTodoDto, { new: true }).exec();
        if (!todo) throw new BadRequestException("Incorrect Id provided");
        return {
            title: todo?.title,
            id: todo.id,
            completed: todo.completed
        }
    }



}
