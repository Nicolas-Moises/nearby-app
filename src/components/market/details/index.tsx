import { Text, View } from "react-native"
import { s } from "./styles"
import { Details as DetailsType } from '@/_types/details'
import { Info } from "../info"
import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native"
import { colors } from "@/styles/theme"

type DetailsProps = {
  data: DetailsType
}

export function Details({ data }: DetailsProps) {
  return (
    <View style={s.container}>
      <Text style={s.name}>{data.name}</Text>
      <Text style={s.description}>{data.description}</Text>

      <View style={s.coupons}>
        <IconTicket size={24} color={colors.red.base} />
        <View style={{ flex: 1, flexDirection: 'row', gap: 4 }}>
          <Text style={s.couponNumber}>
            {data.coupons}
          </Text>
          <Text style={s.couponText}>cupons disponíveis</Text>
        </View>
      </View>

      <View style={s.group}>
        <Text style={s.title}>Regulamento</Text>
        {data.rules.map(( rule ) => (
          <Text style={s.rule} key={rule.id}>
            {`\u2022 ${rule.description}`}
          </Text>
        ))}
      </View> 

      <View style={s.group}>
        <Text style={s.title}>Informações</Text>
        <Info description={data.address} icon={IconMapPin} />
        <Info description={data.phone} icon={IconPhone} />
      </View>

      
    </View>
  )
}