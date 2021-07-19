import React, { useMemo, useState } from "react"
import { Text, Button, TextInput } from "@components/materials"
import { Alert, SafeAreaView, TouchableOpacity, View } from "react-native"
import useTheme from "@/modules/theme/hooks"
import stepStyle from "./stepStyle"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { ISchedule } from "@/utils/data"
import { useUserState } from "@/modules/auth/hooks"
import attachSchedule, { attachScheduleType } from "@/api/market/attachSchedule"
import { AxiosError } from "axios"
import { useUserSchedule } from "@/modules/userSchedule/hooks"
import { useDailyList } from "@/modules/userDailyList/hooks"

type ColorSelectRouteParams = {
    Detail: {
        schedule: ISchedule
        alias: string
        start_at: string
        method: {
            methodIdx: number
            weekdays?: boolean[],
            interval?: number
        }
    };
}

const COLORS = [
    '#FFE4D4',
    '#eff8cc',
    '#C6F2FF',
    '#d4ffe1',
    '#B8BCFF',
    '#9FC9C7',
    '#FFE0F2',
    '#faa5a9',
    '#343077',
    '#2a7a85',
    '#9C599E',
    '#E6759E',
    '#F89181',
    '#FFCE8F',
    '#FFEDB3',
  ];

const TYPES:attachScheduleType[] = ['weekdays','interval','everyday']

export default function ColorSelect () {
    const { getToken } = useUserState();
    const { fetchUserSchedule } = useUserSchedule();
    const { initialDailyFetch } = useDailyList();
    
    const theme = useTheme()
    const {params} = useRoute<RouteProp<ColorSelectRouteParams, 'Detail'>>()
    const {container, text, buttonContainer, 
        colorContainer, colorRow, colorItem, colorCircle, colorSelected} = useMemo(() => stepStyle(theme), [theme])
    
    // Color Select
    const [colorIdx, setColorIdx] = useState<number>(0);

    const attach = async () => {
        const token = await getToken();
        if (!token) return;

        const {schedule, alias, method, start_at} = params
        const type:attachScheduleType = TYPES[method.methodIdx]
    
        const m = {
            weekdays: method.weekdays || [],
            interval: method.interval || 0
        }

        await attachSchedule({
          type,
          token,
          alias,
          ...m,
          start_date: start_at || new Date(),
          color: COLORS[colorIdx],
          schedule_id: schedule.id,
        }).then(() => {
            Alert.alert('플랜이 다운로드 되었습니다.');
            navigation.navigate('Market/Main');
        })
        .catch((err: AxiosError) => {
        if (err.response?.status === 406)
            Alert.alert('이미 내려받은 스케줄입니다!');
            console.log(err)
        })
        fetchUserSchedule();
        initialDailyFetch();
      };
    
    const navigation = useNavigation();
    const onPrev = () => {
        if(['datetime', 'date'].includes(params.schedule.fixed))
            navigation.navigate('Market/Schedule/Download/alias', {
                schedule: params.schedule,
                alias: params.alias
            })
        else
            navigation.navigate('Market/Schedule/Download/freq', params)
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={container}>
                <Text
                    bold 
                    align="left"
                    content="플래너에 표시할"
                    style={[text, {width:"90%"}]}
                    marginBottom={5}
                />
                <Text
                    bold
                    align="right"
                    content="색깔을 선택해주세요."
                    style={[text, {width:"90%"}]}
                    marginBottom={40}
                />

                <View style={colorContainer}>
                    <View style={colorRow}>
                        {COLORS.slice(0, 5).map((color, idx) => (
                            <TouchableOpacity
                                key={color}
                                style={colorItem}
                                onPress={() => setColorIdx(idx)}
                            >
                                <View
                                style={
                                    colorIdx === idx
                                    ? [colorCircle, colorSelected, { backgroundColor: color }]
                                    : [colorCircle, { backgroundColor: color }]
                                }
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={colorRow}>
                        {COLORS.slice(5, 10).map((color, idx) => (
                        <TouchableOpacity
                            key={color}
                            style={colorItem}
                            onPress={() => setColorIdx(idx + 5)}
                        >
                            <View
                            style={
                                colorIdx === idx + 5
                                ? [colorCircle, colorSelected, { backgroundColor: color }]
                                : [colorCircle, { backgroundColor: color }]
                            }
                            />
                        </TouchableOpacity>
                        ))}
                    </View>
                    <View style={colorRow}>
                        {COLORS.slice(10).map((color, idx) => (
                        <TouchableOpacity
                            key={color}
                            style={colorItem}
                            onPress={() => setColorIdx(idx + 10)}
                        >
                            <View
                            style={
                                colorIdx === idx + 10
                                ? [colorCircle, colorSelected, { backgroundColor: color }]
                                : [colorCircle, { backgroundColor: color }]
                            }
                            />
                        </TouchableOpacity>
                        ))}
                    </View>
                </View>

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
                        content="다운받기" 
                        color="primary"
                        onPress={attach}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

