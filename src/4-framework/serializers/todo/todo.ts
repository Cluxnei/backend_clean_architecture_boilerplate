import { Entity } from '@framework/serializers/common/abstractEntity';
import { ITodo } from '@domain/entities/todo';
import { Exclude } from 'class-transformer';

export class TodoEntity extends Entity<TodoEntity> implements Partial<ITodo> {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  @Exclude()
  top_secret_prop: string;
  created_at: Date;
  updated_at: Date | null;
}
