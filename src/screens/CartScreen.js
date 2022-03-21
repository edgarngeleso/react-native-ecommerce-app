import React,{useState,useEffect} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    Modal,
    StyleSheet
} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import HeaderComponent from "../components/HeaderComponent";
import SearchIcon from "../components/SearchIcon";
import APPSETTINGS from "../constants/APPSETTINGS";
import PurchaseScreen from "./PurchaseScreen";
import ProductModalComponent from "../components/ProductModalComponent";
import SignInSignUpComponent from "../components/SignInSignUpComponent";

const Stack = createNativeStackNavigator();

const CartComponent = ({navigation,route})=>{
    const [ismodalopen,setismodalopen] = useState({index:0,state:false});
    const [quantity,setquantity] = useState(0);
    let items = useSelector((state)=>state.Reducer.selectedItems);
    
    const grand_total = items.items
        .map(item=>item.quantity*Number((item.price).replace(",","")))
        .reduce((prev,curr)=>prev+curr,0);
    
    const dispatch = useDispatch();
    const increase = (item) =>{
        dispatch({
            type:"UPDATE_CART",
            payload:item
        })
    }  

    const decrease = (item)=>{
        dispatch({
            type:"UPDATE_CART",
            payload:item
        })
    }


    const delete_product = (item)=>{
        dispatch({
            type:"DELETE_PRODUCT",
            payload:item,
        })
    }
    const clean_cart = ()=>{
        dispatch({
            type:"CLEAN_CART",
        })
    }

    let login_data = useSelector((state)=>state.Reducer.loginInfo);
    

    const purchase = ()=>{
        navigation.navigate("Purchase");
    }
    
    const closeModal = ()=>{
        setismodalopen({...ismodalopen,state:false});
    }

    const openModal = (index)=>{
        setismodalopen({index:index,state:true});
    }

    const toggle_modal = ()=>{
        ismodalopen==true?setismodalopen(false):setismodalopen(true);
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
        <View style={{
            backgroundColor:app_theme.app_primary,
            width:"100%",
            height:"100%"
        }}>
            <HeaderComponent navigation={navigation}/>
            {items.items==""?
            <View style={{
                height:"100%",
                alignItems:"center",
                justifyContent:"center"
                }}>
                <Text style={{
                    fontSize:18,
                    marginBottom:20,
                    color:app_theme.app_textColor_primary}}>
                    There are no items in your Cart. Add products.
                </Text>
                <TouchableOpacity
                    style={{
                        width:"80%",
                        height:40,
                        borderRadius:10,
                        backgroundColor:app_theme.app_button_backgroundColor,
                        alignItems:"center",
                        justifyContent:"center"
                        }}
                        onPress={()=>navigation.navigate("Products")}
                >
                    <Text style={{
                        fontSize:20,
                        color:"white"
                        }}>
                        Continue shopping
                    </Text>            
                </TouchableOpacity>
            </View>:
            <ScrollView>
                {items.items.map((item,index)=>{
                    return(
                        <View style={{
                            width:"98%",
                            height:115,
                            backgroundColor:"transparent",
                            flexDirection:"row",
                            marginTop:10,
                            marginLeft:"1%",
                        }}
                        key={index}
                        >
                            <TouchableOpacity
                                onPress={()=>{
                                    openModal(index)}}
                                style={{
                                    width:"48%",
                                    height:"100%",
                                    borderRadius:5
                                }}
                            >
                                <Image
                                    source={{uri:item.image}}
                                    resizeMode="cover"
                                    style={{
                                        width:"100%",
                                        height:"100%",
                                    }}
                                />
                            </TouchableOpacity>
                            
                            <View style={{
                                width:"48%",
                                marginLeft:"4%",
                                backgroundColor:app_theme.app_box_backgroundColor
                            }}>
                                <Text style={{
                                    color:app_theme.app_textColor_primary
                                }}>
                                    Product:{item.name}
                                </Text>
                                <View style={{
                                    flexDirection:"row",
                                }}>
                                    <Text style={{
                                    color:app_theme.app_textColor_primary
                                        }}>Quantity:</Text>

                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={{
                                            backgroundColor:app_theme.app_button_backgroundColor,
                                            height:25,
                                            width:25,
                                            alignItems:"center",
                                            justifyContent:"center",
                                            marginLeft:5,
                                            zIndex:10,
                                            borderTopLeftRadius:5,
                                            borderBottomLeftRadius:5,
                                                }}
                                        onPress={()=>{
                                            let subtracted = item.quantity-1;
                                            if(subtracted<1){
                                                delete_product({id:item.id,
                                                        name:item.name,
                                                        quantity:item.quantity,
                                                        image:item.image,
                                                        price:item.price,
                                                        added:true})
                                            }else{
                                                decrease([{id:item.id,
                                                        name:item.name,
                                                        quantity:item.quantity-1,
                                                        image:item.image,
                                                        price:item.price,
                                                        added:true}])
                                            }
                                            }}
                                    >
                                        
                                        <Image
                                            source={require("../assets/icons/subtract.png")}
                                            style={{
                                                height:20,
                                                width:20,
                                                tintColor:"white"
                                            }}
                                        /> 
                                    </TouchableOpacity>
                                    <View style={{
                                        borderBottomWidth:2,
                                        borderColor:app_theme.app_button_backgroundColor,
                                        width:"15%",
                                        height:25,
                                        justifyContent:"center",
                                        alignItems:"center",
                                    }}>
                                        <Text  style={{fontSize:20,
                                            fontWeight:"bold",
                                            color:app_theme.app_textColor_primary}}>
                                            {item.quantity}
                                        </Text>
                                    </View>
                                    
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={{
                                            backgroundColor:app_theme.app_button_backgroundColor,
                                            borderBottomRightRadius:5,
                                            borderTopRightRadius:5,
                                            height:25,
                                            width:25,
                                            alignItems:"center",
                                            justifyContent:"center",
                                            zIndex:10,
                                                }}
                                        onPress={()=>increase([{id:item.id,
                                                                name:item.name,
                                                                quantity:item.quantity+1,
                                                                image:item.image,
                                                                price:item.price,
                                                                added:true}])}
                                    >
                                        <Image
                                            source={require("../assets/icons/add.png")}
                                            style={{
                                                height:20,
                                                width:20,
                                                tintColor:"white"
                                            }}
                                        />
                                    </TouchableOpacity>
                                
                                </View>
                                    
                                    <Text style={{color:app_theme.app_textColor_primary}}>
                                        price:Ksh.{item.price}
                                    </Text>
                                    <Text style={{color:app_theme.app_textColor_primary}}>
                                        total:Ksh.{item.quantity*Number((item.price).replace(",",""))}
                                    </Text>
                                
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={{
                                        backgroundColor:app_theme.app_danger,
                                        width:"80%",
                                        borderRadius:5,
                                        height:20,
                                        alignItems:"center",
                                        justifyContent:"center",
                                        marginTop:10
                                    }}
                                    onPress={()=>delete_product({id:item.id,
                                                                name:item.name,
                                                                quantity:item.quantity,
                                                                image:item.image,
                                                                price:item.price,
                                                                added:true})}
                                >
                                    <Text style={{
                                            fontSize:12,
                                            color:"white"
                                            }}>
                                        Remove
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                    )
                })}
                <Modal
                    transparent
                    animationType="slide"
                    visible={ismodalopen.state}
                    onRequestClose={closeModal}
                    >
                    <ProductModalComponent 
                        productName={items.items[ismodalopen.index].name} 
                        productPrice={items.items[ismodalopen.index].price} 
                        imageUri={items.items[ismodalopen.index].image}/>
                </Modal>
                
                <View style={{
                            width:"98%",
                            marginLeft:"1%",
                            flexDirection:"row",
                            marginTop:20,}}>
                    
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                            width:"48%",
                            height:40,
                            borderRadius:10,
                            backgroundColor:app_theme.app_button_backgroundColor,
                            alignItems:"center",
                            justifyContent:"center"
                            }}
                            onPress={()=>navigation.navigate("Products")}
                    >
                        <Text style={{
                            fontSize:20,
                            color:"white"
                            }}>
                            Continue shopping
                        </Text>
                        
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                            width:"48%",
                            height:40,
                            borderRadius:10,
                            alignItems:"center",
                            justifyContent:"center",
                            marginLeft:"4%",
                            backgroundColor:app_theme.app_danger,
                            }}
                            onPress={clean_cart}
                    >
                        <Text style={{
                            fontSize:20,
                            color:"white"
                            }}>
                            Remove all
                        </Text>
                        
                    </TouchableOpacity>
                    
                </View>

                <View style={{
                            flexDirection:"row",
                            marginTop:20,
                            width:"98%",
                            marginLeft:"1%",
                            }}>
                    <TouchableOpacity
                        style={{
                            width:"100%",
                            height:40,
                            borderRadius:10,
                            backgroundColor:app_theme.app_button_backgroundColor,
                            marginLeft:"0%",
                            alignItems:"center",
                            justifyContent:"center",
                            flexDirection:"row"
                            }}
                            onPress={purchase}
                    >
                        <Text style={{
                            fontSize:20,
                            color:"white"
                            }}>
                            Purchase
                        </Text>
                        <Text style={{fontSize:17,
                                    fontWeight:"bold",
                                    color:"white",
                                    fontStyle:"italic",
                                    marginLeft:10}}>
                            {grand_total == 0?"":`Ksh.${grand_total}`}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            }
        </View>
    )
}

const CartScreen = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Cart"
                component = {CartComponent}
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
            </Stack.Navigator>
    )
}

export default CartScreen;