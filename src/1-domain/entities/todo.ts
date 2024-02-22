export interface ITodo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  top_secret_prop: string;
}

export interface InputTodo extends ITodo {
  // custom stuff...
}

export class TodoEntity implements ITodo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  top_secret_prop: string;
}
