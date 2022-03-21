import React,{useState,useEffect} from "react";
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
    ScrollView
} from "react-native";
import { useSelector } from "react-redux";
import APPSETTINGS from "../../constants/APPSETTINGS";

const ProfileUpdate = ()=>{
    const userData = useSelector(state=>state.Reducer.loginInfo);
    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }

    return(
        <View style={{
            height:"100%",
            width:"98%",
            marginLeft:"1%"
        }}>
            <Text style={{textAlign:"center",marginTop:10}}>Edit your personal information</Text>

            <View style={{flexDirection:"row",marginTop:10}}>
                <View style={{
                    width:"48%",
                    justifyContent:"center",
                    alignItems:"center",
                }}>
                    <Text style={{color:app_theme.app_textColor_primary,
                            fontSize:17,
                            marginBottom:5}}>First name</Text>
                    <TextInput
                        placeholder={userData.data.firstname}
                        placeholderTextColor={app_theme.app_textColor_primary}
                        style={{...styles.text_input_fname_sname,
                                color:app_theme.app_textColor_primary,
                                borderColor:app_theme.app_textInput_borderColor}}
                    />
                </View>
                <View style={{
                    width:"48%",
                    marginLeft:"4%",
                    justifyContent:"center",
                    alignItems:"center",
                }}>
                    <Text style={{color:app_theme.app_textColor_primary,
                            fontSize:17,
                            marginBottom:5}}>Second name</Text>
                    <TextInput
                        placeholder={userData.data.secondname}
                        placeholderTextColor={app_theme.app_textColor_primary}
                        style={{...styles.text_input_fname_sname,
                                color:app_theme.app_textColor_primary,
                                borderColor:app_theme.app_textInput_borderColor}}
                    />
                </View>
                
            </View>
            <Text style={{color:app_theme.app_textColor_primary,fontSize:17,marginTop:5}}>User name</Text>
            <TextInput
                placeholder={userData.data.username}
                placeholderTextColor={app_theme.app_textColor_primary}
                style={{...styles.text_input_style,
                        color:app_theme.app_textColor_primary,
                        borderColor:app_theme.app_textInput_borderColor}}
            />
            <Text style={{color:app_theme.app_textColor_primary,fontSize:17,marginTop:5}}>Email</Text>
            <TextInput
                placeholder={userData.data.email}
                placeholderTextColor={app_theme.app_textColor_primary}
                style={{...styles.text_input_style,
                        color:app_theme.app_textColor_primary,
                        borderColor:app_theme.app_textInput_borderColor}}
            />
            <Text style={{color:app_theme.app_textColor_primary,
                        fontSize:17,
                        marginTop:5}}>Phone Number</Text>
            <TextInput
                placeholder="0712345678"
                placeholderTextColor={app_theme.app_textColor_primary}
                style={{...styles.text_input_style,
                        color:app_theme.app_textColor_primary,
                        borderColor:app_theme.app_textInput_borderColor}}
            />
            <Text style={{color:app_theme.app_textColor_primary,
                        fontSize:17,
                        marginTop:5}}>Current Location</Text>
            <TextInput
                placeholder="Current location"
                placeholderTextColor={app_theme.app_textColor_primary}
                style={{...styles.text_input_style,
                        color:app_theme.app_textColor_primary,
                        borderColor:app_theme.app_textInput_borderColor}}
            />
            <TouchableOpacity 
                style={{...styles.update_btn,
                        backgroundColor:app_theme.app_button_backgroundColor,}}
            >
                <Text style={styles.text_style}>
                    Update
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    picture_style:{
        width:50,
        height:50,
    },
    text_input_style:{
        borderWidth:1,
        width:"100%",
        height:33,
        borderRadius:10,
        marginTop:10
    },
    text_input_fname_sname:{
        borderWidth:1,
        width:"100%",
        height:33,
        borderRadius:10,
    },
    update_btn:{
        width:"48%",
        height:40,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        marginLeft:"52%",
        marginTop:10,
    },
    text_style:{
        fontSize:20,
        color:"white"
    }

})
export default ProfileUpdate;