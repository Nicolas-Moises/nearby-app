import { Place as PlaceType } from "@/_types/place";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { Place } from "../place";
import { s } from "./styles";
import { router } from "expo-router";

type PlacesProps = {
  data: PlaceType[]
}
export function Places({ data }: PlacesProps) {
  const dimensions = useWindowDimensions()
  const bottomSheetRef = useRef<BottomSheet>(null)

  const snapPoints = {
    min: 278,
    max: dimensions.height - 128,
  }

  return (
    <BottomSheet 
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={s.indicator}
      backgroundStyle={s.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList 
        data={data}
        renderItem={({ item }) => <Place data={item} onPress={() => router.navigate(`/market/${item.id}`)} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={s.content}
        ListHeaderComponent={() => <Text style={s.title}>Explore locais perto de você</Text>}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  )
}