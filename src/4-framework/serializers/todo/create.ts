import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ITodo } from '@domain/entities/todo';

export class InputCreateTodo implements Partial<ITodo> {
  @ApiProperty({ description: 'Title', example: 'todo title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description',
    example: 'Make a really good code!',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Completed', example: false })
  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;

  @ApiProperty({ description: 'Top Secret Prop', example: 'top secret prop' })
  @IsString()
  @IsOptional()
  top_secret_prop?: string;
}
