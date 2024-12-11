import { Image, ImageSourcePropType, Text, View } from "react-native";
import { s } from "./styles";

import { IconProps } from '@tabler/icons-react-native'
import { colors } from "@/styles/colors";
import React from "react";

interface Props {
  title: string;
  description: string;
  icon: React.ComponentType<IconProps>
}

export function Step ({ description, icon: Icon, title }: Props) {
  return (
    <View style={s.container}>
      <Icon size={32} color={colors.red.base}  />
      <View style={s.details}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.description}>{description}</Text>
      </View>
    </View>
  );
}