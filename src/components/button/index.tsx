import { colors } from '@/styles/colors';
import { s } from './styles'
import { 
  Text, 
  TouchableOpacity, 
  type TouchableOpacityProps, 
  type TextProps,
  ActivityIndicator
} from "react-native";

import { IconProps as TablerIconProps } from '@tabler/icons-react-native'

type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean
}

function Button({ children, style, isLoading = false, ...props }: ButtonProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      style={[s.container, style]}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <ActivityIndicator size={'small'} color={colors.gray[100]} /> : children}
    </TouchableOpacity>
  )
}

function Title({ children, ...props }: TextProps) {
  return (
    <Text 
      style={s.title} 
      {...props}
    >
      {children}
    </Text>
  )
}

type IconProps = TablerIconProps & {
  icon: React.ComponentType<TablerIconProps>
}

function Icon({ icon: Icon, ...props }: IconProps) {
  return (
    <Icon size={24} color={colors.gray[100]} {...props} />
  )
}

Button.Title = Title;
Button.Icon = Icon;

export { Button }