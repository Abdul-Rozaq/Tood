import HomeScreen from '../screens/HomeScreen';
import NewTodoScreen from '../screens/NewTodoScreen';
import TodoDetailsScreen from '../screens/TodoDetailsScreen';

export const _APP_ROUTES = {
  HOME_SCREEN: 'home_screen',
  TODO_DETAILS_SCREEN: 'Todo_details_screen',
  NEW_TODO_SCREEN: 'new_todo_screen',
  SPLASH_SCREEN: 'splash_screen',
};

export const _APP_SCREENS = [
  {
    route: _APP_ROUTES.HOME_SCREEN,
    screen: HomeScreen,
  },
  {
    route: _APP_ROUTES.TODO_DETAILS_SCREEN,
    screen: TodoDetailsScreen,
  },
  {
    route: _APP_ROUTES.NEW_TODO_SCREEN,
    screen: NewTodoScreen,
  },
];
