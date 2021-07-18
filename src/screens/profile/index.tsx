import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { DefaultTheme } from '@/style/styled'
import themes from '@/style/themes'
import ThemeBlock from './ThemeBlock'
import MenuItem from '@/components/materials/MenuItem'
import useTheme from '@/modules/theme/hooks'
import { useAuthorization } from '@/modules/auth/hooks'
import { useNavigation } from '@react-navigation/native'

function Profile() {
  const theme = useTheme();
  const navigation = useNavigation()
  const { logOut } = useAuthorization()
  const { wrapper, blockContainer } = React.useMemo(() => styles(theme), [theme])
  const [showThemes, setShowThemes] = useState<boolean>(false)
  const toggleThemes = () => setShowThemes((prev) => !prev)

  return (
    <View style={wrapper}>
      <MenuItem
        content={'프로필 설정'}
        onPress={() => {
          navigation.navigate('SetProfile', { text: '수정하기' })
        }}
      />
        <MenuItem onPress={toggleThemes} content="테마 선택" />
        {showThemes && (
          <View style={{paddingVertical: 6}}>
          <View style={blockContainer}>
            {themes.slice(0,4).map((theme, idx) => (
              <ThemeBlock theme={theme} key={idx} />
            ))}
          </View>
          <View style={blockContainer}>
            {themes.slice(4).reverse().map((theme, idx) => (
              <ThemeBlock theme={theme} key={idx} />
            ))}
          </View>
          </View>
        )}
      <MenuItem
        content={'내 플랜 관리'}
        onPress={() => {
          navigation.navigate(
            "Profile/ScheduleManager", 
            { text: '플랜 관리' }
          )
        }}
      />
      <MenuItem content={'로그아웃'} onPress={logOut} />
    </View>
  )
}

const styles = (theme: DefaultTheme) => {
  const { mainBackground } = theme
  return StyleSheet.create({
    wrapper: {
      backgroundColor: mainBackground,
      flex: 1,
    },
    blockContainer: {
      backgroundColor: mainBackground,
      flexDirection: 'row',
      paddingVertical: 3,
      paddingHorizontal:10,
      justifyContent: "center",
    },
  })
}

export default Profile
