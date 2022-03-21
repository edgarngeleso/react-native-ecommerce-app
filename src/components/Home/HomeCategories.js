import React,{useState,useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Button,
    FlatList,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    Alert,
    Modal,
    StatusBar,
    Dimensions,
} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from "react-redux";
import SplashScreen from 'react-native-splash-screen';
import ShowMoreScreen from "../../screens/ProductMoreScreen";
import SearchScreen from "../../screens/SearchScreen";
import APPSETTINGS from "../../constants/APPSETTINGS";
import ProductsScreen from "../../screens/ProductsScreen";
import HeaderComponent from "../HeaderComponent";
import SearchIcon from "../SearchIcon";
import CategoryScreen from "../../screens/CategoryScreen";
import NotificationScreen from "../../screens/NotificationScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import PurchaseScreen from "../../screens/PurchaseScreen";
import SignInScreen from "../../screens/SignInScreen";
import SignUpScreen from "../../screens/SignUpScreen";
//components
import HotDataComponent from "./HotDataComponenet";
import HomeData from "./HomeData";

//trial data
import DUMMYDATA from "../../constants/DUMMYDATA";
import TopTabs from "../TopBarComponent";
import IsLoadingComponent from "../IsLoadingComponent";
import ErrorComponent from "../ErrorComponent";


const Stack = createNativeStackNavigator();

