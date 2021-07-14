import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { DefaultTheme } from '@/style/styled'
import themes from '@/style/themes'
import ThemeBlock from './ThemeBlock'
import MenuItem from '@/components/materials/MenuItem'
import useTheme from '@/modules/theme/hooks'
import { useAuthorization } from '@/modules/auth/hooks'
interface ProfileProps {
  navigation
}

function Profile({ navigation }: ProfileProps) {
  const theme = useTheme();
  const { logOut } = useAuthorization()
  const { wrapper, blockContainer } = React.useMemo(() => styles(theme), [theme])
  const [showThemes, setShowThemes] = useState<boolean>(true)
  const toggleThemes = () => setShowThemes((prev) => !prev)

  return (
    <View style={wrapper}>
      <View>
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
      <MenuItem
        content={'내 플랜 관리'}
        onPress={() => {
          navigation.push('ScheduleManager', { text: '플랜 관리' })
        }}
      />
      <MenuItem content={'로그아웃'} onPress={logOut} />
    </View>
  )
}

const styles = (theme: DefaultTheme) => {
  const { mainBackground, content } = theme
  return StyleSheet.create({
    wrapper: {
      backgroundColor: mainBackground,
      flex: 1,
    },
    blockContainer: {
      backgroundColor: content,
      flexDirection: 'row',
      padding: 15,
    },
  })
}

export default Profile
