import { Text, View } from "react-native";
import { s } from "./styles";
import { Step } from "../step";

import { IconPin, IconQrcode, IconTicket } from '@tabler/icons-react-native'

export function Steps () {
  return (
    <View style={s.container}>
      <Text style={s.title}>
        Veja como funciona:
      </Text>

      <Step 
        title="Encontre estabelecimentos" 
        description="Veja locais perto de você que são parceiros Nearby" 
        icon={IconPin}
      />

      <Step 
        title="Ative o cupom com QR Code" 
        description="Escaneie o código no estabelecimento para usar o benefício" 
        icon={IconQrcode}
      />

      <Step 
        title="Encontre estabelecimentos" 
        description="Veja locais perto de você que são parceiros Nearby" 
        icon={IconTicket}
      />
    </View>
  );
}