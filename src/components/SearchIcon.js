import React,{useState,useEffect} from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Modal,
    StyleSheet,
    ScrollView,
    Keyboard
} from "react-native";
import APPSETTINGS from "../constants/APPSETTINGS";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from "react-redux";
import SearchScreen from "../screens/SearchScreen";
const Stack = createNativeStackNavigator();

//navigate to search screen
const SearchIcon = ({navigation,route,children})=>{
    const [ismodalopen,setismodalopen] = useState(false);
    const [isloading,setisLoading] = useState(true);
    const [searchData, setsearchData] = useState({data:""});
    const [searchText, setsearchText] = useState("");
    const search_url = "https://dreamrise.000webhostapp.com/api/api.php";

    const input_text = (text)=>{
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
        }  
    }

    const search_btn = ()=>{
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
        }   
    }

    useEffect(()=>{
       // search_btn();
    },[])

    const dispatch = useDispatch();
    const HideBottomTabs = (isVisible)=>{
        dispatch(
            {
                type:"TOGGLE_BOTTOM_TABS",
                payload:isVisible
            })
    }

    const open_modal = ()=>{
        setismodalopen(true);
    }

    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }
    
    return(
        <View style={{
            flexDirection:"column",
            marginTop:0,
            height:50,
            backgroundColor:app_theme.app_header_backgroundColor,
            borderBottomRightRadius:5,
            borderBottomLeftRadius:5}}
            collapsable={false}>
            
            <Modal 
                animationType="slide"
                visible={ismodalopen}
                onRequestClose = {()=>setismodalopen(false)}
                >
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
                                onPress={()=>setismodalopen(false)}
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
                        underlineColorAndroid = "transparent"
                        placeholder="search products...."
                        style={{...styles.input_style,
                            width:"88%",
                            borderColor:app_theme.app_textInput_borderColor,}}
                        onChangeText = {input_text}
                        autoFocus
                        />
                        
                        <TouchableOpacity
                            onPress={search_btn}
                            style={{
                                position:"absolute",
                                height:30,
                                marginLeft:"69%",
                                alignItems:"center",
                                justifyContent:"center"
                            }}
                        >
                            <Image
                                source={require("../assets/icons/search.png")}
                                style={{
                                width:30,
                                height:"70%",
                                borderRadius:5,
                                marginTop:5,
                                tintColor:"#27ae60",
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    
                </View>

                {isloading == true?<Text></Text>:<ScrollView style={{
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
                                    >{item.product_name}</Text>:
                                    <TouchableOpacity
                                        onPress={()=>{navigation.navigate("Show More",{
                                            id:item.pid,
                                            name:item.product_name,
                                            price:item.product_price,
                                            image:item.product_image,
                                            category:item.product_category,
                                            rating:item.product_rating,
                                            description:item.product_description
                                        })
                                        setismodalopen(false);
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
                
                

            </Modal>

            <TouchableOpacity 
                activeOpacity={0.8}
                onPress = {()=>{
                    HideBottomTabs();
                    Keyboard.dismiss();
                    navigation.navigate("Search",{
                        search:"search"
                    })
                    //setismodalopen(true);
                }}
                style={{
                    width:"100%",
                }}>
                <TouchableOpacity
                style={{
                    position:"absolute",
                    height:30,
                    marginTop:5,
                    marginLeft:"2%",
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
                <TextInput
                underlineColorAndroid = "transparent"
                placeholder="Search products...."
                placeholderTextColor={app_theme.app_textColor_primary}
                style={{...styles.input_style,
                    borderColor:app_theme.app_textInput_borderColor,
                    color:"black",
                    width:"98%",
                    marginLeft:"1%",}}
                onChangeText = {input_text}
                editable={false}
                />
            </TouchableOpacity>
            
        </View>
    )
}
const styles = StyleSheet.create({
    input_style:{
        borderWidth:2,
        height:37,
        borderRadius:10,
        fontSize:17,
        paddingBottom:2,
        paddingLeft:40,
    }
})
export default SearchIcon;