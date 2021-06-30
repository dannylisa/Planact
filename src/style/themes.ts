import { DefaultTheme } from './styled'

export const isLight = ({ mode_name }: DefaultTheme) =>
  Boolean(mode_name.match('light'))

export const light_orange: DefaultTheme = {
  mode_name: 'theme/light/orange',
  mainBackground: '#ffffff',
  content: '#fafafa',
  border: '#423944',
  text: '#190d31',
  title: '#000000',
  disabled: `rgba(255,255,255,0.25)`,
  selected: '#5c3da4',
  primary: {
    main: '#f1a150',
    text: `#fff`,
    border: 'transparent',
  },
  secondary: {
    main: '#ffdcb9',
    text: `rgba(255,255,255,0.85)`,
    border: 'transparent',
  },
  ghost: {
    main: `rgba(255,255,255,0)`,
    text: '#ff9425',
    border: '#000000',
  },
}

export const dark_orange: DefaultTheme = {
  mode_name: 'theme/dark/orange',
  mainBackground: '#121212',
  content: '#333',
  border: '#707789',
  text: '#dedede',
  title: `rgba(255,255,255,0.85)`,
  disabled: `rgba(255,255,255,0.25)`,
  selected: '#5c3da4',
  primary: {
    main: '#f1a150',
    text: `#fff`,
    border: 'transparent',
  },
  secondary: {
    main: '#ffdcb9',
    text: `rgba(255,255,255,0.85)`,
    border: 'transparent',
  },
  ghost: {
    main: `rgba(255,255,255,0)`,
    text: '#ff9425',
    border: '#000000',
  },
}

export const themes = [light_orange, dark_orange]
