import React from 'react'; 
import { IUserEvent } from '@/utils/data';
import { TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import { DefaultTheme } from '@/style/styled';
import { useSelector } from 'react-redux';
import { GlobalState } from '@/../Global';

interface EventViewProps extends IUserEvent {
 
}

const onPress = (text:string) => () =>{
    Alert.alert(text);
}
function EventView (props:EventViewProps){
    const {color, abb, title} = props;
    const theme = useSelector(({theme}:GlobalState) => theme);
    const {container, iconContainer, icon, content} = styles(theme, {color});
    return(
        <TouchableOpacity style={container} onPress={onPress(props.content)} >
            <View style={iconContainer}>
                <View style={icon} />
            </View>
            <Text style={content}>
                {abb}
            </Text>
        </TouchableOpacity>
    )
}

interface EventViewStyleProps {
    color: string
}
const styles = (theme:DefaultTheme, {color}:EventViewStyleProps) =>  {
    const {mainBackground, text} = theme;
    return StyleSheet.create({
        container:{
            backgroundColor: mainBackground,
            height: 20,
            flexDirection: 'row'
        },
        iconContainer: {
            flex: 1,
            paddingTop: 2.5,
            paddingBottom: 3.5,
            paddingLeft: 3,
            paddingRight: 5
        },
        icon: {
            backgroundColor: color,
            flex: 1,
            borderRadius: 50,
        },
        content: {
            flex:6,
            color: text
        }
  })
};

export default EventView;