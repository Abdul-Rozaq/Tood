import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { _APP_SCREENS } from './routes';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {_APP_SCREENS.map((item, index) => (
        <Stack.Screen
          key={index}
          name={item.route}
          component={item.screen}
          options={{
            headerShown: false,
            animation: 'scale_from_center',
          }}
        />
      ))}
    </Stack.Navigator>
  );
}
