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
} from "react-native";
import IsLoadingComponent from "../IsLoadingComponent";
import { useSelector, useDispatch } from "react-redux";
import APPSETTINGS from "../../constants/APPSETTINGS";
import DUMMYDATA from "../../constants/DUMMYDATA";
import ProductCardComponent from "../ProductCardComponent";

const HomeData = ({isList,navigation})=>{
    const [data,setData] = useState(null);
    const [isLoading,setisLoading] = useState(true);
    const url = "https://dreamrise.000webhostapp.com/api/api.php?home_products=all";

    const fetch_data = ()=>{
        fetch(url).
        then(response=>response.json()).
        then(data=>{
            setisLoading(false);
            setData(data);
        }).
        catch(error=>{
            setisLoading(false);
        })
    }
   useEffect(()=>{fetch_data()},[]);

    const key_extractor_fun = (item)=>{
        return item.category;
    }

    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }

    const dispatch = useDispatch();
    const HideBottomTabs = ()=>{
        dispatch(
            {
                type:"TOGGLE_BOTTOM_TABS",
                payload:false
            })
    }

    const cartItems = useSelector(state=>state.Reducer.selectedItems.items);
    const render_item_fun = ({item,index})=>{
        return(
            <View collapsable={false}> 
                <View>
                    <View 
                        style={{
                            flexDirection:"row",
                            justifyContent:"space-between"}}>
                        <Text style={{fontSize:20,
                                fontWeight:"bold",
                                color:theme==""?"#27ae60":app_theme.app_textColor_primary,
                                marginLeft:10,}}>{item.category}</Text>
                        <TouchableOpacity
                            onPress={()=>{
                                HideBottomTabs();
                                navigation.navigate("Products category",{
                                category:item.category  
                            })}}
                        >
                            <Text style={{fontSize:20,
                                fontWeight:"bold",
                                color:theme==""?"#27ae60":app_theme.app_textColor_primary,
                                marginRight:10,}}>
                                View more
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,
                                flexDirection:isList=="list"?"column":"row",
                                justifyContent:isList=="list"?"space-around":"space-between",
                                }}>
                    <ProductCardComponent 
                        products={item.items} 
                        isList={isList} 
                        navigation={navigation}>
                    </ProductCardComponent>
                    </View>
                </View>
            </View>
        )
    }

    return(<View>
        {isLoading == true?<IsLoadingComponent/>:<FlatList
        data = {data/*DUMMYDATA*/}
        keyExtractor={key_extractor_fun}
        renderItem = {render_item_fun}
        style={{
            marginBottom:45,
        }}
        showVerticalScrollBar = {false}
    />}
    </View>
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
        backgroundColor:"white",
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
    }
})
export default HomeData;