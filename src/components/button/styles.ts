import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const s = StyleSheet.create({
  container: {
    height: 56,
    maxHeight: 56,
    backgroundColor: colors.green.base,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 14
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.gray[100]
  }
})