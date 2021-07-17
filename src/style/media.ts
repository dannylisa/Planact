import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const horizontalSizes = {
    large: 420,
    medium: 380
}

const horizontal = (item:string, large:any, medium?:any, small?:any) => {
    if(width >= horizontalSizes.large || !medium)
        return {[item]: large}
    else if(width >= horizontalSizes.medium || !small)
        return {[item]: medium}
    else 
        return {[item]: small}
}
const horValue = (large:any, medium?:any, small?:any) => {
    if(width >= horizontalSizes.large || !medium)
        return large
    else if(width >= horizontalSizes.medium || !small)
        return medium
    else 
        return small
}

const verticalSizes = {
    large: 850,
    medium: 700
}

const vertical = (item:string, large:any, medium?:any, small?:any) => {
    console.log(width, height)
    if(height >= verticalSizes.large || !medium)
        return {[item]: large}
    else if(height >= verticalSizes.medium || !small)
        return {[item]: medium}
    else 
        return {[item]: small}
}

const verValue = (large:any, medium?:any, small?:any) => {
    if(height >= verticalSizes.large || !medium)
        return large
    else if(height >= verticalSizes.medium || !small)
        return medium
    else 
        return small
}


export default {horizontal, horValue, vertical, verValue}