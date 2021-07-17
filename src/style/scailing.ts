import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

// 내가 개발 테스트 한 모바일의 실제 가로 세로 상수값 기입
const guidelineBaseWidth = 428;
const guidelineBaseHeight = 926;
const guideScale = Math.sqrt(guidelineBaseWidth * guidelineBaseHeight)

const scale = Math.sqrt(width * height) / guideScale;
const horiPer = width / guidelineBaseWidth;
const vertiPer = height / guidelineBaseHeight;


const verticalScale = (size:number) => horiPer * size;
const horizontalScale = (size:number) => vertiPer * size;
const moderateScale = (size:number) => scale * size;

export {moderateScale, verticalScale, horizontalScale};