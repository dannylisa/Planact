import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DefaultTheme } from '@/style/styled'
import { themes } from '@/style/themes'
import ThemeBlock from './ThemeBlock'
import MenuItem from '@/components/MenuItem'
import useTheme from '@/modules/theme/hooks'
import { useAuthorization } from '@/modules/auth/hooks'
interface ProfileProps {
  navigation
}

function Profile({ navigation }: ProfileProps) {
  const theme = useTheme();
  const { logOut } = useAuthorization()
  const { wrapper, toggleContainer, blockContainer } = React.useMemo(() => styles(theme), [theme])
  const [showThemes, setShowThemes] = useState<boolean>(true)
  const toggleThemes = () => setShowThemes((prev) => !prev)

  return (
    <View style={wrapper}>
      <View style={toggleContainer}>
        <MenuItem onPress={toggleThemes} content="테마 선택" />
        {showThemes && (
          <View style={blockContainer}>
            {themes.map((theme, idx) => (
              <ThemeBlock theme={theme} key={idx} />
            ))}
          </View>
        )}
      </View>
      <MenuItem
        content={'프로필 설정'}
        onPress={() => {
          navigation.push('SetProfile', { text: '수정하기' })
        }}
      />
      <MenuItem content={'로그아웃'} onPress={logOut} />
    </View>
  )
}

const styles = (theme: DefaultTheme) => {
  const { mainBackground, border, text, content } = theme
  return StyleSheet.create({
    wrapper: {
      backgroundColor: mainBackground,
      flex: 1,
    },
    toggleContainer: {
      backgroundColor: content,
    },
    blockContainer: {
      flexDirection: 'row',
      padding: 15,
    },
  })
}

export default Profile
