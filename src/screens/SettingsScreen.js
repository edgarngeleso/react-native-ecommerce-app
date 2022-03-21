import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Button,
    Switch,
    ScrollView,
    StyleSheet
} from "react-native";
import APPSETTINGS from "../constants/APPSETTINGS";
import HeaderComponent from "../components/HeaderComponent";
import { useDispatch, useSelector } from "react-redux";
import { Swipeable } from "react-native-gesture-handler";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
const SettingsScreen = ({navigation})=>{
    const [aapp_theme,setapp_theme] = useState(APPSETTINGS.colors.default);
    const [changed,setChanged] = useState(false); 
    const [isdark,setisdark] = useState(false);
    let app_theme = APPSETTINGS.colors.default;
    let dispatch = useDispatch();
    const theme = useSelector(state=>state.Reducer.selectedTheme);

    const date = new Date();
    const hours = date.getHours();
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }
    /*else if(theme=="auto"){
        useEffect(()=>{
            if(hours >=18){
                dark();
            }else{
                light();
            }
        },[hours])
    }*/

    const light = async ()=>{
        //save theme to local storage
        await AsyncStorageLib.setItem("app_theme","");

        dispatch({
            type:"UPDATE_THEME",
            payload:"",
        })
    }

    const dark = async ()=>{
        //save theme to local storage
        await AsyncStorageLib.setItem("app_theme","dark");

        dispatch({
            type:"UPDATE_THEME",
            payload:"dark",
        })
    }

    const auto = ()=>{
       //dispatch({type:"UPDATE_THEME",payload:"auto"})
    }
    return(
        <View style={{
            backgroundColor:app_theme.app_primary,
            height:"100%",
            width:"100%"}}>
            <View style={{height:45,
                            width:"100%",
                            flexDirection:"row",
                            backgroundColor:app_theme.app_header_backgroundColor,
                            borderBottomRightRadius:10,
                            borderBottomLeftRadius:10,
                            }}>
                    <TouchableOpacity
                        activeOpacity={0.8} 
                        style={{
                            height:40,
                            width:40,
                            margin:2,
                            borderRadius:20,
                            backgroundColor:"white",
                            alignItems:"center",
                            justifyContent:"center"
                        }}
                        onPress={()=>{
                            navigation.goBack();}}
                    >
                        <Image 
                            source={require("../assets/icons/back.png")}
                            style={{
                                height:30,
                                width:30,
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={{fontSize:25,fontWeight:"bold",color:"white",margin:5}}>Settings</Text>

                </View>
            <ScrollView style={{
                    backgroundColor:app_theme.app_primary,
                    height:"100%",
                    width:"98%",
                    marginLeft:"1%"}}>
            <View 
                style={{
                    alignItems:"center",
                    justifyContent:"center",}}>
                <Text 
                    style={{
                        fontSize:20,
                        fontWeight:"bold",
                        textDecorationLine:"underline",
                        color:app_theme.app_textColor_primary}} >
                    Customize App appearance
                </Text>
            </View>
            <Text 
                style={{
                    marginTop:10,
                    fontSize:20,
                    fontWeight:"bold",
                    textDecorationLine:"underline",
                    color:app_theme.app_textColor_primary,
                    textAlign:"center"}} >
                   Theme
            </Text>
            <View 
                style={{
                    flexDirection:"column",
                    justifyContent:"space-between",
                    marginTop:20,}}>
                <TouchableOpacity
                    style={styles.touchable_style}
                    onPress={light}
                >
                    <Text style={{
                        color:app_theme.app_textColor_primary,
                        fontSize:18,
                        marginTop:10
                    }}>
                        Light
                    </Text>
                    <View style={{
                        borderWidth:2,
                        borderColor:"#27ae60",
                        height:20,
                        width:20,
                        borderRadius:10,
                        backgroundColor:theme == ""?"#27ae60":null
                    }}></View>
                    {/*<Switch 
                        onValueChange={()=>setisdark(false)}
                    value={theme == ""?true:false}></Switch>*/}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchable_style}
                    onPress={dark}
                >
                    <Text style={{
                        color:app_theme.app_textColor_primary,
                        fontSize:18,
                        marginTop:10
                    }}>
                        Dark
                    </Text>
                    <View style={{
                        borderWidth:2,
                        borderColor:"#27ae60",
                        height:20,
                        width:20,
                        borderRadius:10,
                        backgroundColor:theme == ""?null:"#27ae60"
                    }}></View>

                    {/*<Switch onValueChange={()=>setisdark(true)}
                    value={theme == ""?false:true}></Switch>*/}
                </TouchableOpacity>
                {/*<Swipeable
                    renderRightActions={()=>{
                                return(
                                    <View>
                                        <Text>Hello</Text>
                                    </View>
                                )
                            }}
                            >
                    <TouchableOpacity
                        style={styles.touchable_style}
                        onPress={auto}
                    >
                        <Text style={{
                            color:app_theme.app_textColor_primary,
                            fontSize:18,
                            marginTop:10
                        }}>
                            Auto
                        </Text>
                </TouchableOpacity>

                </Swipeable>*/}
                <TouchableOpacity 
                    style={styles.touchable_style}
                    onPress={dark}
                >
                    <Text style={{
                            color:app_theme.app_textColor_primary,
                            fontSize:18,
                            marginTop:10
                        }}>
                            Auto
                    </Text>
                    <View style={{
                        borderWidth:2,
                        borderColor:"#27ae60",
                        height:20,
                        width:20,
                        borderRadius:10,
                    }}></View>
                </TouchableOpacity>
                    
            </View>

            <Text 
                style={{
                    marginTop:10,
                    fontSize:20,
                    fontWeight:"bold",
                    textDecorationLine:"underline",
                    color:app_theme.app_textColor_primary,
                    textAlign:"center"}} >
                   App font size
            </Text>
            <View 
                style={{
                    flexDirection:"column",
                    justifyContent:"space-between",
                    marginTop:20,}}>
                <TouchableOpacity
                    style={styles.touchable_style}
                    onPress={()=>{}}
                >
                    <Text style={{
                        color:app_theme.app_textColor_primary,
                        fontSize:18,
                        marginTop:10
                    }}>
                        Small
                    </Text>
                    <View style={{
                        borderWidth:2,
                        borderColor:"#27ae60",
                        height:20,
                        width:20,
                        borderRadius:10,
                    }}></View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchable_style}
                    onPress={()=>{}}
                >
                    <Text style={{
                        color:app_theme.app_textColor_primary,
                        fontSize:18,
                        marginTop:10
                    }}>
                        Medium
                    </Text>
                    <View style={{
                        borderWidth:2,
                        borderColor:"#27ae60",
                        height:20,
                        width:20,
                        borderRadius:10,
                        backgroundColor:"#27ae60",
                    }}></View>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.touchable_style}
                    onPress={()=>{}}
                >
                    <Text style={{
                        color:app_theme.app_textColor_primary,
                        fontSize:18,
                        marginTop:10
                    }}>
                        Large
                    </Text>
                    <View style={{
                        borderWidth:2,
                        borderColor:"#27ae60",
                        height:20,
                        width:20,
                        borderRadius:10,
                    }}></View>
                </TouchableOpacity>
                
            </View>

            <Text 
                style={{
                    marginTop:10,
                    fontSize:20,
                    fontWeight:"bold",
                    textDecorationLine:"underline",
                    color:app_theme.app_textColor_primary,
                    textAlign:"center"}} >
                   App font
            </Text>
            <View 
                style={{
                    flexDirection:"column",
                    justifyContent:"space-between",
                    marginTop:20,}}>
                <TouchableOpacity
                    style={styles.touchable_style}
                    onPress={()=>{}}
                >
                    <Text style={{
                        color:app_theme.app_textColor_primary,
                        fontSize:18,
                        marginTop:10
                    }}>
                        Sans Serif
                    </Text>

                    <View style={{
                        borderWidth:2,
                        borderColor:"#27ae60",
                        height:20,
                        width:20,
                        borderRadius:10,
                        backgroundColor:"#27ae60",
                    }}></View>

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchable_style}
                    onPress={()=>{}}
                >
                    <Text style={{
                        color:app_theme.app_textColor_primary,
                        fontSize:18,
                        marginTop:10
                    }}>
                        Roboto
                    </Text>
                    <View style={{
                        borderWidth:2,
                        borderColor:"#27ae60",
                        height:20,
                        width:20,
                        borderRadius:10,
                    }}></View>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    touchable_style:{
        flexDirection:"row",
        width:"98%",
        justifyContent:"space-between",
        marginLeft:"1%"
    }
})
export default SettingsScreen;