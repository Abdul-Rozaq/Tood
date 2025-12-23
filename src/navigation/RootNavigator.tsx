import React, { useEffect, useState } from 'react';
import Splashscreen from '../screens/Splashscreen';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './AppNavigator';

export default function RootNavigator() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    init();
  }, []);

  if (loading) return <Splashscreen />;

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
