export interface ITodo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  top_secret_prop: string;
}

export interface InputTodo extends ITodo {
  // custom stuff...
}
