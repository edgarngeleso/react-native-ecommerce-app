import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    RefreshControl,
    Modal,
    ToastAndroid,
} from "react-native";
import APPSETTINGS from "../constants/APPSETTINGS";
import HeaderComponent from "../components/HeaderComponent";
import SearchIcon from "../components/SearchIcon";
import AnimationComponent from "../components/AnimationComponent";
import { useSelector } from "react-redux";
import ErrorComponent from "../components/ErrorComponent";
import IsLoadingComponent from "../components/IsLoadingComponent";
import SignInSignUpComponent from "../components/SignInSignUpComponent";
import ThreeDotsComponent from "../components/ThreeDotsComponent";

const FavoritesScreen = ({navigation})=>{
    const [error,seterror] = useState({state:false,error:""});
    const [loading,setloading] = useState(true);
    const [ismodalopen,setismodalopen] = useState(false);
    const [modalDataIndex,setmodalDataIndex] = useState(0)
    const [favoritesData,setfavoritesData] = useState(null);
    const [refreshing,Setrefreshing] = useState(false);
    let login_data = useSelector((state)=>state.Reducer.loginInfo);
    const url = "https://dreamrise.000webhostapp.com/api/api.php";
    const getFavorites = ()=>{
        if(login_data.loggedIn == false){
            return false;
        }

        let formdata = new FormData();
        formdata.append("get_favorites_by_userid",login_data.data.id);
        fetch(url,{
                method:"POST",
                body:formdata
        }).
        then(response=>response.json()).
        then(data=>{
            seterror({state:false,error:""});
            setloading(false);
            setfavoritesData(data);
            
        }).
        catch(e=>{
            setloading(false);
            seterror({state:true,error:e.message});
        })
    }

    useEffect(()=>{
        getFavorites();
    },[login_data])

    const removeFromFavorites = ()=>{
        setismodalopen(false);
        let formdata = new FormData();
        formdata.append("remove_favorites_by_id",favoritesData[modalDataIndex].likeid);
        fetch(url,{
            method:"POST",
            body:formdata
        }).
        then(response=>response.json()).
        then(data=>{
            if(data.error == false){
                ToastAndroid.show("Successfully removed from favorites.", ToastAndroid.LONG);
                getFavorites();
            }
        }).catch(e=>{
            console.log(e.message);
        })
    }
    //refresh data
    const onrefresh = ()=>{
        Setrefreshing(true);
        setloading(true);
        seterror({state:false,error:""});
        getFavorites();
        Setrefreshing(false); 
        }
    
    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }else{
        app_theme = APPSETTINGS.colors.default;
    }
    return(
        <View>
            {login_data.loggedIn == false?<SignInSignUpComponent navigation={navigation}/>:
            <View style={{
                width:"100%",
                height:"100%"
            }}>
                <View style={{height:45,
                            width:"100%",
                            flexDirection:"row",
                            justifyContent:"space-between",
                            backgroundColor:app_theme.app_header_backgroundColor,
                            borderBottomRightRadius:10,
                            borderBottomLeftRadius:10,
                            }}>
                    <View style={{height:45,
                            flexDirection:"row",
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
                                navigation.goBack();}}
                        >
                            <Image 
                                source={require("../assets/icons/back.png")}
                                style={{
                                    height:30,
                                    width:30,
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={{fontSize:25,fontWeight:"bold",
                                    color:app_theme.app_textColor_primary,
                                    margin:5}}>Favorites</Text>
                    </View>
                    
                    <TouchableOpacity 
                            onPress={()=>{
                                    setloading(true);
                                    seterror({state:false,error:""});
                                    getFavorites();
                            }}
                            style={{
                                width:30,
                                height:30,
                                borderRadius:10,
                                justifyContent:"center",
                                alignItems:"center",
                                backgroundColor:"green",
                                flexDirection:"row",
                                margin:5
                                    }}>
                                <Image
                                    source={require("../assets/icons/refresh.png")}
                                    style={{
                                        width:25,
                                        height:25,
                                    }}
                                />
                    </TouchableOpacity>
                </View>
                {error.state == true?
                    <ErrorComponent error={error.error}>

                        <TouchableOpacity 
                            activeOpacity={0.8}
                            onPress = {getFavorites}
                            style={{width:"100%",justifyContent:"center",alignItems:"center",marginTop:10,}}
                        >
                            <Text style={{fontSize:20,color:"green"}}>
                                Retry...
                            </Text>
                        </TouchableOpacity>
                    </ErrorComponent>:
                    loading==true?<IsLoadingComponent/>:
                    <ScrollView 
                        refreshControl={
                            <RefreshControl
                                refreshing = {refreshing}
                                onRefresh={onrefresh}
                            />
                        }
                        showsVerticalScrollIndicator = {false}
                        >
                        {favoritesData == null?<View>
                                <Text style={{textAlign:"center"}}>
                                    You haven't liked any product yet.
                                </Text>
                            </View>:<View>
                                <Text 
                                    style={{
                                        textAlign:"center",
                                        textDecorationLine:"underline",
                                        fontSize:20,
                                        fontWeight:"bold"
                                    }}>{favoritesData.length} product{favoritesData.length>1?"s":""} you have liked</Text>
                                    {favoritesData.map((favorite,index)=>{
                                    return(
                                        <View key={index}>
                                            <View 
                                                style={{flexDirection:"row",
                                                justifyContent:"space-between",
                                                width:"100%",
                                                margin:5,}} 
                                                key={index}>
                                                <TouchableOpacity 
                                                    style={{flexDirection:"row",
                                                    justifyContent:"space-between",
                                                    width:"80%",
                                                    margin:5,}}
                                                    onPress={()=>navigation.navigate("Show More",{
                                                        id:favorite.pid,
                                                        name:favorite.product_name,
                                                        price:favorite.product_price,
                                                        image:favorite.product_image,
                                                        rating:favorite.product_rating,
                                                        description:favorite.product_description
                                                    })}
                                                >
                                                    <Image source={{uri:favorite.product_image}}
                                                    style={{
                                                        height:100,
                                                        width:"40%",
                                                        borderRadius:10,
                                                    }}
                                                    resizeMode="cover"
                                                    />
                                                    <View style={{
                                                            height:100,
                                                            justifyContent:"center",
                                                            alignItems:"center",
                                                        }}>
                                                        <Text style={{fontSize:20,}}>Name:{favorite.product_name}</Text>
                                                        <Text style={{fontSize:20,}}>Price:{favorite.product_price}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                
                                                <TouchableOpacity 
                                                    style={{
                                                        width:40,
                                                        justifyContent:"center",
                                                        alignItems:"center",
                                                    }}

                                                    onPress={()=>{
                                                        setismodalopen(true);
                                                        setmodalDataIndex(index);
                                                    }}
                                                >
                                                    {/*<Image source={require("../assets/icons/dots.png")}
                                                        style={{
                                                            height:40,
                                                            width:40,
                                                            borderRadius:20,
                                                            backgroundColor:"white"
                                                        }}
                                                    />*/}
                                                    <ThreeDotsComponent 
                                                        isVertical={true} 
                                                        dotsColor={"black"} 
                                                        width={30} 
                                                        height={30}/>
                                                </TouchableOpacity>
                                            </View>
                                            <Seperator/>
                                        </View> 
                                    )
                                })}
                            </View>}
                    </ScrollView>}
            </View>}
            {favoritesData == null?<></>:
            <Modal
                transparent
                visible={ismodalopen}
                animationType="slide"
                onRequestClose={()=>setismodalopen(false)}>
                <View style={{
                    alignItems:"center",
                    justifyContent:"center",
                    backgroundColor:"#00000099",
                    height:"100%",
                    width:"100%"
                    }}
                    >
                       <TouchableOpacity 
                            activeOpacity={0.8}
                            style={{
                                alignItems:"center",
                                justifyContent:"center",
                                height:"80%",
                                width:"100%",
                                }}
                            onPress = {()=>setismodalopen(false)}
                            ></TouchableOpacity>


                        <View style={{
                            backgroundColor:"white",
                            height:"100%",
                            width:"100%",
                            borderRadius:10,}}>
                            <Text
                                style={{
                                    textAlign:"center",
                                    fontSize:20
                                }} 
                            >{favoritesData[modalDataIndex].product_name}</Text>
                            <TouchableOpacity style={{
                                            backgroundColor:"#27ae60",
                                            height:40,
                                            width:"90%",
                                            margin:"5%",
                                            borderRadius:10,
                                            alignItems:"center",
                                            justifyContent:"center"}}
                                            
                                            onPress={()=>{
                                                setismodalopen(false);
                                                navigation.navigate("Show More",{
                                                id:favoritesData[modalDataIndex].pid,
                                                name:favoritesData[modalDataIndex].product_name,
                                                price:favoritesData[modalDataIndex].product_price,
                                                image:favoritesData[modalDataIndex].product_image,
                                                rating:favoritesData[modalDataIndex].product_rating,
                                                description:favoritesData[modalDataIndex].product_description
                                            })}}>
                                    <Text style={{color:"white",fontSize:20}}>
                                        View more
                                    </Text>
                                </TouchableOpacity>
                            <TouchableOpacity style={{
                                    backgroundColor:app_theme.app_danger,
                                    height:40,
                                    width:"90%",
                                    borderRadius:10,
                                    alignItems:"center",
                                    justifyContent:"center",
                                    marginLeft:"5%",}}
                                    onPress={removeFromFavorites}>
                                <Text style={{color:"white",fontSize:20}}>
                                    Remove from favorites
                                </Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
            </Modal>}
        </View>
    )
}



const Seperator = ()=>{
    return(
        <View style={{
            height:2,
            width:"98%",
            backgroundColor:"green",
            margin:"1%",
        }}>

        </View>
    )
}

export default FavoritesScreen;