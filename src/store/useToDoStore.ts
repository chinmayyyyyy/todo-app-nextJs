import { create } from "zustand";

type Task = {
  id: string;
  text: string;
  date: string;
  completed: boolean;
};

type ToDoState = {
  tasks: Task[];
  addTask: (text: string, date: string) => void;
  toggleTask: (id: string) => void;
  editTask: (id: string, newText: string) => void;
  deleteTask: (id: string) => void;
};

export const useToDoStore = create<ToDoState>((set) => {
  const isClient = typeof window !== "undefined";

  const loadTasks = () => {
    if (isClient) {
      return JSON.parse(localStorage.getItem("tasks") || "[]");
    }
    return []; 
  };

  const saveTasks = (tasks: Task[]) => {
    if (isClient) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  return {
    tasks: loadTasks(),
    addTask: (text, date) =>
      set((state) => {
        const newTask = { id: Date.now().toString(), text, date, completed: false };
        const updatedTasks = [...state.tasks, newTask];
        saveTasks(updatedTasks);
        return { tasks: updatedTasks };
      }),
    toggleTask: (id) =>
      set((state) => {
        const updatedTasks = state.tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks(updatedTasks);
        return { tasks: updatedTasks };
      }),
    editTask: (id, newText) =>
      set((state) => {
        const updatedTasks = state.tasks.map((task) =>
          task.id === id ? { ...task, text: newText } : task
        );
        saveTasks(updatedTasks);
        return { tasks: updatedTasks };
      }),
    deleteTask: (id) =>
      set((state) => {
        const updatedTasks = state.tasks.filter((task) => task.id !== id);
        saveTasks(updatedTasks);
        return { tasks: updatedTasks };
      }),
  };
});
