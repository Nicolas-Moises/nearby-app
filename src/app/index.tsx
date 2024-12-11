import { Steps } from '@/components/steps';
import { Welcome } from '@/components/welcome';
import { View } from 'react-native'

export default function App() {
  return (
    <View style={{ 
      flex: 1,
      padding: 32,
      gap: 40,
    }}>
      <Welcome />
      <Steps />
    </View>
  );
}