export const shadow = {
    shadowColor: "#295573",
    shadowOpacity: 0.12,
    shadowRadius: 2.4,
    shadowOffset:{
        width: 0,
        height: 1.2
    },
    elevation: 1,
}

type hltColor = "blue" | "green"
export const highlight = (color:hltColor) => {
    let rgb:string;
    switch(color){
        case "blue":
            rgb = "#0080ff";
            break;
        case "green":
        default:
            rgb = "#00ff80";
            break;
    }
    return {
        shadowColor: rgb,
        shadowRadius: 10,
        shadowOpacity: 1,
        shadowOffset:{
            width: 0,
            height: 0
        },
        elevation: 4,
    }
} 