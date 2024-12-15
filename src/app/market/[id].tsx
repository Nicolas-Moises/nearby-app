import { Alert, Modal, StatusBar, ScrollView, View } from "react-native";
import { router, useLocalSearchParams, Redirect } from 'expo-router'
import { api } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { type Details as DetailsType } from "@/_types/details";
import { Details } from "@/components/market/details";
import { Coupon } from "@/components/market/coupon";
import { Button } from "@/components/button";
import { CameraView, useCameraPermissions } from "expo-camera";

type DataProps = DetailsType & {
  cover: string
}

export default function Market() {
  const [data, setData] = useState<DataProps>({} as DataProps)
  const [coupon, setCoupon] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false) 
  const [couponIsFetching, setCouponIsFetching] = useState(false)

  const qrLock = useRef(false)
  const [_, requestPermission] = useCameraPermissions()
  const params = useLocalSearchParams<{ id: string }>()

  async function fetchPlace() {
    try {
      const { data } = await api.get('/markets/' + params.id)
      setIsLoading(false)
      setData(data)
    } catch (error) {
      console.log(error)
      Alert.alert('Local', 'Não foi possível carregar os dados', [
        { text: 'OK', onPress: () => router.back() },
      ])
    } finally {
      setIsLoading(false)
    }
  }
  
  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission()
      if(!granted) {
        return Alert.alert('Camera', 'Você precisa habilitar o uso da camera')
      }

      qrLock.current = false
      setIsVisibleCameraModal(true)
    } catch (error) {
      console.log(error)
      Alert.alert('Camera', 'Não foi possível utilizar a camera')
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true)
      const { data } = await api.patch(`/coupons/${id}`)
      Alert.alert('Cupons', data.coupon)
      setCoupon(data.coupon)
    } catch (error) {
      console.log(error)
      Alert.alert('Cupons', 'Não foi possível utilizar o cupom')
    } finally {
      setCouponIsFetching(false)
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false)

    Alert.alert("Cupom", "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?", [
      {
        style: 'cancel', text: 'Não'
      }, {
        text: 'Sim', onPress: () => getCoupon(id)
      }
    ])
  }

  useEffect(() => {
    fetchPlace()
  }, [params.id, coupon])

  if(isLoading) {
    return <Loading />
  }

  if(!data) {
    return <Redirect href='/home' />
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle='light-content' hidden={isVisibleCameraModal} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={data?.cover} />
        <Details data={data} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>
      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView 
          style={{ flex: 1 }} 
          facing="back"
          onBarcodeScanned={({ data }) => {
            if(data && !qrLock.current) {
              qrLock.current = true
              setTimeout(() => handleUseCoupon(data))
            } 
          }}
        />

        <View style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
          <Button 
            onPress={() => setIsVisibleCameraModal(false)}
            isLoading={couponIsFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}