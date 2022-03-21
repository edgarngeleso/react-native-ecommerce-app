import React,{useState,useEffect} from "react";
import {
    View,
    Text,
    Dimensions,
} from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HeaderComponent from "./HeaderComponent";
import SearchIcon from "./SearchIcon";
import DUMMYDATA from "../constants/DUMMYDATA";

const Tab = createMaterialTopTabNavigator();

const CustomScreen = ({navigation,route})=>{
    //fetch all products
    const fetch_data = ()=>{
        const url = "https://dreamrise.000webhostapp.com/api/api.php";
        const formdata = new FormData();
        formdata.append("products",route.name);
        fetch(url,{
            method:"POST",
            body:formdata
        }).
        then(response=>response.json()).
        then(data=>{
            setproducts({data:data});
            setisLoading(false);
        }).
        catch(error=>{
            Alert.alert("Error","Unable to fetch products",[
                {text:"Try again",onPress:()=>{}},
                {text:"cancel",onPress:()=>{} }
            ])
        })
    }
    
    useEffect(()=>{
        //fetch_data();
    },[])

    console.log(route.name);
    return(
        <View >
            <HeaderComponent navigation={navigation}/>
            <SearchIcon navigation={navigation}/>
            <View style={{backgroundColor:"red",marginTop:60}}>
            <Text>
                Custom component for {route.name}
            </Text>
            </View>
            
        </View>
    )
}


function TopTabsComponent() {
  return (
    <Tab.Navigator
    tabBarPosition="top"
    initialLayout = {{ width: Dimensions.get('window').width }}
    style={{
        marginTop:0,
        borderWidth:0
    }}
        screenOptions={{
        tabBarLabelStyle: { fontSize: 11 },
        tabBarItemStyle: { width: 100, height:"100%",borderRadius:10 },
        tabBarStyle: { backgroundColor: 'white', width:400, marginTop:110, position:"absolute", },
        tabBarActiveTintColor:"green",
        tabBarScrollEnabled:true,
        tabBarBounces:true,
        lazy:true,
        lazyPreloadDistance:3,
        tabBarInactiveTintColor:"black",
        tabBarIndicator:()=>null,
        
      }}
    >
        {DUMMYDATA.map(item=>{
            return(
                <Tab.Screen name={item.category} component={CustomScreen} />
            )
        })}  
    </Tab.Navigator>
  );
}

const TopTabss = ()=>{
    return(
        <View>
            <TopTabsComponent/>
        </View>
    )
}

export default TopTabsComponent;