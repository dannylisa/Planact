import React, { useMemo, useState } from "react"
import { Text, Button, TextInput } from "@components/materials"
import { SafeAreaView, View, StyleSheet } from "react-native"
import useTheme from "@/modules/theme/hooks"
import stepStyle from "./stepStyle"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { ISchedule } from "@/utils/data"

type AliasRouteParams = {
    Detail: {
        schedule: ISchedule
        alias?: string
    };
}

export default function Alias () {
    const theme = useTheme()
    const {container, text, textInput, buttonContainer} = useMemo(() => stepStyle(theme), [theme])
    
    const {params} = useRoute<RouteProp<AliasRouteParams, 'Detail'>>()
    const {schedule} = params
    
    const [alias, setAlias] = useState<string>(params.alias || schedule.abb);
    
    const navigation = useNavigation();
    const onPrev = () => navigation.navigate('Market/Schedule/Details', {schedule})
    const onNext = () => {
        if(['datetime', 'date'].includes(schedule.fixed))
            navigation.navigate('Market/Schedule/Download/color', {
                schedule, 
                alias, 
                method:{methodIdx:2}
            })
        else
            navigation.navigate('Market/Schedule/Download/startat', {schedule, alias})
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={container}>
                <Text
                    bold 
                    content="플랜의 이름을 설정해주세요."
                    style={text}
                    marginBottom={60}
                />
                <TextInput 
                    underlined
                    style={textInput}
                    value={alias}
                    onChangeText={setAlias}
                />

                <View style={buttonContainer}>
                    <Button
                        flex={1}
                        content="이전" 
                        color="secondary" 
                        onPress={onPrev}
                    />
                    <View style={{width:10}}/>
                    <Button 
                        flex={1}
                        content="다음" 
                        color="primary"
                        onPress={onNext}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

