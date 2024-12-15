import { Category } from "@/_types/category";
import { Place } from "@/_types/place";
import { Categories } from "@/components/categories";
import { Places } from "@/components/places";
import { api } from "@/services/api";
import { colors, fontFamily } from "@/styles/theme";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494
}

type PlaceResponse = Place & {
  latitude: number
  longitude: number
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([])
  const [category, setCategory] = useState<string>("")

  const [places, setPlaces] = useState<PlaceResponse[]>([])

  async function fetchCategories() {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
      setCategory(data[0].id)
    } catch (err) {
      Alert.alert("Categorias", "Não foi possível carregar as categorias.")
      console.log(err);
    }
  }

  async function fetchPlaces() {
    try {
      if(!category) {
        return
      }
      
      const { data } = await api.get('/markets/category/'+ category )
      setPlaces(data)
    } catch (error) {
      Alert.alert('Locais', 'Não foi possível carregar os locais')
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchPlaces()
  }, [category])

  return (
    <View style={{ flex: 1 }}>
      <Categories 
        onSelect={setCategory} 
        selected={category} 
        data={categories} 
      />

      <MapView 
        style={{ 
          flex: 1
        }}

        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,        
        }}
      >
        <Marker 
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require('@/assets/location.png')}
        />

        {
          places.map(place => (
            <Marker 
              key={place.id}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
              image={require('@/assets/pin.png')}
            >
              <Callout onPress={() => router.navigate(`/market/${place.id}`)} >
                <View>
                  <Text 
                    style={{ 
                      fontSize: 14, 
                      color: colors.gray[600], 
                      fontFamily: fontFamily.medium 
                    }}
                  >
                    {place.name}
                  </Text>
                  <Text 
                    style={{ 
                      fontSize: 12, 
                      color: colors.gray[500], 
                      fontFamily: fontFamily.regular 
                    }}
                  >
                    {place.address}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))
         .reverse()  // Invert the order of markers to show them from top to bottom on the map.
        }
      </MapView>

      <Places data={places} />
    </View>
  )
}