import { Button } from '@/components/button';
import { Steps } from '@/components/steps';
import { Welcome } from '@/components/welcome';
import { View } from 'react-native'

import { router } from 'expo-router'

export default function App() {
  return (
    <View style={{ 
      flex: 1,
      padding: 32,
      gap: 40,
    }}>
      <Welcome />
      <Steps />

      <Button onPress={() => router.navigate('/home')}>
        <Button.Title>Começar</Button.Title>
      </Button>
    </View>
  );
}