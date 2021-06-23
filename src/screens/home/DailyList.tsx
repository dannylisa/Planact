import React, { useState, useEffect } from "react";
import { GlobalState } from '@modules/index';
import { IDailyList } from "@/utils/data";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { DefaultTheme } from "@style/styled";
import Daily from "./Daily";

interface DailyListProps extends IDailyList {
    loading: Boolean;
    selector: (index:number) => void;
    loader: (after:boolean) => Promise<void>;
}
function DailyList(props: DailyListProps){
    const {start, end, data, loading, loader, selector} = props;
    const theme = useSelector((state:GlobalState) => state.theme);

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
    const {mainBackground} = theme;
    return StyleSheet.create({
        scroll:{
            flex: 1,
            padding: 5,
            paddingVertical: 10,
            backgroundColor: mainBackground,
        },
    })
}


export default DailyList;