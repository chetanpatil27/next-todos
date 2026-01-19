import { axiosInstance } from "@/config/https";

export class TodoServices {
  static getTodos = async () => {
    const response = await axiosInstance.get("/todos?userId=1");
    return response;
  };
  static getTodo = async (id: number) => {
    const response = await axiosInstance.get(`/todos/${id}`);
    return response;
  };
  static createTodo = async (data: {
    userId: number;
    title: string;
    completed: boolean;
    id: number;
  }) => {
    const response = await axiosInstance.post("/todos", data);
    return response;
  };
  static updateTodo = async (
    id: number,
    data: {
      userId?: number;
      title?: string;
      completed?: boolean;
    }
  ) => {
    const response = await axiosInstance.put(`/todos/${id}`, data);
    return response;
  };
  static deleteTodo = async (id: number) => {
    const response = await axiosInstance.delete(`/todos/${id}`);
    return response;
  };
  static changeStatus = async (id: number, completed: boolean) => {
    const response = await axiosInstance.patch(`/todos/${id}`, { completed });
    return response;
  };
}
