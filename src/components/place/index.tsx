import { Image, Text, TouchableOpacity, type TouchableOpacityProps, View } from "react-native";
import { s } from "./styles";
import { IconTicket } from "@tabler/icons-react-native";
import { colors } from "@/styles/theme";
import { Place as PlaceType } from '@/_types/place'

 
type PlaceProps = TouchableOpacityProps & {
  data: PlaceType
}
export function Place({ data, ...props }: PlaceProps) {
  return (
    <TouchableOpacity style={s.container} {...props}>
      <Image style={s.image} source={{ uri: data.cover }} />

      <View style={s.content}>
        <Text style={s.name}>{data.name}</Text>
        <Text style={s.description} numberOfLines={2}>{data.description}</Text>

        <View style={s.footer}>
          <IconTicket size={16} color={colors.red.base} />
          <Text style={s.tickets}>{data.coupons} cupons disponíveis</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}