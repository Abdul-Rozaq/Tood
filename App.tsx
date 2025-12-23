/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { OPENAI_API_KEY, OPENAI_API_URL } from '@env';

console.log(OPENAI_API_KEY, '=== OPENAI_API_KEY ===');
console.log(OPENAI_API_URL, '=== OPENAI_API_URL ===');

function App() {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}

export default App;
