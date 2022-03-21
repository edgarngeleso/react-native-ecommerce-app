import React,{useState,useEffect} from "react";
import {
    View,
    ActivityIndicator,
} from "react-native";
import APPSETTINGS from "../constants/APPSETTINGS";
import { useSelector } from "react-redux";

const IsLoadingComponent = ({children})=>{
    const not_loaded = [1,2,3,4,5,6,7,8,9,10];
    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }else{
        app_theme = APPSETTINGS.colors.default;
    }
    return(
        <View style={{
            backgroundColor:app_theme.app_primary,
            height:"100%",
            width:"100%",}}
            collapsable={false}          
            >
            <View style={{
                        height:"100%",
                        width:"98%",
                        marginLeft:"1%"}}       
                >
                {children}
            {not_loaded.map(item=>{
                return(
                    <View 
                    key={item}
                    style={{ backgroundColor:app_theme.app_loading,
                                    height:100,
                                    width:"100%",
                                    marginTop:10,
                                    flexDirection:"row",}}>
                        <View style={{ backgroundColor:app_theme.app_box_backgroundColor,
                                        height:100,
                                        width:"48%",
                                        borderRadius:10}}>

                        </View>
                        <View style={{ 
                                        height:100,
                                        width:"48%",
                                        marginLeft:"2%"}}>
                            
                            <View style={{ backgroundColor:app_theme.app_box_backgroundColor,
                                            height:30,
                                            width:"100%",
                                            marginTop:0,
                                            marginLeft:10,
                                            borderRadius:10}}>
                            </View>
                            <View style={{ backgroundColor:app_theme.app_box_backgroundColor,
                                            height:20,
                                            width:100,
                                            marginTop:10,
                                            marginLeft:10,
                                            borderRadius:10}}>
                            </View>
                            <View style={{ backgroundColor:app_theme.app_box_backgroundColor,
                                            height:20,
                                            width:"100%",
                                            marginTop:10,
                                            marginLeft:10,
                                            borderRadius:10}}>
                            </View>
                        </View>

                    </View>
                )
            })}
        </View>
    </View>
    )
}

const fetching = ()=>{
    return(
        <View style={{justifyContent:"center",
                                        alignItems:"center",
                                        height:"100%",
                                        width:"100%"}}>
                <ActivityIndicator 
                    size="large"
                    color="00ff00"
                    style={{height:50,
                            width:40,
                        }}
                    />
        </View>
    )
}

export default IsLoadingComponent;