import { SpecificColors } from "@/modules/theme/hooks";
import { Feather } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { Linking, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface URLProps extends TouchableOpacityProps {
    url: string
    size: number
}
export default function ({ url, size, ...others }:URLProps) {
    const handlePress = useCallback(() => {
        Linking.openURL(url);
    }, [url]);
  
    return (
        <TouchableOpacity onPress={handlePress} {...others}>
            <Feather 
                name="external-link"
                color={SpecificColors.blue}
                size={size}
            />
        </TouchableOpacity>
    );
  };