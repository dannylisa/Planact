import { DefaultTheme } from './styled'

const light_orange: DefaultTheme = {
  mode_name: 'theme/light/orange',
  mainBackground: '#ffffff',
  content: '#fdfdfd',
  border: '#423944',
  text: '#190d31',
  title: '#121212',
  disabled: '#121212aa',
  primary: {
    main: '#ff9425',
    text: '#ffffff',
    border: 'transparent',
  },
  secondary: {
    main: '#E3E0E6',
    text: '#92a1b4',
    border: 'transparent',
  },
  ghost: {
    main: '#ffffff',
    text: '#ff9425',
    border: '#ffffff00',
    // border: '#121212',
  },
}

const dark_orange: DefaultTheme = {
  mode_name: 'theme/dark/orange',
  mainBackground: '#121212',
  content: '#303030',
  border: '#707789',
  text: '#dedede',
  title: `rgba(255,255,255,0.85)`,
  disabled: `rgba(255,255,255,0.25)`,
  primary: {
    main: '#f1a150',
    text: `rgba(255,255,255,0.85)`,
    border: '#f1a150',
  },
  secondary: {
    main: '#464646',
    text: `rgba(255,255,255,0.85)`,
    border: '#464646',
  },
  ghost: {
    main: '#121212',
    text: '#ff9425',
    border: '#121212',
  },
}

const light_luigi: DefaultTheme = {
  mode_name: 'theme/light/luigi',
  mainBackground: '#ffffff',
  content: '#fdfdfd',
  border: '#423944',
  text: '#190d31',
  title: '#121212',
  disabled: '#121212aa',
  primary: {
    main: '#7ace67',
    text: '#ffffff',
    border: 'transparent',
  },
  secondary: {
    main: '#ffe3b3',
    text: '#707070',
    border: 'transparent',
  },
  ghost: {
    main: '#ffffff',
    text: '#7ace67',
    border: '#ffffff00',
    // border: '#121212',
  },
}

const dark_luigi: DefaultTheme = {
  mode_name: 'theme/dark/luigi',
  mainBackground: '#121212',
  content: '#303030',
  border: '#707789',
  text: '#dedede',
  title: `rgba(255,255,255,0.85)`,
  disabled: `rgba(255,255,255,0.25)`,
  primary: {
    main: '#6dbf5a',
    text: '#ffffff',
    border: 'transparent',
  },
  secondary: {
    main: '#464646',
    text: `rgba(255,255,255,0.85)`,
    border: '#464646',
  },
  ghost: {
    main: '#222222',
    text: '#6dbf5a',
    border: '#222222',
  },
}

const light_cove: DefaultTheme = {
  mode_name: 'theme/light/cove',
  mainBackground: '#ffffff',
  content: '#fdfdfd',
  border: '#423944',
  text: '#190d31',
  title: '#121212',
  disabled: '#121212aa',
  primary: {
    main: '#2a9df4',
    text: '#ffffff',
    border: 'transparent',
  },
  secondary: {
    main: '#f6e3d4',
    text: '#828282',
    border: 'transparent',
  },
  ghost: {
    main: '#ffffff',
    text: '#2a9df4',
    border: '#ffffff00',
    // border: '#121212',
  },
}

const dark_cove: DefaultTheme = {
  mode_name: 'theme/dark/cove',
  mainBackground: '#121212',
  content: '#303030',
  border: '#707789',
  text: '#dedede',
  title: `rgba(255,255,255,0.85)`,
  disabled: `rgba(255,255,255,0.25)`,
  primary: {
    main: '#2a9df4',
    text: '#ffffff',
    border: 'transparent',
  },
  secondary: {
    main: '#464646',
    text: `rgba(255,255,255,0.85)`,
    border: '#464646',
  },
  ghost: {
    main: '#222222',
    text: '#2a9df4',
    border: '#222222',
  },
}

const light_cherry: DefaultTheme = {
  mode_name: 'theme/light/cherry',
  mainBackground: '#ffffff',
  content: '#fdfdfd',
  border: '#423944',
  text: '#190d31',
  title: '#121212',
  disabled: '#121212aa',
  primary: {
    main: '#ff0032',
    text: '#ffffff',
    border: 'transparent',
  },
  secondary: {
    main: '#ffe7e5',
    text: '#525252',
    border: 'transparent',
  },
  ghost: {
    main: '#ffffff',
    text: '#ff0032',
    border: '#ffffff00',
    // border: '#121212',
  },
}

const dark_cherry: DefaultTheme = {
  mode_name: 'theme/dark/cherry',
  mainBackground: '#121212',
  content: '#303030',
  border: '#707789',
  text: '#dedede',
  title: `rgba(255,255,255,0.85)`,
  disabled: `rgba(255,255,255,0.25)`,
  primary: {
    main: '#C20039',
    text: '#ffffff',
    border: 'transparent',
  },
  secondary: {
    main: '#464646',
    text: `rgba(255,255,255,0.85)`,
    border: '#464646',
  },
  ghost: {
    main: '#222222',
    text: '#cf022b',
    border: '#222222',
  },
}


export default [
    light_orange, dark_orange, 
    light_luigi, dark_luigi, 
    light_cove, dark_cove,
    light_cherry, dark_cherry
  ];
