import { getMarketSchedulesByCategory } from "@/api/market";
import { useUserState } from "@/modules/auth/hooks";
import useTheme from "@/modules/theme/hooks";
import { useUserSchedule } from "@/modules/userSchedule/hooks";
import { DefaultTheme } from "@/style/styled";
import { ISchedule } from "@/utils/data";
import { useNavigation } from "@react-navigation/native";
import { AxiosError, AxiosResponse } from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import ScheduleListItem from "./ScheduleListItem";

export interface CategoryProps {
    name: string
    keyword: string
}
export default function({name, keyword, search}:CategoryProps & {search: string}){
    const useSchedule = useUserSchedule();
    const [schedules, setSchedules] = useState<ISchedule[]>([]);
    const { getToken } = useUserState();

    const navigation = useNavigation()
    const theme = useTheme();
    const { listItemWrapper } = useMemo(() => styles(theme), [theme]);

    useEffect(() => {
        getToken()
            .then(
                token => {
                if(token) 
                    return getMarketSchedulesByCategory(token, keyword)
                else
                    throw Error
            })
            .then(
                (res: AxiosResponse<ISchedule[]>) => setSchedules(res.data)
            )
            .catch((err: AxiosError) => {
                Alert.alert('서버 점검 중입니다.')
            });

    }, [keyword, useSchedule.schedules.length]);

    const onItemPressed = (item: ISchedule) => () =>
        navigation.navigate(
            'Market/Schedule/Details', 
            { schedule: item }
        );

    const renderItem = ({ item }: { item: ISchedule }) => (
        <ScheduleListItem 
            onPress={onItemPressed(item)} 
            schedule={item} 
        />)

    const filteredSchedules = useMemo(() => {
        if(search.length < 2) 
            return schedules
        else 
            return schedules.filter(
                schedule => (
                    schedule.name.includes(search) 
                    || schedule.description.includes(search)
                ))
    }, [search, schedules])

    return (
        <FlatList
            data={filteredSchedules}
            renderItem={renderItem}
            keyExtractor={useCallback(
            (item: ISchedule, index: number) => '' + index,
            []
            )}
            contentContainerStyle={listItemWrapper}
        />
    )
}

const styles = (theme: DefaultTheme) => (
    StyleSheet.create({
      listItemWrapper: {
        flex: 5,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
        backgroundColor: theme.mainBackground,
      },
    })
)