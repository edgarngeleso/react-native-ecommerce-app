import React,{useState,useEffect} from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Button,
} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabs from "../navigation/HomeTabs";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
import APPSETTINGS from "../constants/APPSETTINGS";

const Dashboard = ({navigation,route})=>{
    //check for network connectivity first 
    
    const [connection,setConnection] = useState(true);

    const url = "https://jsonplaceholder.typicode.com/posts";

    /*useEffect(()=>{
        async function isNetworkAvailable() {
            const response = await NetInfo.fetch();
            if(response.isConnected == 1){
                if(response.isInternetReachable == 1){
                    setConnection(true);
                    fetch(url)
                    .then(response=>response.json())
                    .then(data=>{
                        setLoading(false);
                        setData({data:data});})
                    .catch(error=>{
                        Alert.alert("error",error.message);
                    setLoading(false);})
                }else{
                    Alert.alert("No internet access!");
                }
            }else{
                setConnection(false);
            }
        }
        isNetworkAvailable();
    },[]);*/

    return(
        <Stack.Navigator>
                <Stack.Screen
                name="Home screen"
                component = {HomeTabs}
                
                options={{
                    headerShown:false,
                }}
                /> 
        </Stack.Navigator>
    )
}
export default Dashboard;