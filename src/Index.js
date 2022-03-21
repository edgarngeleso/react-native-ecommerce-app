import React,{useState,useEffect, useRef} from 'react';
import {
  Text,
  View,
  Button,
  Image,
  AppState
} from 'react-native';
//import type {Node} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import CustomDrawer from './components/CustomDrawer';
import Dashboard from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import NewProductsScreen from './screens/NewProductsScreen';
import AboutScreen from './screens/AboutScreen';
import SettingsScreen from './screens/SettingsScreen';
import APPSETTINGS from "./constants/APPSETTINGS";
import FavoritesScreen from './screens/FavoritesScreen';
import { useDispatch, useSelector } from 'react-redux';
import ProfileScreen from './screens/ProfileScreen';
import FAQScreen from './screens/FAQScreen';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
//import BottomTabs from './components/BottomTabsComponent';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Drawers = ({navigation})=>{
  //get saved theme and update theme state
  let dispatch = useDispatch();
  const getSavedTheme = async ()=>{
    let result = await AsyncStorageLib.getItem("app_theme");
    if(result == null){
      dispatch({
        type:"UPDATE_THEME",
        payload:"",
      })
    }else{
      dispatch({
        type:"UPDATE_THEME",
        payload:result,
    })
    }
  }
  useEffect(()=>{getSavedTheme()},[]);

  const login_data = useSelector(state=>state.Reducer.loginInfo);
  const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }else{
        app_theme = APPSETTINGS.colors.default;
    }

    const appState = useRef(AppState.currentState);
    const [appStateViseible,setappStateVisible] = useState(appState.current);

    useEffect(()=>{
      const subscription = AppState.addEventListener("change",nextAppState=>{
        if(appState.current.match(/inactive|background/) && nextAppState === "active"){
          console.log("app is in foreground");
        }
        appState.current = nextAppState;
        setappStateVisible(appState.current);
        console.log("Appstate=",appState.current);
      })
      return ()=>{
        subscription.remove();
      }
    },[]);
    
  return(
    <Drawer.Navigator 
      
      initialRouteName='Home'
      drawerContent={props=> <CustomDrawer {...props}/>} 
      screenOptions = {{
        headerShown:false,
      }}
      >
        <Drawer.Screen
          name="Home"
          component={Dashboard}
          options={{
            drawerLabel:()=>null,
            drawerItemStyle:{backgroundColor:"transparent"},
            drawerIcon:({focused})=>{
              return(
                <View style={{
                  flexDirection:"row",
                  width:"100%",
                  height:"100%",
                  borderRadius:10,
                  backgroundColor:focused?"transparent":"transparent",
                  }}>
                    
                  <Image
                    source={require("./assets/icons/dashboard.png")}
                    style={{
                      height:20,
                      width:20,
                      tintColor:theme==""?focused?"#27ae60":"black":focused?"#27ae60":"white",
                      marginTop:10,
                    }}
                  />
                  <Text style={{marginLeft:20,
                              color:theme==""?focused?"#27ae60":"black":focused?"#27ae60":"white",
                              fontWeight:focused?"bold":null,
                              fontSize:18,
                              marginTop:10,}}>
                                Dashboard</Text>
                </View>)
            }
          }}
        />

        <Drawer.Screen
          name="Products"
          component={ProductsScreen}
          options={{
            drawerLabel:()=>null,
            drawerItemStyle:{backgroundColor:"transparent"},
            drawerIcon:({focused})=>{
              return(
                <View style={{
                  flexDirection:"row",
                  width:"100%",
                  borderRadius:10,
                  backgroundColor:focused?"transparent":"transparent",
                  }}>
                  <Image
                    source={require("./assets/icons/products.png")}
                    style={{
                      height:20,
                      width:20,
                      tintColor:theme==""?focused?"#27ae60":"black":focused?"#27ae60":"white",
                      marginTop:10,
                    }}
                  />
                  <Text style={{marginLeft:20,
                              color:theme==""?focused?"#27ae60":"black":focused?"#27ae60":"white",
                              fontWeight:focused?"bold":null,
                              fontSize:18,
                              marginTop:10,}}>
                                Products</Text>
                </View>)
            }
          }}
        />

        <Drawer.Screen
          name="For you"
          component={NewProductsScreen}
          options={{
            drawerLabel:()=>null,
            drawerItemStyle:{backgroundColor:"transparent"},
            drawerIcon:({focused})=>{
              return(
                <View style={{
                  flexDirection:"row",
                  width:"100%",
                  borderRadius:10,
                  backgroundColor:focused?"transparent":"transparent",
                  
                }}>
                  <Image
                    source={require("./assets/icons/new.png")}
                    style={{
                      height:20,
                      width:20,
                      tintColor:theme==""?focused?"#27ae60":"black":focused?"#27ae60":"white",
                      marginTop:10,
                    }}
                  />
                  <Text style={{marginLeft:20,
                              color:theme==""?focused?"#27ae60":"black":focused?"#27ae60":"white",
                              fontWeight:focused?"bold":null,
                              fontSize:18,
                              marginTop:10,}}>
                                For you</Text>
                </View>)
            }
          }}
        />
        

        <Drawer.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            drawerLabel:()=>null,
            drawerItemStyle:{backgroundColor:"transparent"},
            drawerIcon:({focused})=>{
              return(
                <View style={{
                  flexDirection:"row",
                  width:"100%",
                  borderRadius:10,
                  backgroundColor:focused?"transparent":"transparent",}}>
                  <Image
                    source={require("./assets/icons/heart.png")}
                    style={{
                      height:20,
                      width:20,
                      tintColor:theme==""?focused?"#27ae60":"black":focused?"#27ae60":"white",
                      marginTop:10,
                    }}
                  />
                  <Text style={{marginLeft:20,
                              color:theme==""?focused?"#27ae60":"black":focused?"#27ae60":"white",
                              fontWeight:focused?"bold":null,
                              fontSize:18,
                              marginTop:10,}}>
                                Favorites</Text>
                </View>)
            }
          }}
        />
        <Drawer.Screen
          name="About"
          component={AboutScreen}
          options={{
            drawerLabel:()=>null,
            drawerItemStyle:{backgroundColor:"transparent"},
            drawerIcon:({focused})=>{
              return(
                <View style={{
                  flexDirection:"row",
                  width:"100%",
                  borderRadius:10,
                  backgroundColor:focused?"transparent":"transparent",}}>
                  <Image
                    source={require("./assets/icons/about.png")}
                    style={{
                      height:20,
                      width:20,
                      tintColor:theme==""?focused?"#27ae60":"black":focused?"#27ae60":"white",
                      marginTop:10,
                    }}
                  />
                  <Text style={{marginLeft:20,
                              color:theme==""?focused?"#27ae60":"black":focused?"#27ae60":"white",
                              fontWeight:focused?"bold":null,
                              fontSize:18,
                              marginTop:10,}}>
                                About us</Text>
                </View>)
            }
          }}
        />
        
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            drawerLabel:()=>null,
            drawerItemStyle:{backgroundColor:"transparent"},
            drawerIcon:({focused})=>{
              return(
                <View style={{
                  flexDirection:"row",
                  width:"100%",
                  height:"100%",
                  borderRadius:10,
                  backgroundColor:focused?"transparent":"transparent",}}>
                  <Image
                    source={require("./assets/icons/settings.png")}
                    style={{
                      height:20,
                      width:20,
                      tintColor:theme==""?focused?"#27ae60":"black":focused?"#27ae60":"white",
                      marginTop:10,
                    }}
                  />
                  <Text style={{marginLeft:20,
                              color:theme==""?focused?"#27ae60":"black":focused?"#27ae60":"white",
                              fontWeight:focused?"bold":null,
                              fontSize:18,
                              marginTop:10,}}>
                                Settings</Text>
                </View>)
            }
          }}
        />

      <Drawer.Screen
          name="FAQ"
          component={FAQScreen}
          options={{
            drawerLabel:()=>null,
            drawerItemStyle:{backgroundColor:"transparent"},
            drawerIcon:({focused})=>{
              return(
                <View style={{
                  flexDirection:"row",
                  width:"100%",
                  height:"100%",
                  borderRadius:10,
                  backgroundColor:focused?"transparent":"transparent",}}>
                  <Image
                    source={require("./assets/icons/faq.png")}
                    style={{
                      height:20,
                      width:20,
                      tintColor:theme==""?focused?"#27ae60":"black":focused?"#27ae60":"white",
                      marginTop:10,
                    }}
                  />
                  <Text style={{marginLeft:20,
                              color:theme==""?focused?"#27ae60":"black":focused?"#27ae60":"white",
                              fontWeight:focused?"bold":null,
                              fontSize:18,
                              marginTop:10,}}>
                                FAQ</Text>
                </View>)
            }
          }}
        />
      </Drawer.Navigator>
  )
}

