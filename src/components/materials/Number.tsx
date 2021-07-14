import React from "react"
import Text, { DefaultTextProps } from "./Text";

type lang = "en" | "ko";
interface NumberProps extends Omit<DefaultTextProps, "content">{
    value: number
    comma?: boolean
    format?: lang
    formatDigit?:number
}

const nFormatter = (num:number, lang:lang, digits:number=1):string => {
    const lookup = {
        en: [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
        ],
        ko: [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "천" },
            { value: 1e4, symbol: "만" },
            { value: 1e8, symbol: "억" },
            { value: 1e12, symbol: "조" },
        ],
    }
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup[lang].slice().reverse().find(item => num >= item.value);
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

export default function(props: NumberProps){
    const {value, comma, format, formatDigit, ...others} = props;
    let res = value % 1 === 0 ? ""+parseInt(""+value) : ""+value;
    if(format)
        res = nFormatter(value, format, formatDigit||1);
    else if(comma)
        res = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


    return (
        <Text content={res+""} {...others} />
    )
}