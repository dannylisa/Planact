import { DefaultTheme } from "@/style/styled";
import { StyleSheet } from "react-native";

export default ({ mainBackground, primary:{main} }: DefaultTheme) => (
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: mainBackground,
            paddingHorizontal: 20,
            paddingVertical: 18,
            alignItems: "center",
            justifyContent: "center"
        },
        text:{
            fontSize:25,
        },
        textInput:{
            width: "85%",
        },
        buttonContainer:{
            height: 44,
            width: "85%",
            marginTop:100,
            justifyContent: "center",
            flexDirection: "row"
        },
        textButtonContainer:{
            flexDirection: "row",
            width: "85%",
            justifyContent: "center"
        },
        freqContainer:{
            marginTop:10,
            height: 40,
            width: "100%",
            flexDirection:"row",
            alignItems: "center",
            justifyContent:"space-between",
        },
        colorContainer: {
            paddingTop: 20,
            marginBottom:-20,
            width: "95%",
            justifyContent:"center",
            alignItems:"center",
          },
          colorRow: {
            flexDirection: 'row',
            justifyContent:"space-around",
            alignItems:"center",
            marginVertical: 30,
            flex:1
          },
          colorItem: {
            flex:1,
            marginHorizontal:14,
          },
          colorCircle: {
            padding: 18,
            borderRadius: 12,
            borderColor: 'transparent',
            borderWidth: 3,
          },
          colorSelected: {
            borderColor: main,
            borderWidth: 3,
          },
          rowContainer:{
            marginTop:20,
            width: "82%",
            height: 80,
            marginBottom:-20
          },
          rowInfo:{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems:"center",
          }
    })
)