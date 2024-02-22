export interface ITodo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  top_secret_prop: string;
  created_at?: Date;
  updated_at?: Date | null;
}

export interface InputTodo extends Omit<ITodo, 'id'> {
  // custom stuff...
}

export class TodoEntity implements ITodo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  top_secret_prop: string;
  created_at?: Date;
  updated_at?: Date | null;
}
