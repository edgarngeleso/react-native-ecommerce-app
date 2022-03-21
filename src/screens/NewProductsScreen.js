import React,{useState,useEffect} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList,
    SafeAreaView,
    Alert,
    ActivityIndicator,
    ScrollView
} from "react-native";
import APPSETTINGS from "../constants/APPSETTINGS";
import HeaderComponent from "../components/HeaderComponent";
import SearchIcon from "../components/SearchIcon";
import ShowMoreScreen from "./ProductMoreScreen";
import SearchScreen from "./SearchScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IsLoadingComponent from "../components/IsLoadingComponent";
import ErrorComponent from "../components/ErrorComponent";
import { useSelector } from "react-redux";
import ProductCardComponent from "../components/ProductCardComponent";
const Stack = createNativeStackNavigator();
const NewProducts = ({navigation})=>{
    //fetch recently added data
    const [newdata,setnewdata] = useState({data:""});
    const [loading,setisLoading] = useState(true);
    const [err,seterr] = useState({state:false,
        message:"",});
    const fetch_data = ()=>{
        const url = "https://dreamrise.000webhostapp.com/api/api.php";
        const formdata = new FormData();
        formdata.append("new_products","");
        fetch(url,{
            method:"POST",
            body:formdata
        }).
        then(response=>response.json()).
        then(data=>{
            setnewdata({data:data});
            setisLoading(false);
        }).
        catch(error=>{
            seterr({state:true,
                message:error.message})
        })
    }

    const reload = ()=>{
        setisLoading(true);
        seterr({...err,state:false});
        fetch_data();
    }
    useEffect(()=>{reload()},[])

    const products = [{id:1},{id:2},{id:3},{id:4},{id:5}];


    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }else{
        app_theme = APPSETTINGS.colors.default;
    }

    return(
        <SafeAreaView style={{
            backgroundColor:app_theme.app_primary,
            height:"100%",
            width:"100%"
        }}>
            <HeaderComponent navigation={navigation}/>
            <SearchIcon navigation={navigation}/>
            {err.state == true?<ErrorComponent error={err.message}>
                        <TouchableOpacity 
                            activeOpacity={0.8}
                            onPress = {reload}
                            style={{width:"100%",justifyContent:"center",alignItems:"center",marginTop:10,}}
                        >
                            <Text style={{fontSize:20,color:"green"}}>
                                Retry...
                            </Text>
                            
                        </TouchableOpacity>

                </ErrorComponent>:<View>
            {loading==true?<IsLoadingComponent/>:
                    <View>
                        <Text style={{fontSize:20,
                                color:"green",
                                marginLeft:5}}>New</Text>
                        <ScrollView 
                            style={{
                                marginTop:0,
                                marginBottom:145,
                                }}>
                            <View style={{
                                flexWrap:"wrap",
                                flexDirection:"row",
                                justifyContent:"space-between",
                                }}>
                                <ProductCardComponent 
                                    products={newdata.data} 
                                    isList={"list"} 
                                    navigation={navigation}>
                                </ProductCardComponent>
                            </View>
                        </ScrollView>
                        </View>}
            </View>}
        </SafeAreaView>
    )
}

const NewProductsScreen = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="All products"
                component = {NewProducts}
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

            <Stack.Screen
                name="Search"
                component = {SearchScreen}
                options={{
                    headerShown:false,
                }}
            />
        </Stack.Navigator>
    )
}

export default NewProductsScreen;