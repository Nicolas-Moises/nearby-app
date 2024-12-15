import { Text, View } from "react-native";
import { s } from "./styles";
import { Step } from "../step";

import { IconPin, IconQrcode, IconTicket } from '@tabler/icons-react-native'

const steps = [
  {
    title: 'Encontre estabelecimentos',
    description: 'Veja locais perto de você que são parceiros Nearby',
    icon: IconPin,
  },
  {
    title: 'Ative o cupom com QR Code',
    description: 'Escaneie o código no estabelecimento para usar o benefício',
    icon: IconQrcode,
  },
  {
    title: 'Encontre estabelecimentos',
    description: 'Veja locais perto de você que são parceiros Nearby',
    icon: IconTicket,
  }
]

export function Steps () {
  return (
    <View style={s.container}>
      <Text style={s.title}>
        Veja como funciona:
      </Text>

      {steps.map((step, index) => (
        <Step 
          key={index}
          title={step.title} 
          description={step.description} 
          icon={step.icon}
        />
      ))}
    </View>
  );
}