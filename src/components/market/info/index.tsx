import { IconProps } from "@tabler/icons-react-native"
import React from "react"
import { View, Text } from "react-native"
import { s } from "./styles"

import { colors } from '@/styles/theme';

type InfoProps = {
  description: string
  icon: React.ComponentType<IconProps>
}

export function Info({ description, icon: Icon }: InfoProps) {
  return (
    <View style={s.container}>
      <Icon size={14} color={colors.gray[400]} />
      <Text style={s.text}>
        {description}
      </Text>
    </View>
  )
}