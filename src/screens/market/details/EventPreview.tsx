import { DefaultTheme } from "@/style/styled";
import { IEvent } from "@/utils/data";
import React, { useMemo } from "react";
import { Text } from '@components/materials';
import { StyleSheet, View } from "react-native";
import useTheme from "@/modules/theme/hooks";


const EventPreview = ({event}:{event: IEvent}) => {
    const {seq, title} = event;
    const theme = useTheme();
    const {wrapper} = useMemo(() => styles(theme), [theme]);

    return(
        <View style={wrapper}>
            <Text 
                bold 
                flex={1} 
                content={
                    event.origin_time ?
                    `${event.origin_time.slice(0,5)} `
                    : `# ${seq+1} `
                }/>
            <Text align="left" flex={4} content={title} />
        </View>
    )
}

const styles = (theme:DefaultTheme) => {
    const { mainBackground } = theme;
    return StyleSheet.create({
        wrapper:{
            flexDirection: "row",
            backgroundColor: mainBackground,
            marginTop: 5,
            marginBottom: 10,
            alignItems:"center"
        }
    })
}
export default EventPreview;
