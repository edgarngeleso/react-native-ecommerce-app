import React,{useState,useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    ToastAndroid,
    Vibration
} from "react-native";
import APPSETTINGS from "../constants/APPSETTINGS";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CheckBox from "react-native-check-box";

const SignInScreen = ()=>{
    const [other_login,setother_login] = useState(false);
    const [error,seterror] = useState("");
    const [loading,setloading] = useState(false);
    const [ischecked,setischecked] = useState(false);
    const dispatch = useDispatch();

    const DUMMYLOGINS = {
        username:"Mimi",
        password:"Mimi"
    }

    const [credentials,setcredentials] = useState({
        username:"",
        password:"",
    });

    async function getUser(){
        let data = await AsyncStorageLib.getItem("credentials");
        if(data !== null){
            let saveData = JSON.parse(data);
            console.log(saveData);
            setcredentials({
                username:saveData.username,
                password:saveData.password
            })
        }
    }
    useEffect(()=>{getUser();})

    const username = (e)=>{
        if(credentials.username !== ""){
            setcredentials({...credentials,username:null})
        }

        seterror("");
        setcredentials({...credentials,username:e});
    }
    const password = (e)=>{
        if(credentials.password !== ""){
            setcredentials({...credentials,password:null})
        }

        seterror("");
        setcredentials({...credentials,password:e});
    }

    const toggle_checked = ()=>{
        ischecked == false?setischecked(true):setischecked(false);
    }

    const save_locally = async (username,password)=>{
        try{
            //save username and password to local storage
            let all = {username:username,password:password};
            await AsyncStorageLib.setItem("credentials",JSON.stringify(all));
        }catch(e){
            console.log(e);
        }
    }

    const auth = ()=>{
        if(credentials.username == DUMMYLOGINS.username){
            if(credentials.password == DUMMYLOGINS.password){
                return true;
            }else{
                seterror("Wrong password!");
                return false;
            }
        }else{
            seterror("User name does not exist!");
            return false;
        }
    }

    
    const signIn = ()=>{
        //Vibration.vibrate(1)
        if(credentials.username !== ""){
            if(credentials.password !==""){
                seterror("");
                setloading(true);
                const url = "https://dreamrise.000webhostapp.com/api/api.php";
                let formdata = new FormData();
                formdata.append("username",credentials.username);
                formdata.append("password",credentials.password);
                fetch(url,{
                    method:"POST",
                    body:formdata
                }).
                then(response=>response.json()).
                then(data=>{
                 //handle errors
                    setloading(false);
                    if(data.error==true){
                        seterror(data.message);
                    }else{
                        if(ischecked == true){
                            save_locally(credentials.username,credentials.password);
                        }
                        ToastAndroid.show(`Logged in as ${data.firstname}`,ToastAndroid.LONG);
                        dispatch({
                            type:"LOGIN",
                            payload:{loggedIn:true,
                                    data:{id:data.id,
                                        firstname:data.firstname,
                                        secondname:data.secondname,
                                        username:data.username,
                                        email:data.email,
                                        isadmin:data.id == 1?1:0,
                                        issupplier:1,
                                        userimage:data.userimage,
                                        }}
                        })
                    }
                }).catch(error=>{
                    seterror(error.message);
                    setloading(false);
                })
                /*
               if(auth()){
                    dispatch({
                        type:"LOGIN",
                        payload:{loggedIn:true,
                                data:{id:1,
                                    firstname:credentials.username,
                                    secondname:credentials.username,
                                    username:credentials.username,
                                    email:credentials.username,
                                    isadmin:1,
                                    issupplier:1,
                                    userimage:credentials.username,}}
                    })
                }*/
                
            }else{
                seterror("Password is required!")
            }
        }else{
            seterror("Username is required!")
        }
    }

    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }

    return(
        <View style={{
            height:"100%",
            width:"100%",
            backgroundColor:app_theme.app_primary,
        }}>

        
            <Text style={{textAlign:"center",
                        fontSize:20,
                        color:"red"}}>
                            {error=="Network request failed"?"You are not connected to internet":error}
            </Text>
            
            <View style={{
                height:"45%",
                width:"100%",
                alignItems:"center",
                justifyContent:"center"
            }}>
                <TextInput
                    underlineColorAndroid = "transparent"
                    placeholder={"User name"}
                    placeholderTextColor={app_theme.app_textColor_primary}
                    style={{...styles.text_input,
                        color:app_theme.app_textColor_primary,
                        borderColor:app_theme.app_textInput_borderColor}}
                    onChangeText = {username}
                   autoFocus
                   value = {credentials.username}
                />

                <TextInput
                    underlineColorAndroid = "transparent"
                    secureTextEntry = {true}
                    placeholder="Password"
                    placeholderTextColor={app_theme.app_textColor_primary}
                    style={{...styles.text_input,
                        color:app_theme.app_textColor_primary,
                        borderColor:app_theme.app_textInput_borderColor}}
                    onChangeText = {password}
                    
                    value = {credentials.password}
                   
                />
                
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={signIn}
                    style={{
                        marginTop:10,
                        marginBottom:10,
                        height:40,
                        width:"90%",
                        borderRadius:10,
                        backgroundColor:"#27ae60",
                        alignItems:"center",
                        justifyContent:"center"
                    }}
                    disabled={loading}
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
                    }}>Sign In</Text>}
                    
                </TouchableOpacity>
                
                <BouncyCheckbox
                    size={25}
                    fillColor={"#27ae60"}
                    unfillColor="#FFFFFF"
                    text={"Remember me"}
                    iconStyle={{ borderColor: "#27ae60" }}
                    textStyle={{ fontFamily: "JosefinSans-Regular",
                                fontSize:23,textDecorationLine: "none", 
                                color:app_theme.app_textColor_primary}}
                    onPress = {toggle_checked}
                        />
            </View>
            

            {/*sign in with google or facebook
            <Text style={{textAlign:"center",marginTop:30}}>Or connect using?</Text>
            <View 
                style={{
                    marginLeft:"0%",
                    marginTop:10,
                    height:50,
                    width:"100%",
                    borderRadius:10,
                    alignItems:"center",
                    justifyContent:"center",
                    flexDirection:"row",
                }}
            >
                    
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>{}}
                    style={{
                        marginLeft:"1%",
                        marginTop:10,
                        marginBottom:20,
                        height:"100%",
                        width:"48%",
                        borderRadius:10,
                        backgroundColor:"#27ae60",
                        alignItems:"center",
                        justifyContent:"center"
                    }}
                >
                    <Text  style={{
                        fontSize:22,
                        color:"white"
                    }}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>{}}
                    style={{
                        marginLeft:"1%",
                        marginTop:10,
                        marginBottom:20,
                        height:"100%",
                        width:"48%",
                        borderRadius:10,
                        backgroundColor:app_theme.app_button_backgroundColor,
                        alignItems:"center",
                        justifyContent:"center"
                    }}
                >
                    <Text  style={{
                        fontSize:22,
                        color:"white"
                    }}>Facebook</Text>
                </TouchableOpacity>
            </View>
            */}
        </View>
    )
}

const styles = StyleSheet.create({
    text_input:{
        borderBottomWidth:1,
        width:"95%",
        height:50,
        borderRadius:10,
        paddingTop:20,
        fontSize:20,
        marginTop:10,
    }
})
export default SignInScreen;