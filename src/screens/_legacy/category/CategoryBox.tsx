import React, { useMemo } from "react"
import { Text } from '@components/materials'
import { DefaultTheme } from '@/style/styled'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from "@expo/vector-icons"
import useTheme from "@/modules/theme/hooks"
import { shadow } from "@modules/theme/hooks"

interface CategoryBoxProps {
    category: string
    icon: 'fitness-center' | 'menu-book' | 'attach-money' | 'wallet-travel' | 'code' | 'queue-music' 
    onPress: () => void
}
export default function CategoryBox({category, icon, onPress}:CategoryBoxProps){
    const theme = useTheme()
    const {item} = useMemo(() => styles(theme), [theme])
    return(
     <View style={item}>
        <TouchableOpacity onPress={onPress}>
          <MaterialIcons name={icon} size={48} color="black" />
          <Text content={category} />
        </TouchableOpacity>
      </View>
    )
}

const styles = ({content, text}:DefaultTheme) => {
    return StyleSheet.create({
        item: {
            width: 160,
            height: 160,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 7,
            backgroundColor: content,
            borderRadius: 7,
            color: text,
            ...shadow
          },
    })
}
