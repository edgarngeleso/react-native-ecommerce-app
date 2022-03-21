import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    StatusBar
} from "react-native";
import {useSelector} from "react-redux";
import APPSETTINGS from "../constants/APPSETTINGS";

//header component
const HeaderComponent = ({navigation,children})=>{
    const theme = useSelector(state=>state.Reducer.selectedTheme);
    const login_data = useSelector(state=>state.Reducer.loginInfo);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    } 
    return(
    <View 
        style={{
            width:"100%",
            height:50,
            flexDirection:"row",
            justifyContent:"space-between",
            marginTop:0,
            backgroundColor:app_theme.app_header_backgroundColor}}
            collapsable={false}>
        {/*app's status bar */}
      <StatusBar backgroundColor={app_theme.app_statusBar_backgroundColor}/>
        {/**********/}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image
            source={require("../assets/icons/menu.png")}
            resizeMode="cover"
            style={{
                width:40,
                height:40,
                tintColor:app_theme.app_image_tinColor,
            }}
        />
      </TouchableOpacity>

      <Text 
        style={{
            fontSize:24,
            fontWeight:"bold",
            color:app_theme==""?"#27ae60":app_theme.app_textColor_primary,
            marginTop:10}}>
        {APPSETTINGS.app_name}
      </Text>

      <TouchableOpacity 
        style={{backgroundColor:"white",
            width:40,
            height:40,
            borderRadius:20,
            alignItems:"center",
            justifyContent:"center",
            marginRight:5,
            marginTop:5}}
        onPress={()=>{navigation.navigate("profile")}}
            >
        
        <Image
            source={login_data.data.userimage==undefined?
                        require("../assets/icons/profile.png"):
                        {uri:login_data.data.userimage}}
            resizeMode="cover"
            style={{
                width:35,
                height:35,
                borderRadius:15,
            }}
        />
      </TouchableOpacity>
    </View>)
  }
  export default HeaderComponent;