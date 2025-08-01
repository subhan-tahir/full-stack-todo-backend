import { IsBoolean, IsNotEmpty, isNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    title: string
    @IsOptional()
    id: number
    @IsOptional()
    completed: boolean
}
    export class DeleteTodoDto {
        @IsNumber()
        @IsNotEmpty({ message: 'Id is required' })
        id: number
    }
export class UpdateTodoDto {
    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    title: string
    @IsOptional()
    id: number
    @IsOptional()
    completed: boolean
}