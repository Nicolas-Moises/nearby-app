import { FlatList } from "react-native";
import { Category as CategoryProps } from "@/_types/category";
import { Category } from "../category";
import { s } from "./styles";

type CategoriesProps = {
  data: CategoryProps[]
  selected: string
  onSelect: (id: string) => void
}
export function Categories({ data, onSelect, selected}: CategoriesProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category 
          name={item.name} 
          iconId={item.id} 
          onPress={() => onSelect(item.id)} 
          isSelected={item.id === selected} 
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.content}
      style={s.container}
    />
  )
}