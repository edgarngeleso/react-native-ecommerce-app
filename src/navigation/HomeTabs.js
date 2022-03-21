import React,{useState,useEffect,useContext} from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Dimensions
} from "react-native";
import { StackActions, NavigationActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import HomeCategories from "../components/Home/HomeCategories";
import CartScreen from "../screens/CartScreen";
import HomeLikesScreen from "../screens/FavoritesScreen";
import ProductsScreen from "../screens/ProductsScreen";
import NotificationScreen from "../screens/NotificationScreen";
import { Context } from "../screens/ProductMoreScreen";
import { GlobalState } from "../context/GlobalState";
import TopTabs from "../components/TopBarComponent";
import SettingsScreen from "../screens/SettingsScreen";
import APPSETTINGS from "../constants/APPSETTINGS";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const HomeTabs = ({navigation,route})=>{
    const[index,setindex] = useState(true);
    let isVisible = true;
    let currentRoute = "";
    //console.log(navigation.getState().routes[0])
    if(navigation.getState().routes[0].state == undefined){
        //setindex(true);
        isVisible = true;
    }else{
        //console.log(navigation.getState().routes[0].state.routes[0].state)
      /* if(navigation.getState().routes[0].state.routes[0].state.index){
            console.log(navigation.getState().routes[0].state.routes[0].state.index,navigation.getState().routes[0].state.routes[1].state.index)
            //setindex(false);
            isVisible = false;
        }*/
    }

    const theme = useSelector(state=>state.Reducer.selectedTheme);
    const isOpened = useSelector(state=>state.Reducer.BottomTabsDisplayed);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }else{
        app_theme = APPSETTINGS.colors.default;
    }

    const [notifications,setnotifications] = useState({state:true,count:0})
    return(
        <Tab.Navigator>
            <Tab.Screen
               name="Dashboard" 
               component = {HomeCategories}
               options={{
                    tabBarStyle:{backgroundColor:app_theme.app_bottomTabs_backgroundColor,
                                display:isOpened==true?"flex":"none",},
                    tabBarHideOnKeyboard:true,
                    headerShown:false,
                    tabBarLabel:()=>null,
                    tabBarIcon:({focused})=>{
                        return (
                            <View style={{alignItems:"center",justifyContent:"center",}}>
                                <Image 
                                source={require("../assets/icons/home.png")}
                                resizeMode = "contain"
                                style={{
                                    width:25,
                                    height:25,
                                    tintColor:theme == ""?focused?"#27ae60":"#0e0e0e":focused?"#27ae60":"#ffffff",
                                }}/>
                              <Text style={{
                                    color:theme == ""?focused?"#27ae60":"#0e0e0e":focused?"#27ae60":"#ffffff",
                                    fontSize:15,
                                    flexWrap:"wrap",
                                    width:"100%",
                               }}>Home</Text>
                            </View>
                        )},
                    
                }}
            />

        <Tab.Screen
               name="Products" 
               component = {ProductsScreen}
               options={{
                tabBarHideOnKeyboard:true,
                tabBarStyle:{backgroundColor:app_theme.app_bottomTabs_backgroundColor,
                    display:isOpened==true?"flex":"none",},
                headerShown:false,
                tabBarLabel:()=>null,
                    tabBarIcon:({focused})=>{
                        return (
                            <View style={{alignItems:"center",justifyContent:"center",}}>
                                <Image 
                                source={require("../assets/icons/products.png")}
                                resizeMode = "contain"
                                style={{
                                    width:25,
                                    height:25,
                                    tintColor:theme == ""?focused?"#27ae60":"#0e0e0e":focused?"#27ae60":"#ffffff",
                                }}/>
                              <Text style={{
                                    color:theme == ""?focused?"#27ae60":"#0e0e0e":focused?"#27ae60":"#ffffff",
                                    fontSize:15,
                                    width:"100%",
                               }}>products</Text>
                            </View>
                        )
                    }
                }}
            />
            

            <Tab.Screen
               name="Notification" 
               component = {NotificationScreen}
               options={{  
                tabBarHideOnKeyboard:true,
                tabBarStyle:{backgroundColor:app_theme.app_bottomTabs_backgroundColor,
                    display:isOpened==true?"flex":"none",},
                tabBarBadge:notifications.count,
                headerShown:false,
                tabBarLabel:()=>null,
                    tabBarIcon:({focused})=>{
                        return (
                            <View style={{alignItems:"center",justifyContent:"center"}}>
                                <Image 
                                source={require("../assets/icons/notification.png")}
                                resizeMode = "contain"
                                style={{
                                    width:25,
                                    height:25,
                                    tintColor:theme == ""?focused?"#27ae60":"#0e0e0e":focused?"#27ae60":"#ffffff",
                                }}/>
                                {/*notifications.state==true?<View 
                                    style={{
                                        position:"absolute",
                                        height:20,
                                        width:15,
                                        borderRadius:7.5,
                                        backgroundColor:"red",
                                        alignItems:"center",
                                        justifyContent:"flex-end",
                                        marginLeft:-100,
                                    }}>
                                        
                                    <Text style={{color:"white",fontSize:15}}>
                                       {1}
                                    </Text>
                                    </View>:<></>*/}
                                    
                                
                              <Text style={{
                                    color:theme == ""?focused?"#27ae60":"#0e0e0e":focused?"#27ae60":"#ffffff",
                                    fontSize:15,
                                    width:"100%",
                               }}>Notifications</Text>
                            </View>
                        )
                    }
                }}
            />

            

            <Tab.Screen name="cart" 
                component={CartScreen}
                options={{
                    tabBarHideOnKeyboard:true,
                    tabBarStyle:{backgroundColor:app_theme.app_bottomTabs_backgroundColor,
                                display:isOpened==true?"flex":"none",},
                    headerShown:false,
                    tabBarLabel:()=>null,
                    tabBarIcon:({focused})=>{
                        /*redux usage*/
                        //console.log(navigation.getParent().getState())
                        const items = useSelector((state)=>state.Reducer.selectedItems);
                        let total = 0;
                        if(items.items !== ""){
                            total = items.items.map(item=>Number(item.quantity)).reduce((prev,curr)=>prev+curr,0);
                        }
                        /***/
                        
                        return (
                            <View style={{
                                alignItems:"center",
                                justifyContent:"center",
                                top:-20,
                                shadowColor:"grey",
                                backgroundColor:app_theme.app_bottomTabs_backgroundColor,
                                shadowOffset:{
                                    width:0,
                                    height:10,
                                },
                                shadowopacity:1,
                                shadowradius:5,
                                elevation:5,
                                width:70,
                                height:70,
                                borderRadius:35,
                                }}>
                              <Image 
                                source={require("../assets/icons/cart.png")}
                                resizeMode = "contain"
                                style={{
                                    width:40,
                                    height:40,
                                    tintColor:theme == ""?focused?"#27ae60":"#0e0e0e":focused?"#27ae60":"#ffffff",
                                    marginTop:10,
                                    marginLeft:0
                                }}/>
                                <View 
                                    style={{
                                        position:"absolute",
                                        height:20,
                                        width:15,
                                        borderRadius:7.5,
                                        backgroundColor:"red",
                                        alignItems:"center",
                                        justifyContent:"center",
                                    }}>
                                        
                                    <Text style={{color:"white",fontSize:15,}}>
                                       {total}
                                    </Text>
                                    
                                </View>
                              
                          </View>
                        )
                    }
                }}/>


        </Tab.Navigator>
    )
}

export default HomeTabs;