const HomeAllData = ({navigation,route})=>{
    //console.log(navigation.getState().routeNames=="profile",route.name)
    const [ismodalopen,setismodalopen] = useState(false);
    const [isList,setisList] = useState("list");
    const [list_grid,setlist_grid] = useState({img:require("../../assets/icons/list.png"),});
    const [err,seterror] = useState({state:false,message:"",});

    //categories info
    const not_loaded = [1,2,3,4,5,6];
    const [c_data,setCData] = useState([]);
   
    const [loading,setloading] = useState(true);
    const initialLoad = ()=>{
        const url = "https://dreamrise.000webhostapp.com/api/api.php?categories=all";
        fetch(url).
        then(response=>response.json()).
        then(data=>{
            setCData(data);
            setloading(false);
            seterror({...err,state:false,});
            }).
            catch(error=>{
                seterror({state:true,
                message:error.message})
            })

    }
    
    const reload = ()=>{
        setloading(true);
        seterror({...err,state:false});
        initialLoad();
        }
        
    useEffect(()=>{initialLoad();},[]);

    

    
    /*let app_width = Dimensions.get("window").width;
    useEffect(()=>{
        if(app_width > Dimensions.get("screen").width-48){
            setlist_grid({img:require("../../assets/icons/grid.png")});
            setisList("grid");
        }
        console.log(app_width>Dimensions.get("screen").width);
    },[Dimensions.get("window").width]);*/

    
    //toggle list and grid display
    const toggleListGrid = ()=>{
        if(isList == "list"){
            setlist_grid({img:require("../../assets/icons/grid.png")});
            setisList("grid");
        }else if(isList == "grid"){
            setlist_grid({img:require("../../assets/icons/list.png")})
            setisList("list");
        }
     }
    
    //refresh data
    const [refreshing,Setrefreshing] = useState(false);
    const onrefresh = ()=>{
        Setrefreshing(true);
        setloading(true);
        seterror({...err,state:false});
        initialLoad();
        Setrefreshing(false); 
    }
    
    const toggle_modal = ()=>{
        ismodalopen==true?setismodalopen(false):setismodalopen(true);
    }

    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        app_theme = APPSETTINGS.colors.dark;
    }

   //update bottom tabs display
    const bottomTabsState = useSelector(state=>state.Reducer.BottomTabsDisplayed);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(
        {
            type:"TOGGLE_BOTTOM_TABS",
            payload:true
        })
    },[])

    const HideBottomTabs = ()=>{
        dispatch(
            {
                type:"TOGGLE_BOTTOM_TABS",
                payload:false
            })
    }

    const cartItems = useSelector(state=>state.Reducer.selectedItems.items);
    return(
        <View style={{
            backgroundColor:app_theme.app_primary,
            height:"100%",
            width:"100%",
            zIndex:200,}}
            collapsable = {false}
            >

            <SafeAreaView >
                <HeaderComponent navigation={navigation}/>
                <SearchIcon navigation={navigation}/>
                {err.state == true?<ErrorComponent error={err.message}>
                        <TouchableOpacity 
                            activeOpacity={0.8}
                            onPress = {reload}
                            style={{width:"100%",
                                    justifyContent:"center",
                                    alignItems:"center",
                                    marginTop:10,}}
                        >
                            <Text style={{fontSize:20,
                                            color:app_theme.app_textColor_link}}>
                                Retry...
                            </Text>
                            
                        </TouchableOpacity>
                </ErrorComponent>:
                <ScrollView 

                    refreshControl={
                        <RefreshControl
                            refreshing = {refreshing}
                            onRefresh={onrefresh}
                        />
                    }
                    showsVerticalScrollIndicator = {false} 
                    style={{marginBottom:60,}}>
                    
                    {loading == true?<IsLoadingComponent>
                        <View style={{ flexDirection:"row",}}>
                            {not_loaded.map(item=>{
                                return(
                                        <View 
                                        key={item}
                                        style={{ backgroundColor:app_theme.app_box_backgroundColor,
                                                        height:40,
                                                        width:100,
                                                        marginTop:5,
                                                        marginLeft:10,
                                                        borderRadius:10}}>
                                        </View>
                                )
                            })}
                        </View>
                    </IsLoadingComponent>:<View><View>
                        <View><Text style={{fontSize:20,
                                        color:theme==""?"#27ae60":app_theme.app_textColor_primary,
                                        fontWeight:"bold",
                                        marginBottom:10,
                                        marginTop:10,
                                        marginLeft:5,}}>Categories</Text></View>
                        <View
                            style={{
                            flexWrap:"wrap",
                            flexDirection:"row",
                            //justifyContent:"space-between",
                            }}
                        >
                            {c_data/*DUMMYDATA*/.map((item,index)=>{
                                return(
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        key={index}
                                        style={{
                                            height:40,
                                            width:80,
                                            margin:5,
                                            borderRadius:10,
                                            marginBottom:10,
                                            alignItems:"center",
                                            justifyContent:"center",
                                        }}
                                        onPress={()=>{
                                            HideBottomTabs();
                                            navigation.navigate("Products category",{
                                            category:item.category_name
                                        })}}
                                    >
                                        <View style={{
                                            width:35,
                                            height:35,
                                            alignItems:"center",
                                            justifyContent:"center",
                                            borderRadius:15,
                                            backgroundColor:app_theme.app_box_backgroundColor,
                                            }}>
                                            <Image
                                                source={{uri:item.category_image}}
                                                style={{
                                                    width:"70%",
                                                    height:"70%",
                                                    tintColor:app_theme.app_image_tinColor
                                                }}
                                            />
                                        </View>
                                        
                                        <Text
                                            style={{
                                                fontSize:13,
                                                marginBottom:0,
                                                color:app_theme.app_textColor_primary
                                            }}
                                        >{item.category_name}s</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>

                    <View>
                        <Text style={{fontSize:20,
                                color:theme==""?"#27ae60":app_theme.app_textColor_primary,
                                fontWeight:"bold",
                                marginBottom:10,
                                marginTop:10,
                                marginLeft:5,}}>Special deals</Text>
                    </View>
                    </View>}
                    {/* display home hot data component*/}
                    <HotDataComponent navigation={navigation}/>
                    
                    <View style={{flexDirection:"row",
                                justifyContent:"space-between",
                                marginTop:15,
                                marginBottom:10,
                                backgroundColor:app_theme.app_box_backgroundColor,
                                height:40,
                                width:"98%",
                                marginLeft:"1%",
                                borderRadius:5}}>
                        <Text style={{fontSize:20,
                                color:theme==""?"#27ae60":app_theme.app_textColor_primary,
                                fontWeight:"bold",
                                marginTop:8,
                                marginLeft:5,}}>Most Popular</Text>

                        <TouchableOpacity
                            onPress={toggleListGrid}
                        >
                        <Image
                            source={list_grid.img}
                            style={{
                                width:40,
                                height:"100%",
                                tintColor:app_theme.app_image_tinColor,
                                marginRight:10,
                            }}
                        />
                        </TouchableOpacity>
                    </View>
                    {/* display home data component*/}
                    <HomeData isList={isList} navigation={navigation}/>

                </ScrollView>}
            </SafeAreaView>
        </View>
    )
}

const HomeCategories = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="home all"
                component = {HomeAllData}
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
                name="Products category"
                component = {CategoryScreen}
                options={{
                    headerShown:false,
                }}
            />

            <Stack.Screen
                name="Notification"
                component = {NotificationScreen}
                options={{
                    headerShown:false,
                }}
            />

            <Stack.Screen
                name="profile"
                component = {ProfileScreen}
                options={{
                    headerShown:false,
                }}
            />

            <Stack.Screen
                name="Purchase"
                component = {PurchaseScreen}
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

const styles = StyleSheet.create({
    view_style:{
        flex:1,
        flexDirection:"column",
        width:280,
        height:170,
        borderRadius:10,
        marginLeft:5,
    },
    image_style:{
        width:"100%",
        height:"100%",
        borderRadius:10
    },
    text_style:{
        position:"absolute",
        marginTop:90,
        color:"green",
        fontSize:18,
    },
    button_style:{
        position:"absolute",
        alignItems:"center",
        justifyContent:"center",
        height:40,
        width:"50%",
        backgroundColor:"white",
        marginTop:130,
        marginLeft:"50%",
        borderBottomRightRadius:10,
        borderTopLeftRadius:10,
    },
    modal_text_style:{
        fontSize:20,
    },
    modal_touchable_style:{
        marginTop:10,
    }
})
export default HomeCategories;