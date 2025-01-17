import { Pressable, Text, type PressableProps } from "react-native";
import { s } from "./styles";
import { categoriesIcons } from "@/utils/categories-icons";
import { colors } from "@/styles/theme";

type CategoryProps = PressableProps & {
  iconId: string;
  isSelected?: boolean;
  name: string;
}

export function Category({ iconId, name, isSelected = false, ...props}: CategoryProps) {
  const Icon = categoriesIcons[iconId];
  return (
    <Pressable style={[s.container, isSelected && s.containerSelected]} {...props}>
      <Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
      <Text style={[s.name, isSelected && s.nameSelected]}>{name}</Text>
    </Pressable>
  )
}