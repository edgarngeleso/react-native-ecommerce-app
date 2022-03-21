import React,{useState,useEffect} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
    Alert,
    BackHandler
} from "react-native";
import APPSETTINGS from "../constants/APPSETTINGS";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector,useDispatch } from "react-redux";
import ProgressBarComponent from "../components/ProgressBarComponent";
import ShowMoreScreen from "./ProductMoreScreen";
const Stack = createNativeStackNavigator();

const SearchScreenComponent = ({navigation})=>{
    const [isSuggestionOpen,setisSuggestionOpen] = useState(false);
    const [isloading,setisLoading] = useState(true);
    const [searchData, setsearchData] = useState({data:""});
    const [searchText, setsearchText] = useState("");
    const search_url = "https://dreamrise.000webhostapp.com/api/api.php";

    const input_text = (text)=>{
        setisSuggestionOpen(true);
        setsearchText(text);
        if(text.length >= 3){
            let formdata = new FormData();
            formdata.append("search",searchText);
            fetch(search_url,{
                method:"POST",
                body:formdata
            }).
            then((response)=>response.json()).
            then(data=>{
                setsearchData({data:data});
                setisLoading(false);
            }).
            catch(e=>{
                console.log(e);
            })
        }else{
            setsearchData({data:""})
        }     
    }

    const search_btn = ()=>{
        setisSuggestionOpen(false);
        //run api request
        if(searchText.length >= 3){
            let formdata = new FormData();
            formdata.append("search",searchText);
            fetch(search_url,{
                method:"POST",
                body:formdata
            }).
            then((response)=>response.json()).
            then(data=>{
                setsearchData({data:data});
                setisLoading(false);
            }).
            catch(e=>{
                console.log(e);
            })
        }else{
            setsearchData({data:""})
        }   
    }

    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        app_theme = APPSETTINGS.colors.dark;
    }


    const bottomTabsState = useSelector(state=>state.Reducer.BottomTabsDisplayed);
    const dispatch = useDispatch();
    const ToggleBottomTabs = (isVisible)=>{
        dispatch(
            {
                type:"TOGGLE_BOTTOM_TABS",
                payload:isVisible
            })
    }

    useEffect(()=>{
        ToggleBottomTabs(false);
    },[])

    BackHandler.addEventListener("hardwareBackPress",()=>{
        ToggleBottomTabs(true);
    })

    return(
        <View style={{
            width:"100%",
            height:"100%",
            backgroundColor:app_theme.app_primary,
        }}>
            <View style={{
                width:"100%",
                backgroundColor:app_theme.app_header_backgroundColor,
                flexDirection:"row",
                borderBottomRightRadius:10,
                borderBottomLeftRadius:10,
                }}>
                    <View style={{
                        width:"10%",
                        height:50,
                        
                        }}>
                        <TouchableOpacity
                            activeOpacity={0.8} 
                            style={{
                                height:40,
                                width:40,
                                margin:2,
                                borderRadius:20,
                                backgroundColor:"white",
                                alignItems:"center",
                                justifyContent:"center"
                                }}
                                onPress={()=>{
                                    navigation.goBack();
                                }}
                                >
                                    <Image 
                                        source={require("../assets/icons/back.png")}
                                        style={{
                                            height:30,
                                            width:30,
                                        }}
                                    />
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        width:"100%",
                        margin:5,
                        height:40
                    }}>
                        <TextInput
                        accessibilityHint="Search"
                        underlineColorAndroid = "transparent"
                        placeholder="Search products...."
                        placeholderTextColor={app_theme.app_textColor_primary}
                        style={{...styles.input_style,
                            width:"88%",
                            borderColor:app_theme.app_textInput_borderColor,
                            color:app_theme.app_textColor_primary}}
                        onChangeText = {input_text}
                        autoFocus
                        />
                        
                        <TouchableOpacity
                            onPress={search_btn}
                            style={{
                                position:"absolute",
                                height:30,
                                marginTop:5,
                                marginLeft:"69%",
                                alignItems:"center",
                                justifyContent:"center"
                            }}
                        >
                            <Image
                                source={require("../assets/icons/search.png")}
                                style={{
                                width:25,
                                height:"100%",
                                borderRadius:5,
                                tintColor:app_theme.app_image_tinColor,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            {/*suggestions display*/}
            <View style={{
                        width:"98%",
                        height:"100%",
                        borderBottomLeftRadius:5,
                        borderBottomRightRadius:5,
                        backgroundColor:app_theme.app_box_backgroundColor,
                        display:searchText.length>=3?"flex":"none",
                        zIndex:20,
                    }}>
                        {searchData.data == ""?<Text></Text>:<ScrollView contentContainerStyle={{
                            width:"100%",
                            height:"100%"
                        }}>
                            {searchData.data.map(item=>{
                                return(
                                    <View key={item.pid}
                                        style={{
                                            width:"98%",
                                            margin:"1%",
                                            borderRadius:5,
                                            backgroundColor:app_theme.app_box_backgroundColor,
                                        }}
                                    >
                                        {item.pid == 0?<Text
                                            style={{
                                                fontSize:20,
                                                color:"green",
                                                fontWeight:"bold",
                                            }}
                                        >No results match your search. Change some words and try again.</Text>:
                                        <TouchableOpacity
                                            onPress={()=>{navigation.navigate("more",{
                                                id:item.pid,
                                                name:item.product_name,
                                                price:item.product_price,
                                                image:item.product_image,
                                                category:item.product_category,
                                                rating:item.product_rating,
                                                description:item.product_description
                                            })
                                            setsearchText("")}}
                                            style={{flexDirection:"row",
                                                    marginTop:15,
                                                    width:"98%",
                                                    margin:"1%",
                                                    borderRadius:5}}
                                            >
                                            <Image
                                                source={{uri:item.product_image}}
                                                resizeMode = "cover"
                                                style={{
                                                width:50,
                                                height:50,
                                                borderRadius:5,
                                                }}
                                            />
                                            <Text style={{
                                                color:app_theme.app_textColor_primary,
                                            }}>{item.product_name}</Text>
                                            <Text style={{
                                                color:app_theme.app_textColor_primary,
                                            }}>Ksh.{item.product_price}</Text>
                                        </TouchableOpacity>}
                                    </View>
                                    
                                )
                            })}
                        </ScrollView>}
                    </View>
        
        <ScrollView >
            <View>
                <Text style={{
                    color:app_theme.app_textColor_primary,
                }}>
                    
                </Text>
            </View>
            
        </ScrollView>

    </View>
    )
}

const SearchScreen = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen
                    name="search"
                    component = {SearchScreenComponent}
                    options={{
                        headerShown:false,
                    }}
            />
            <Stack.Screen
                    name="more"
                    component = {ShowMoreScreen}
                    options={{
                        headerShown:false,
                    }}
            />
        </Stack.Navigator>
    ) 
}

const styles = StyleSheet.create({
    input_style:{
        borderBottomWidth:2,
        width:"89%",
        marginLeft:"1%",
        height:35,
        borderRadius:5,
        paddingBottom:2,
    }
})
export default SearchScreen;