import { GlobalState } from "@/../App";
import { IDailyList, IDaily } from "@/utils/data";
import { Dayjs } from "dayjs";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { DefaultTheme } from "styled-components/native";
import Daily from "./Daily";

interface DailyListProps extends IDailyList {
    loading: Boolean;
    selector: (index:number) => void;
    loader: (after:boolean) => Promise<void>;
}
function DailyList(props: DailyListProps){
    const {start, end, data, loading, loader, selector} = props;
    const theme = useSelector((state:GlobalState) => state);

    useEffect(() => {
        if(loading) return;
        
    }, [loading])

    const [contentSize, setContentSize] = useState<number>(0);
    const getData = async (props:any) => {
        if(loading) return;
        // loader(true);

        const x = props.nativeEvent.contentOffset.x;
        if(x < 0)
            loader(false);
        else if(contentSize - x < 400)
            loader(true);
    }
    const renderItem = (props:any) => {
        if(loading) return <></>;
        const onPress = () => selector(props.index)
        return (
            <Daily 
                onPress={onPress}
                {...props.item} 
            />)
    }

    return(
        <FlatList
            onScrollEndDrag={getData}
            onContentSizeChange={setContentSize}
            horizontal
            showsHorizontalScrollIndicator
            initialNumToRender={7}
            style={styles(theme).scroll}
            data={data}
            keyExtractor={(item) => String(item.date.format("YYYYMMDD") )}
            renderItem={renderItem}
            />
    )
}


const styles = (theme:DefaultTheme) => {
    return StyleSheet.create({
        scroll:{
            flex: 1,
            padding: 5,
            paddingVertical: 10,
            backgroundColor: "#fafafa",
        },
    })
}


export default DailyList;