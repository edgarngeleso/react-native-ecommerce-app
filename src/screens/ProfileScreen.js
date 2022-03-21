import React,{useState,useEffect} from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    Button,
    TouchableOpacity,
    StyleSheet,
    Modal,
    SafeAreaView,
    ScrollView,
    BackHandler,
    ActivityIndicator,
} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import HeaderComponent from "../components/HeaderComponent";
import APPSETTINGS from "../constants/APPSETTINGS";
import { useDispatch, useSelector } from "react-redux";
import ProfileUpdate from "../components/profile/profileUpdate";
import Orders from "../components/profile/Orders";
import SignInSignUpComponent from "../components/SignInSignUpComponent";
import SupplierScreen from "./SupplierScreen";
import AdminScreen from "./AdminScreen";

const Stack = createNativeStackNavigator();

const Profile = ({navigation})=>{
    const [isEditOpen,setisEditOpen] = useState(0);
    const [modal_open,setmodal_open] = useState(true);
    const [error,seterror] = useState({state:false,message:""});
    const [loading,setloading] = useState(true);
    const [orders,setorders] = useState(null);

    const login_data = useSelector(state=>state.Reducer.loginInfo);

    const dispatch = useDispatch();
    const logout = ()=>{
        dispatch({
            type:"LOGOUT",
        });
        setisEditOpen(false);
    }

    const url = "https://dreamrise.000webhostapp.com/api/api.php";
    const getNumberOfOrders = ()=>{
        let formdata = new FormData();
        formdata.append("orders_userid",login_data.data.id);
        fetch(url,{
            method:"POST",
            body:formdata
        }).
        then(response=>response.json()).
        then(data=>{
            seterror("");
            setloading(false);
            setorders(data);
        }).
        catch(e=>{
            setloading(false);
            seterror(e.message);
        })
    }
    //update bottom tabs display
    useEffect(()=>{
        getNumberOfOrders();
        //hide bottom tabs
        dispatch(
           {
               type:"TOGGLE_BOTTOM_TABS",
               payload:false
           })
    },[login_data])

    const DisplayBottomTabs = ()=>{
        dispatch(
            {
                type:"TOGGLE_BOTTOM_TABS",
                payload:true
            })
    }

    BackHandler.addEventListener("hardwareBackPress",()=>{
        //navigation.goBack();
        DisplayBottomTabs();
    })
    /**************** */

    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }else{
        app_theme = APPSETTINGS.colors.default;
    }

    const [AdminSupplierModalOpen,setAdminSupplierModalOpen] = useState(false);

    return(
        <View style={{
            width:"100%",
            height:"100%",
            backgroundColor:app_theme.app_primary,
        }}>
            {login_data.loggedIn == false?
            <SignInSignUpComponent navigation={navigation}/>:
            <View>
                <View style={{height:45,
                            width:"100%",
                            flexDirection:"row",
                            backgroundColor:app_theme.app_header_backgroundColor,
                            borderBottomRightRadius:10,
                            borderBottomLeftRadius:10,
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
                            DisplayBottomTabs();
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
                    <Text style={{fontSize:25,
                                fontWeight:"bold",
                                color:app_theme.app_textColor_primary,margin:5}}>Account</Text>
                </View>

                {/*start of admin and supplier modal */}
                <Modal
                    animationType="slide"
                    visible={AdminSupplierModalOpen}
                    onRequestClose={()=>setAdminSupplierModalOpen(false)}
                    
                >
                    <View style={{
                        backgroundColor:app_theme.app_primary,
                    }}>
                        <View style={{
                                flexDirection:"row",
                                width:"100%",
                                height:50,
                                backgroundColor:app_theme.app_header_backgroundColor,
                                borderBottomRightRadius:10,
                                borderBottomLeftRadius:10,
                                justifyContent:"space-between"
                                }}>
                            <TouchableOpacity
                                onPress={()=>{setAdminSupplierModalOpen(false)}}
                                style={{
                                    height:40,
                                    width:40,
                                    margin:2,
                                    borderRadius:20,
                                    backgroundColor:"white",
                                    alignItems:"center",
                                    justifyContent:"center"
                                }}
                                    >
                                    <Image
                                        source={require("../assets/icons/back.png")}
                                        style={{
                                            width:30,
                                            height:30,
                                            margin:5,
                                            }}
                                        />
                            </TouchableOpacity>
                                <Text style={{fontSize:25,
                                                margin:5,
                                                fontWeight:"bold",
                                                color:app_theme.app_textColor_primary}}>
                                                    {login_data.data.issupplier == 1?
                                                    login_data.data.isadmin == 1?
                                                    "Admin panel":
                                                    "Supplier panel":""}</Text>
                                <Text style={{fontSize:20,
                                                margin:5,
                                                color:app_theme.app_textColor_primary}}></Text>
                        </View>
                        {login_data.data.issupplier == 1?
                            login_data.data.isadmin == 1?
                            <AdminScreen />:
                            <SupplierScreen />:
                            <></>}
                    </View>
                    
                </Modal>
                {/*end of admin and supplier modal */}

                <ScrollView style={{
                            marginBottom:45,
                        }}>
                <View style={{
                            alignItems:"center",
                            justifyContent:"center",
                            width:"100%",
                            backgroundColor:app_theme.app_box_backgroundColor,
                            borderBottomLeftRadius:10,
                            borderBottomRightRadius:10,
                        }}>
                    <TouchableOpacity style={{
                                height:100,
                                width:100,
                                borderRadius:50,
                                backgroundColor:"white",
                                shadowColor:"grey",
                                shadowOffset:{
                                    width:0,
                                    height:10,
                                },
                                shadowopacity:1,
                                shadowradius:5,
                                elevation:5,
                            }}>
                        <Image
                            source={login_data.data.userimage==""?
                                    require("../assets/icons/profile.png"):
                                    {uri:login_data.data.userimage}}
                            resizeMode="cover"
                            style={{
                                height:100,
                                width:100,
                                borderRadius:50,
                                backgroundColor:"white"
                            }}
                        />

                        <TouchableOpacity 
                            style={{
                                position:"absolute",
                                marginTop:70,
                                marginLeft:70,
                                zIndex:10
                            }}
                        >
                            <Image
                                source={require("../assets/icons/camera.png")}
                                resizeMode="cover"
                                style={{
                                    height:35,
                                    width:35,
                                    backgroundColor:"white",
                                    
                                }}
                            />
                        </TouchableOpacity>
                        
                    </TouchableOpacity>

                    
                    <View style={{
                        margin:"2%",
                        width:"90%",
                    }}>
                        <Text style={{...styles.text,color:app_theme.app_textColor_primary}}>Name:{login_data.data.firstname} {login_data.data.secondname}</Text>
                        <Text style={{...styles.text,color:app_theme.app_textColor_primary}}>Email:{login_data.data.email}</Text>
                        <Text style={{...styles.text,color:app_theme.app_textColor_primary}}>Phone Number:0712345678</Text>
                        <Text style={{...styles.text,
                            color:app_theme.app_textColor_primary}}>
                                Orders made:
                                {
                                error.state == true?
                                error.message:
                                loading == true?<ActivityIndicator
                                    size={"small"}
                                    color="#27ae60"
                                />:orders == null?0:orders.length}
                                </Text>
                        <TouchableOpacity
                            style={{
                                height:30,
                                width:"40%",
                                backgroundColor:"red",
                                marginTop:15,
                                borderRadius:10,
                                justifyContent:"center",
                                alignItems:"center",
                                marginLeft:"55%",
                            }}
                            onPress = {logout}
                        >
                            <Text style={{color:"white",fontSize:20}}>
                                Log out
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>  
                    <View style={{
                        flexDirection:"row",
                        width:"90%",
                        marginLeft:"5%",
                        marginTop:10,
                    }}>
                        <TouchableOpacity 
                            style={{...styles.toggle_touchable,
                                    backgroundColor:isEditOpen ==0?"#27ae60":"white",
                                    width:login_data.data.issupplier == 1?"30%":"48%",
                                    }}
                            onPress={()=>setisEditOpen(0)}           
                            >
                            <Text style = {{
                                ...styles.toggle_text,
                                color:isEditOpen ==0?"white":"black",
                            }}>
                                Orders
                            </Text>
                        </TouchableOpacity>  

                        <TouchableOpacity 
                            style={{...styles.toggle_touchable,
                                    backgroundColor:isEditOpen ==1?"#27ae60":"white",
                                    width:login_data.data.issupplier == 1?"30%":"48%",
                                    marginLeft:"4%",
                                    }}
                            onPress={()=>setisEditOpen(1)}    
                                    >
                            <Text style = {{
                                 ...styles.toggle_text,
                                color:isEditOpen ==1?"white":"black",
                            }}>
                                Edit Profile
                            </Text>
                        </TouchableOpacity>
                         {login_data.data.issupplier == 1?
                         <TouchableOpacity 
                            style={{...styles.toggle_touchable,
                                    backgroundColor:isEditOpen ==2?"#27ae60":"white",
                                    width:login_data.data.issupplier == 1?"30%":"48%",
                                    marginLeft:"4%",
                                    }}
                            onPress={()=>{
                                setisEditOpen(2);
                                setAdminSupplierModalOpen(true)}}    
                                    >
                            <Text style = {{
                                 ...styles.toggle_text,
                                color:isEditOpen ==2?"white":"black",
                            }}>
                            {login_data.data.isadmin == 1?
                            "Admin":
                            "Supplier"}
                            </Text>
                        </TouchableOpacity>:null}            
                    </View>
                    <View style={{
                        height:"100%",
                        width:"100%",
                    }}>
                    {isEditOpen == 0?
                    <Orders/>:
                    isEditOpen == 1?
                    <ProfileUpdate />:
                    <View style={{
                        flexDirection:"row",
                        width:"90%",
                        marginLeft:"5%",
                        marginTop:10,
                    }}> 
                        {login_data.data.issupplier == 1?
                            <Text style={{...styles.text,color:app_theme.app_textColor_primary}}>
                                Click on 
                                {login_data.data.isadmin == 1?
                                " Admin ":
                                " Supplier "} button to access {login_data.data.isadmin == 1?
                                    " Admin ":
                                    " Supplier "} actions
                            </Text>:<></>}
                    </View>}
                    </View> 
                    
                </ScrollView>
                </View>
                }
        </View>
    )
}

const ProfileScreen = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component = {Profile}
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen
                name="Admin"
                component = {AdminScreen}
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen
                name="Supplier"
                component = {SupplierScreen}
                options={{
                    headerShown:false,
                }}
            />
        </Stack.Navigator>
    )
}
const styles = StyleSheet.create({
    text:{
        fontSize:20,
        marginTop:10,
    },
    toggle_text:{
        fontSize:18,
    }
    ,
    toggle_touchable:{
        height:35,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
    }
})
export default ProfileScreen;