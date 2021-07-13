import React from "react"
import { ISchedule } from "@/utils/data"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { shadow, SpecificColors } from "@modules/theme/hooks"
import { DefaultTheme } from "@/style/styled"
import { useMemo } from "react"
import useTheme from "@/modules/theme/hooks"
import { Text, TextButton } from "@components/materials"
import { AntDesign } from "@expo/vector-icons"
import toggleScheduleLike from "@/api/market/toggleScheduleLike"
import { useUserState } from "@/modules/auth/hooks"

interface ScheduleListItemProps {
    schedule: ISchedule
    onPress: () => void
}
const ScheduleListItem = ({schedule, onPress}:ScheduleListItemProps) => {
    const theme = useTheme()
    const { wrapper, container, triangle, tag, star } = useMemo(() => styles(theme), [theme])
    const { id, name, description, price, user_likes } = schedule;
    const [likes, setLikes] = React.useState<boolean>(Boolean(user_likes));
    const {getToken} = useUserState();
    const toggleLikes = async () => {
        setLikes(prev => !prev)
        const token = await getToken()
        if(!token) return;
        await toggleScheduleLike(token, id);
    }
    const {yellow} = SpecificColors;
    return(
        <View style={wrapper}>
            <TouchableOpacity style={container} onPress={onPress}>
                <View>
                    <Text bold headings={2} paddingVertical={5} align="left" content={name}/>
                    <Text  headings={4} align="left" content={description}/>
                </View>
                <View style={star}>
                    <TouchableOpacity onPress={toggleLikes}>
                        <AntDesign 
                            name={likes ? "star" : "staro"}
                            color={yellow}
                            size={22} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <View style={triangle} />
            <View style={tag}>
                <Text headings={4} content={"Free"} />
            </View>
        </View>
    )
}

const styles = ({content}:DefaultTheme) => StyleSheet.create({
    wrapper:{
        zIndex: 0,
        marginBottom: 14,
    },
    container:{
        height: 75,
        borderRadius:5,
        width: "98.5%",
        zIndex: 2,
        paddingVertical: 12,
        paddingLeft: 20,
        paddingRight: 50,
        backgroundColor: content,
        flexDirection: "row",
        justifyContent:"space-between",
        ...shadow
    },
    star:{
        justifyContent: "center",
        width: 45
    },
    triangle:{
        position: "absolute",
        borderBottomColor: "#ffaaaacc",
        borderLeftColor: "#ffaaaacc",
        top: "2%",
        right: 0,
        borderBottomWidth:26,
        borderLeftWidth:17,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        zIndex: 1,
        ...shadow
    },
    tag:{
        position: "absolute",
        top: "10%",
        right: 0,
        backgroundColor: "#ffaaaa",
        paddingLeft: 12,
        paddingRight: 16,
        paddingVertical: 4,
        borderTopRightRadius: 2,
        borderRadius: 3,
        zIndex: 3,
        ...shadow
    }
})

export default ScheduleListItem