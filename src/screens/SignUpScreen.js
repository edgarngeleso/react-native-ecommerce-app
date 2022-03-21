import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Image,
} from "react-native";
import APPSETTINGS from "../constants/APPSETTINGS";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
const SignUpScreen = ()=>{
    const [userInfo,setuserInfo] = useState({
        firstname:"",
        secondname:"",
        username:"",
        email:"",
        phonenumber:"",
        password:"",
    });
    const [loading,setloading] = useState(false);
    const [signupData,setsignupData] = useState("");
    const [error,seterror] = useState("");
    const url = "https://dreamrise.000webhostapp.com/api/api.php";
    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }

    const firstname = (text)=>{
        setuserInfo({...userInfo,firstname:text});
    }

    const secondname = (text)=>{
        setuserInfo({...userInfo,secondname:text});
    }

    const username = (text)=>{
        setuserInfo({...userInfo,username:text});
    }

    const email = (text)=>{
        setuserInfo({...userInfo,email:text});
    }

    const phonenumber = (text)=>{
        setuserInfo({...userInfo,phonenumber:text});
    }

    const password = (text)=>{
        setuserInfo({...userInfo,password:text});
    }
    
    const validatePassword = ()=>{
        if(userInfo.password.length <= 7){
            seterror("Weak password. Type atleast 8 characters.");
            return false;
        }else{
            return true; 
        }
    }

    const signup = ()=>{
        
        if(userInfo.firstname == ""){
            seterror("First name is required.");
            return false;
        }
        if(userInfo.secondname == ""){
            seterror("Second name is required.");
            return false;
        }
        if(userInfo.username == ""){
            seterror("User name is required.");
            return false;
        }
        if(userInfo.email == ""){
            seterror("Email is required.");
            return false;
        }
        if(userInfo.phonenumber == ""){
            seterror("Phone number is required.");
            return false;
        }
        if(userInfo.password == ""){
            seterror("Password is required.");
            return false;
        }
        
        if(userInfo.password.length <= 7){
            seterror("Weak password. Type atleast 8 characters.");
            return false;
        }
        setloading(true);
        seterror("");
        let formdata = new FormData();
		formdata.append("register_firstname",userInfo.firstname);
		formdata.append("register_secondname",userInfo.secondname);
		formdata.append("register_username",userInfo.username);
		formdata.append("register_email",userInfo.email);
		formdata.append("register_phonenumber",userInfo.phonenumber);
		formdata.append("register_password",userInfo.password);
        fetch(url,{
            method:"POST",
            body:formdata
        }).
        then(response=>response.json()).
        then(data=>{
            setloading(false);
            if(data.error == true){
                seterror(data.message);
            }else{
                seterror("");
                setuserInfo({firstname:"",
                    secondname:"",
                    username:"",
                    email:"",
                    phonenumber:"",
                    password:"",
                });
                setsignupData(data);
            }
        }).
        catch(e=>{
            setloading(false);
            seterror(e.message);
        })
    }
    return(
        <View style={{
            width:"100%",
            height:"100%",
            backgroundColor:app_theme.app_primary,
        }}>
        <ScrollView>
            <Text style={{textAlign:"center",
                        fontSize:20,
                        color:"red"}}>
                            {error=="Network request failed"?"You are not connected to internet":error}
            </Text>
            <Text style={{textAlign:"center",
                        fontSize:20,
                        color:"#27ae60"}}>
                            {signupData.error==false?"Succesfully registered":signupData.message}
            </Text>
            
            <View style={{
                width:"100%",
                alignItems:"center",
                justifyContent:"center"
            }}>
                <TextInput
                    underlineColorAndroid = "transparent"
                    placeholder="First name*"
                    placeholderTextColor={app_theme.app_textColor_primary}
                    style={{...styles.text_input,
                        color:app_theme.app_textColor_primary,
                        borderColor:app_theme.app_textInput_borderColor}}
                    onChangeText = {firstname}
                    autoFocus
                />
                <TextInput
                    underlineColorAndroid = "transparent"
                    placeholder="Second name*"
                    placeholderTextColor={app_theme.app_textColor_primary}
                    style={{...styles.text_input,
                        color:app_theme.app_textColor_primary,
                        borderColor:app_theme.app_textInput_borderColor}}
                    onChangeText = {secondname}
                />

                <TextInput
                    underlineColorAndroid = "transparent"
                    placeholder="User name*"
                    placeholderTextColor={app_theme.app_textColor_primary}
                    style={{...styles.text_input,
                        color:app_theme.app_textColor_primary,
                        borderColor:app_theme.app_textInput_borderColor}}
                    onChangeText = {username}
                />

                <TextInput
                    underlineColorAndroid = "transparent"
                    placeholder="Email*"
                    placeholderTextColor={app_theme.app_textColor_primary}
                    style={{...styles.text_input,
                        color:app_theme.app_textColor_primary,
                        borderColor:app_theme.app_textInput_borderColor}}
                    onChangeText = {email}
                />
                <TextInput
                    underlineColorAndroid = "transparent"
                    placeholder="Phone number*"
                    placeholderTextColor={app_theme.app_textColor_primary}
                    style={{...styles.text_input,
                        color:app_theme.app_textColor_primary,
                        borderColor:app_theme.app_textInput_borderColor}}
                    onChangeText = {phonenumber}
                />
                <View style={{
                        width:"100%",
                        marginLeft:"2.5%"
                    }}>
                    <TextInput
                        underlineColorAndroid = "transparent"
                        secureTextEntry = {true}
                        placeholder="Password*"
                        placeholderTextColor={app_theme.app_textColor_primary}
                        style={{...styles.text_input,
                            color:app_theme.app_textColor_primary,
                            borderColor:app_theme.app_textInput_borderColor}}
                        onChangeText = {password}
                    />
                    <View style={{
                                height:45,
                                width:45,
                                position:"absolute",
                                marginLeft:"90%",
                                alignItems:"center",
                                justifyContent:"center"
                                
                            }}>
                        {userInfo.password==""?
                            <></>:userInfo.password.length <= 7?
                            <Image 
                            source={require("../assets/icons/remove.png")}
                            style={{
                                height:30,
                                width:30,
                            }}
                        />:<LottieView
                            source={require('../assets/animations/ok.json')}
                            
                            colorFilters={[
                            {
                                keypath: 'button',
                                color: '#F00000',
                            },
                            {
                                keypath: 'Sending Loader',
                                color: '#F00000',
                            },
                            ]}
                            style={{
                                height:40,
                                width:40,
                            }}
                            autoPlay
                            loop={false}
                        />}
                    </View>  
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={signup}
                    style={{
                        marginTop:10,
                        marginBottom:20,
                        height:40,
                        width:"90%",
                        borderRadius:10,
                        backgroundColor:app_theme.app_button_backgroundColor,
                        alignItems:"center",
                        justifyContent:"center"
                    }}
                >
                    {loading==true?<ActivityIndicator
                        size="large"
                        color="white"
                        style={{height:50,
                                width:40,
                            }}
                        
                    />:<Text  style={{
                        fontSize:22,
                        color:"white"
                    }}>Sign Up</Text>}
                </TouchableOpacity>
            </View>
        </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    text_input:{
        borderBottomWidth:1,
        width:"95%",
        height:45,
        borderRadius:10,
        paddingTop:15,
        fontSize:20,
        marginTop:10,
    }
})
export default SignUpScreen;