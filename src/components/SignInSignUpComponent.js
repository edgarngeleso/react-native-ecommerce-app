import React,{useState,useEffect,useRef} from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    Button,
    TouchableOpacity,
    StyleSheet,
    Modal,
    SafeAreaView,
    ScrollView,
    BackHandler,
} from "react-native";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { useSelector, useDispatch } from "react-redux";

const SignInSignUpComponent = ({navigation})=>{
    const [isSignInOpen,setisSignInOpen] = useState(true);
    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;

    const dispatch = useDispatch();
    const DisplayBottomTabs = ()=>{
        dispatch(
            {
                type:"TOGGLE_BOTTOM_TABS",
                payload:true
            })
    }
    BackHandler.addEventListener("hardwareBackPress",()=>{
        //navigation.goBack();
        DisplayBottomTabs();
    })

    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }else{
        app_theme = APPSETTINGS.colors.default;
    }
    return(
        <View style={{height:"100%",backgroundColor:app_theme.app_primary,}}>
            <View style={{
                flexDirection:"row",
                width:"100%",
                height:50,
                backgroundColor:app_theme.app_header_backgroundColor,
                borderBottomRightRadius:10,
                borderBottomLeftRadius:10
            }}>
                <TouchableOpacity 
                    onPress={()=>{
                        DisplayBottomTabs();
                        navigation.goBack()}}
                    style={{
                        height:40,
                        width:40,
                        margin:2,
                        borderRadius:20,
                        backgroundColor:"white",
                        alignItems:"center",
                        justifyContent:"center",
                        zIndex:10
                    }}
                    >
                    <Image 
                        source={require("../assets/icons/back.png")}
                        style={{
                            height:30,
                            width:30,
                        }}
                        />
                </TouchableOpacity>
                <Text style={{fontSize:25,fontWeight:"bold",
                            color:app_theme.app_textColor_primary,margin:5}}>
                                {isSignInOpen==true?"Sign In":"Sign Up"}</Text>
            </View>
            <ScrollView >
                <View style={{
                    width:"100%",
                    flexDirection:"row",
                    justifyContent:"space-around",
                    marginTop:10,
                    height:40,
                    
                }}>
                    <TouchableOpacity
                        onPress = {()=>setisSignInOpen(true)}
                        style={{...styles.touchable_style,}}
                    >
                        <Text style={{
                            color:theme == ""?isSignInOpen==true?"#27ae60":"black":isSignInOpen==true?"#27ae60":"white",
                            fontSize:25,
                            textDecorationLine:isSignInOpen==true?"underline":null
                        }}>
                            Sign In
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress = {()=>setisSignInOpen(false)}
                        style={{...styles.touchable_style,}}
                    >
                        <Text style={{
                            color:theme == ""?isSignInOpen==false?"#27ae60":"black":isSignInOpen==false?"#27ae60":"white",
                            fontSize:25,
                            textDecorationLine:isSignInOpen==false?"underline":null
                        }}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    width:"100%",
                    alignItems:"center",
                    justifyContent:"center",
                }}>
                    <Image
                    source={require("../assets/icons/logo.png")}
                        style={{
                            width:80,
                            height:80,
                        }}
                    />
                </View>
                
                {isSignInOpen==true?<SignInScreen/>:<SignUpScreen/>}
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    touchable_style:{
        width:"45%",
        height:40,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5,
    }
})

export default SignInSignUpComponent;