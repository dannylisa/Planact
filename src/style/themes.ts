import { DefaultTheme } from './styled'
//e0f4f4 파스텔 하늘색
// fff3f1 파스텔 주황색
// f6f5fb 파스텔 보라색
// fafafa 파스텔 회색
// 7b89fb 쨍한 파랑보랑
// fd999b 쨍한 분홍색
// 49c2ae 쨍한 초록
// 라이너 색깔 모음
// #ffff83 노랑
// #a6ffe9 민트
// #ffc7ba 주황
// #d9c3ff 바이올렛
// #b8dcff 파랑
// #ffd0ef 핑크
// #33cac6 버튼색 쨍한 초록
//팬톤 컬러 초록 계열
// 9BE3BF 말차색
// 8FD6BD 더 쨍함
// 3CDBC0 형광 초록 -> 이 색 좀 괜찮은 듯
// 8CE2D0 같은 계열 좀 더 연함

// 팬톤 컬러 파랑 계열
// 59CBE8 형광 파랑

// 팬톤 컬러 연두 계열
// 93DA49 형광 연두

const light_orange: DefaultTheme = {
  mode_name: 'theme/light/orange',
  mainBackground: '#ffffff',
  content: '#fdfdfd',
  border: '#423944',
  text: '#190d31',
  title: '#000000',
  disabled: '#000000aa',
  primary: {
    main: '#ff9425',
    text: `#fff`,
    border: 'transparent',
  },
  secondary: {
    main: '#E3E0E6',
    text: '#92a1b4',
    border: 'transparent',
  },
  ghost: {
    main: '#fff',
    text: '#ff9425',
    border: '#ffffff00',
    // border: '#000000',
  },
}

const dark_orange: DefaultTheme = {
  mode_name: 'theme/dark/orange',
  mainBackground: '#121212',
  content: '#333',
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
    main: `rgba(255,255,255,0)`,
    text: '#ff9425',
    border: 'rgba(255,255,255,0)',
  },
}

const light_luigi: DefaultTheme = {
  mode_name: 'theme/light/luigi',
  mainBackground: '#ffffff',
  content: '#fdfdfd',
  border: '#423944',
  text: '#190d31',
  title: '#000000',
  disabled: '#000000aa',
  primary: {
    main: '#7ace67',
    text: `#fff`,
    border: 'transparent',
  },
  secondary: {
    main: '#ffe3b3',
    text: '#777',
    border: 'transparent',
  },
  ghost: {
    main: '#fff',
    text: '#7ace67',
    border: '#ffffff00',
    // border: '#000000',
  },
}


const light_cove: DefaultTheme = {
  mode_name: 'theme/light/cove',
  mainBackground: '#ffffff',
  content: '#fdfdfd',
  border: '#423944',
  text: '#190d31',
  title: '#000000',
  disabled: '#000000aa',
  primary: {
    main: '#2a9df4',
    text: `#fff`,
    border: 'transparent',
  },
  secondary: {
    main: '#f6e3d4',
    text: '#828282',
    border: 'transparent',
  },
  ghost: {
    main: '#fff',
    text: '#2a9df4',
    border: '#ffffff00',
    // border: '#000000',
  },
}
export default [light_orange, dark_orange, light_luigi, light_cove];
