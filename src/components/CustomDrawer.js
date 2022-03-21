import React,{useState,useEffect} from 'react';
//import type {Node} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import APPSETTINGS from "../constants/APPSETTINGS";
import {
    Text,
    View,
    SafeAreaView,
    Button,
    Image,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Share,
    Linking
  } from 'react-native';
  import {useDispatch, useSelector} from "react-redux"; 
import ThreeDotsComponent from './ThreeDotsComponent';

const Drawer = createDrawerNavigator();

const CustomDrawer = (props)=>{
  const [] = useState("");
  const login_data = useSelector(state=>state.Reducer.loginInfo);
  const dispatch = useDispatch();
  const logout = ()=>{
    dispatch({
        type:"LOGOUT",
    });
  }

  const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }else{
        app_theme = APPSETTINGS.colors.default;
    }

  const toggleTheme = async ()=>{
    let set_theme = theme==""?"dark":"";
    //save theme to local storage
    await AsyncStorageLib.setItem("app_theme",set_theme);
    //update app theme
    dispatch({
      type:"UPDATE_THEME",
      payload:set_theme,
    });
  }

  const share = async ()=>{
      try{
        let result = await Share.share({message:"Market app"});
        if(result == Share.sharedAction){
          if(result.activityType){

          }else{

          }
        }else if(result == Share.dismissedAction){

        }
      }catch(e){
        console.log(e);
      }
  }

  const openLink = async (url)=>{
    const supported = await Linking.canOpenURL(url);
    if(supported){
        await Linking.openURL(url);
    }else{
      Alert.alert("Error",`No app can open this url ${url}`);
    }
  }
    return(
    <SafeAreaView 
      style={{flex:1,
        top:-5,
        height:"100%",
        backgroundColor:app_theme.app_primary,
        }}>
        <DrawerContentScrollView {...props}
          contentContainerStyle={{
            top:0
          }}
        >
          <View>
            {login_data.loggedIn == true?
            <CustomProfile image = {login_data.data.userimage==undefined?
                                        require("../assets/icons/profile.png"):
                                          {uri:login_data.data.userimage}}>
              <View style={{flexDirection:"row",
                            justifyContent:"space-between"}}>
                <Text style={{fontSize:20,
                              marginLeft:10,
                              color:"white"}}>
                          {login_data.data.firstname} {login_data.data.secondname}
                </Text>
              </View>
              

            </CustomProfile>:
            <CustomProfile image={require("../assets/icons/profile.png")}>
              <Text style={{fontSize:20,
                            marginLeft:10,
                            color:app_theme.app_textColor_primary}}>Logged Out.</Text>
                           
            </CustomProfile>
            }
          </View>
          <DrawerItemList {...props}/>
        </DrawerContentScrollView>

        <View style={{
          height:30,
          flexDirection:"row",
          justifyContent:"space-between",
        }}>
          <TouchableOpacity 
            onPress={share}
            style={{flexDirection:"row",
                marginLeft:10,
                alignItems:"center",
                justifyContent:"center"}}>
              <Image
              source={require("../assets/icons/share.png")}
              style={{
                height:30,
                width:30,
                tintColor:app_theme.app_image_tinColor,
                borderRadius:5,
              }}
            />
            <Text style={{marginLeft:10,
              color:app_theme.app_textColor_primary}}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={toggleTheme}
            style={{
              marginRight:10,
              justifyContent:"center",
              alignItems:"center"
            }}
          >
            <Image
              source = {theme==""?
                          require("../assets/icons/light-bulb-ON.png"):
                          require("../assets/icons/light-bulb-OFF.png")}
              style={{
                height:30,
                width:30,
                tintColor:app_theme.app_image_tinColor,
                borderRadius:5,
              }}
            />
          </TouchableOpacity>
        </View>
        
        

        <Text style={{color:app_theme.app_textColor_primary,
                    marginLeft:10,
                    marginBottom:5,}}>Contact Us:</Text>
        <View style={{flexDirection:"row",
                  justifyContent:"space-around",
                  marginBottom:10,
                  }}>
          <TouchableOpacity 
            onPress={()=>{
              let facebook_url = "https://facebook.com";
              openLink(facebook_url);
            }}
            style={{justifyContent:"center",
            alignItems:"center"}}>
            <Image
              source={require("../assets/icons/facebook.png")}
              style={{
                height:20,
                width:20,
                borderRadius:5
              }}
            />
            <Text style={{color:app_theme.app_textColor_primary}}>
            Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={()=>{
              let whatsapp_url = "mailto:edgarngeleso@gmail.com";
              openLink(whatsapp_url);
            }}
            style={{justifyContent:"center",
            alignItems:"center"}}>
            <Image
              source={require("../assets/icons/gmail.png")}
              style={{
                height:20,
                width:20,
                borderRadius:5
              }}
            />
            <Text style={{color:app_theme.app_textColor_primary}}>
              E mail
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=>{
            let twitter_url = "https://twitter.com";
            openLink(twitter_url);
          }}
          sstyle={{justifyContent:"center",
          alignItems:"center"}}>
            <Image
              source={require("../assets/icons/twitter.png")}
              style={{
                height:20,
                width:20,
                borderRadius:5
              }}
            />
            <Text style={{color:app_theme.app_textColor_primary}}>
              Twitter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=>{
            let phoneNumber_url = "tel://0716484223";
            openLink(phoneNumber_url);
          }}
          style={{justifyContent:"center",
                  alignItems:"center"}}>
            <Image
              source={require("../assets/icons/contact.png")}
              style={{
                height:20,
                width:20,
                borderRadius:5
              }}
            />
            <Text style={{color:app_theme.app_textColor_primary}}>
              call
            </Text>
          </TouchableOpacity>
        </View>
  
        <View style={{flexDirection:"row",justifyContent:"space-around",marginBottom:10,}}>
          {login_data.loggedIn == true?
          <TouchableOpacity style={{
                  width:"80%",
                  height:30,
                  backgroundColor:"red",
                  justifyContent:"center",
                  alignItems:"center",
                  borderRadius:10,
                  marginRight:10,
                  flexDirection:"row"
                }}
                onPress={logout}
                >
                  <Image
                    source={require("../assets/icons/logout.png")}
                    style={{
                      width:27,
                      height:27,
                      tintColor:"white"
                    }}
                  />
                  <Text style={{fontSize:20,color:"white",marginLeft:30}}>
                    Sign out
                  </Text>
                  
            </TouchableOpacity>:<></>}
        </View>
      </SafeAreaView>
    )
  }


  const CustomProfile = ({image,children})=>{
    const isloggedin = useSelector(state=>state.Reducer.loginInfo);
    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }else{
        app_theme = APPSETTINGS.colors.default;
    }

    return(
        <View style={{top:0,
                      height:165,
                      backgroundColor:app_theme.app_statusBar_backgroundColor,
                      borderBottomRightRadius:10,
                      borderBottomLeftRadius:10,
                      }}>
                  <TouchableOpacity style={{marginLeft:5,marginTop:20}}>
                    <Image
                      source={image}
                      style={{
                        width:100,
                        height:100,
                        borderRadius:10,
                      }}
                    />
                  </TouchableOpacity>
                  {children}
              </View>
    )
  }
export default CustomDrawer;