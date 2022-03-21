import { StackActions } from "@react-navigation/native";
import React,{useState,useEffect} from "react";
import {
    View,
    Text,
    Alert,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
    SafeAreaView,
} from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IsLoadingComponent from "../components/IsLoadingComponent";
import ShowMoreScreen from "./ProductMoreScreen";
const Stack = createNativeStackNavigator();
const NotificationScreenA = ({navigation})=>{
    const [isloading,setisloading] = useState(true);
    return(
        <SafeAreaView>
            <HeaderComponent navigation={navigation}/>
            {isloading==true?
                <IsLoadingComponent/>:
                <View>
                    <Text>Hi the product you searched last week is now available, take a look.</Text>
                    <Text>Their is a new product in market, have a look.</Text>
                    <Text>New television HD now available, check here.</Text>
                </View>}
        </SafeAreaView>
    )
}

const NotificationScreen = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Notification"
                component = {NotificationScreenA}
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen
                name="Show More"
                component = {ShowMoreScreen}
                options={{
                    headerShown:false,
                }}
            />
        </Stack.Navigator>
    )
}
export default NotificationScreen;