import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SortOption, SortOrder, Task } from '../types/task';

interface TaskState {
  tasks: Task[];
  sortBy: SortOption;
  sortOrder: SortOrder;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  getPendingTasks: () => Task[];
  getCompletedTasks: () => Task[];
  getPastTasks: () => Task[];
  setSortBy: (sortBy: SortOption) => void;
  toggleSortOrder: () => void;
  getSortedTasks: (tasks: Task[]) => Task[];
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      sortBy: 'dateCreated',
      sortOrder: 'desc',

      addTask: task => {
        const newTask: Task = {
          id: Date.now().toString(),
          ...task,
          completed: false,
          createdAt: new Date(),
        };
        set(state => ({ tasks: [...state.tasks, newTask] }));
      },

      toggleTask: id => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task,
          ),
        }));
      },

      deleteTask: id => {
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== id),
        }));
      },

      updateTask: (id, updatedTask) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id ? { ...task, ...updatedTask } : task,
          ),
        }));
      },

      getPendingTasks: () => {
        const now = new Date();
        return get().tasks.filter(task => {
          const taskDate = new Date(task.date);
          return !task.completed && taskDate >= now;
        });
      },

      getCompletedTasks: () => {
        return get().tasks.filter(task => task.completed);
      },

      getPastTasks: () => {
        const now = new Date();
        return get().tasks.filter(task => {
          const taskDate = new Date(task.date);
          return !task.completed && taskDate < now;
        });
      },

      setSortBy: (sortBy: SortOption) => {
        set({ sortBy });
      },

      toggleSortOrder: () => {
        set(state => ({
          sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
        }));
      },

      getSortedTasks: tasks => {
        const { sortBy, sortOrder } = get();

        const sorted = [...tasks].sort((a, b) => {
          let comparison = 0;

          switch (sortBy) {
            case 'name':
              comparison = a.title.localeCompare(b.title);
              break;
            case 'dateCreated':
              comparison =
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime();
              break;
            // case 'dateModified':
            //   comparison =
            //     new Date(a.updatedAt || a.createdAt).getTime() -
            //     new Date(b.updatedAt || b.createdAt).getTime();
            //   break;
            case 'alertTime':
              comparison =
                new Date(a.date).getTime() - new Date(b.date).getTime();
              break;
            default:
              comparison = 0;
          }

          return sortOrder === 'asc' ? comparison : -comparison;
        });

        return sorted;
      },
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