const DrawerOptions = ({drawer_name,drawer_image}) =>{
  return{
      drawerLabel:()=>null,
      drawerItemStyle:{backgroundColor:"transparent"},
      drawerIcon:({focused})=>{
        return(
          <View style={{
            flexDirection:"row",
            width:"100%",
            height:40,
            borderRadius:10,
            backgroundColor:focused?"transparent":"transparent",}}>
            <Image
              source={require("./assets/icons/settings.png")}
              style={{
                height:1000,
                width:200,
                tintColor:focused?"green":"black",
                marginTop:10,
              }}
            />
            <Text style={{marginLeft:20,
                              color:focused?"green":"#27ae60",
                              fontWeight:focused?"bold":null,
                              fontSize:18,
                              marginTop:10,}}>
                          {drawer_name}</Text>
          </View>)
      }
    }
}

/*

{login_data.loggedIn==false?<Drawer.Screen
          name="Login"
          component={ProfileScreen}
          options={{
            drawerLabel:()=>null,
            drawerItemStyle:{backgroundColor:"transparent"},
            
            drawerIcon:({focused})=>{
              return(
                <View style={{
                  flexDirection:"row",
                  width:"100%",
                  height:"100%",
                  borderRadius:10,
                  backgroundColor:focused?"transparent":"transparent",
                  }}>
                    
                  <Image
                    source={require("./assets/icons/logout.png")}
                    style={{
                      height:20,
                      width:20,
                      tintColor:focused?"green":"black",
                      marginTop:10,
                    }}
                  />
                  <Text style={{marginLeft:20,
                              color:focused?"green":"black",
                              fontSize:18,
                              marginTop:10,}}>
                                Login</Text>
                </View>)
            }
          }}
        />:<></>}

*/
export default Drawers;