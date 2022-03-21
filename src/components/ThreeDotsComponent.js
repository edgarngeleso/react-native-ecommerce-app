import React from "react";
import {
    View,
} from "react-native";
const ThreeDotsComponent = ({isVertical,height,width,dotsColor})=>{
    return(
        <View style={{
            height:height,
            width:width,
            justifyContent:"space-between",
            flexDirection:isVertical==true?"column":"row",
        }}>
            {[1,2,3].map(i=>{
                return(
                    <View
                        style={{
                        width:"20%",
                        height:"20%",
                        borderRadius:10,
                        backgroundColor:dotsColor,
                    }}
                    ></View>
                )
            })}
            
        </View>
    )
}
export default ThreeDotsComponent;