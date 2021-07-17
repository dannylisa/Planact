export type themeType = 
  'theme/light/orange' | 
  'theme/dark/orange' | 
  'theme/light/luigi'|
  'theme/dark/luigi' |
  'theme/light/cove' |
  'theme/dark/cove' |
  'theme/light/cherry' |
  'theme/dark/cherry' 
interface Colorset {
  main: string
  text: string
  border: string
}

export interface DefaultTheme {
  mode_name: themeType

  mainBackground: string
  content: string
  border: string
  title: string
  text: string
  disabled: string
  
  // point-color
  primary: Colorset
  secondary: Colorset
  ghost: Colorset
}
