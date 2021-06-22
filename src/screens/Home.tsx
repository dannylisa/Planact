import React, { useState } from "react";
import { useSelector } from "react-redux";
import {  GlobalState } from "@/../App";
import DailyList from "@/components/DailyList";
import DailyView from "@/components/DailyView";
import { DefaultTheme } from "@/style/styled";
import { IDaily, IDailyList } from "@/utils/data";
import dayjs from "dayjs";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { useEffect } from "react";
import { getDailyList } from "@/db/UserDailyData";
import { Alert } from "react-native";

export interface HomeProps{

}

// 1회당 가져올 날짜 수
const UNIT_FETCH_ONCE = 7;
// 최대 가져올 날짜 수
const FETCH_LIMIT = 35;
function Home({}:HomeProps){
    const user_id="111";
    const theme = useSelector(({theme}:GlobalState) => theme);
    const [loading, setLoading] = useState<Boolean>(true);

    const today = dayjs()
    const [dailylist, setDailylist] = useState<IDailyList>({
        start: today,
        end: today,
        data: []
    });
    const [selected, setSelected] = useState<number>(0);
    const {start, end, data} = dailylist;

    const fillEmptyDay = (dbData:IDailyList):IDailyList => {
        const from = dbData.start;
        const to = dbData.end;

        let idx = 0;
        for(let i = 0; i<=to.diff(from, 'days'); i++){
            const date = from.add(i, 'days');
            if(idx >= dbData.data.length || 
                dbData.data[idx].date.format("YYYYMMDD") != date.format("YYYYMMDD")){
                dbData.data.splice(idx, 0, {
                    date,
                    events: []
                })
            }
            idx++;
        }
        return dbData;
    }
    useEffect(() => {
        (async () => {
            let newDailyListData:IDailyList = await getDailyList({user_id, start, end:today.add(UNIT_FETCH_ONCE-1, 'days')});
            newDailyListData = fillEmptyDay(newDailyListData);
            setDailylist(newDailyListData);
            setLoading(false);
        })();
    },[])
    // 7일치 데이터
    const loadAfterData = async () => {
        const newStart = end.add(1, 'days');
        const newEnd = end.add(UNIT_FETCH_ONCE, 'days');
        let newDailyListData:IDailyList = await getDailyList({user_id, start: newStart, end:newEnd});
        newDailyListData = fillEmptyDay(newDailyListData);
        setDailylist({
            start,
            end: newEnd,
            data: data.concat(newDailyListData.data)
        });
    }
    const loadBeforeData = async () => {
        const newStart = start.subtract(UNIT_FETCH_ONCE, 'days')
        const newEnd = start.subtract(1, 'days');
        let newDailyListData:IDailyList = await getDailyList({user_id, start: newStart, end:newEnd});
        newDailyListData = fillEmptyDay(newDailyListData);
        setDailylist({
            start: newStart,
            end,
            data: newDailyListData.data.concat(data)
        });
        setSelected(prev => prev+UNIT_FETCH_ONCE);
    }

    const loader = async (after:boolean) => {
        if(end.diff(start, 'days') > FETCH_LIMIT){
            Alert.alert("최대 5주까지 가능합니다.")
            return;
        }
        setLoading(true);
        const load = after ? loadAfterData : loadBeforeData;
        load().then(() => setLoading(false));
    };
    
    return(
        <SafeAreaView style={styles(theme).container}>
            <View style={{minHeight:140}}>
                <DailyList
                    loading={loading}
                    loader={loader}
                    selector={setSelected}
                    {...dailylist}
                />
            </View>
            <View style={{flex:1}}>
                {
                    !loading &&
                    <DailyView {...dailylist.data[selected]}/>
                }
            </View>
        </SafeAreaView>
    )
}

const styles = (theme:DefaultTheme) => StyleSheet.create({
    container: {
      flex: 1,
      alignItems:"stretch",
      backgroundColor: theme.mainBackground,
    },
});

export default Home;