import React from "react";
import { ActivityIndicator } from "react-native";

export default function () {
    return (
        <ActivityIndicator
            color="black"
            size="large"
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }}
          />)
}