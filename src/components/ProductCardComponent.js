import React, {useEffect, useState} from "react";
import { View, 
         Text, 
         TouchableOpacity,
         Image,
        TextInput,
        ToastAndroid} from "react-native";
import { add } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

const ProductCardComponent = ({products,isList,children,navigation})=>{
    const [quantity, setquantity] = useState(1);
    const [itemsIds,setitemIds] = useState([]);
    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }else{
        app_theme = APPSETTINGS.colors.default;
    }

    const dispatch = useDispatch();

    const HideBottomTabs = ()=>{
        dispatch(
            {
                type:"TOGGLE_BOTTOM_TABS",
                payload:false
            })
    }

    /*redux functionality*/
    const add = (item)=>{
        dispatch({
            type:"ADD_TO_CART",
            payload:item
        });
        ToastAndroid.show(`${item.name} added to cart`,ToastAndroid.LONG);
    }

    const update_existing = (item)=>{
        dispatch({
            type:"UPDATE_CART",
            payload:[item]
        })
    }
    
    const remove = (item)=>{
        dispatch({
            type:"DELETE_PRODUCT",
            payload:item,
        });
        setquantity(1);
        ToastAndroid.show(`${item.name} removed from cart`,ToastAndroid.LONG);
    }

    const cartItems = useSelector(state=>state.Reducer.selectedItems);
    let cartItemsIds = [];
    useEffect(()=>{
        cartItemsIds = cartItems.items.map(item=>item.id);
        setitemIds(cartItemsIds);
    },[cartItems])
    
    let aqty = null;
    return(
            products.map((item,index)=>{
                return(
                    <TouchableOpacity 
                        key={index}
                        style={{
                            flexDirection:isList=="list"?"row":"column",
                            marginTop:10,
                            width:isList=="list"?"100%":"48%",
                            backgroundColor:"white",
                            borderRadius:10,
                            width:isList=="list"?"98%":"48%",
                            margin:"1%"
                            }} 
                        onPress={()=>{
                            HideBottomTabs();
                            navigation.navigate("Show More",{
                                    id:item.pid,
                                    name:item.product_name,
                                    price:item.product_price,
                                    image:item.product_image,
                                    category:item.product_category,
                                    rating:item.product_rating,
                                    description:item.product_description
                                    })}}>
                    <Image
                        loadingIndicatorSource = {require("../assets/icons/image.png")}
                        source={item.product_image==""?
                                    require("../assets/icons/image.png"):
                                        {uri:item.product_image}}
                        resizemode="cover"
                        style={{
                                width:isList=="list"?"48%":"100%",
                                height:120,
                                borderRadius:5,
                                tintColor:item.product_image == ""?"grey":null,
                                }}
                        />
                    <View style={{
                                backgroundColor:app_theme.app_box_backgroundColor,
                                borderBottomRightRadius:10,
                                borderBottomLeftRadius:isList=="list"?0:10,
                                borderTopRightRadius:isList=="list"?10:0,
                                width:isList == "list"?"52%":"100%"}}>
                        <Text style={{fontSize:20,
                                      fontWeight:"bold",
                                      marginLeft:isList=="list"?5:2,
                                      color:app_theme.app_textColor_primary}}>
                                        {item.product_name}
                        </Text>
                        <Text style={{fontSize:20,
                                    marginLeft:isList=="list"?5:2,
                                    color:app_theme.app_textColor_primary}}>
                                        ksh.{item.product_price}
                        </Text>
                        <Text style={{fontSize:17,
                                     marginLeft:isList=="list"?5:2,
                                     color:app_theme.app_textColor_primary}}>
                                        Availability:In stock
                        </Text>
                        <View style={{flexDirection:"row",
                                        marginLeft:isList=="list"?5:2,
                                        marginBottom:5,}}>
                            <Text style={{fontSize:17,
                                        color:app_theme.app_textColor_primary}}>
                                            rating:{item.product_rating}
                            </Text>
                            <Image
                                source={item.product_rating>4?require("../assets/icons/star1.png"):require("../assets/icons/star.png")}
                                resizeMode="cover"
                                style={{
                                    width:20,
                                    height:20,
                                    marginLeft:5,
                                    }}
                            />
                        </View>
                        
                        {children}
                        {itemsIds.includes(item.pid)?
                                    <View 
                                        style={{
                                        marginLeft:"5%",
                                        width:"90%",
                                        borderRadius:5,
                                        height:25,
                                        justifyContent:"space-between",
                                        marginTop:5,
                                        marginBottom:5,
                                        zIndex:10,
                                        flexDirection:"row"
                                        }}>
                                            <TouchableOpacity
                                                onPress={()=>remove({
                                                    id:item.pid,
                                                    name:item.product_name})}
                                                    
                                                    style={{
                                                        width:"45%",
                                                        backgroundColor:app_theme.app_danger,
                                                        borderRadius:5,
                                                        height:25,
                                                        alignItems:"center",
                                                        justifyContent:"center",
                                                        zIndex:10,
                                                        }}>
                                                        <Text style={{
                                                            color:"white"
                                                        }}>
                                                            remove
                                                        </Text>
                                                </TouchableOpacity>
                                            <View style={{
                                                    borderRadius:5,
                                                    height:25,
                                                    width:"45%",
                                                    justifyContent:"space-between",
                                                    zIndex:10,
                                                    flexDirection:"row"
                                                    }}>
                                                <TouchableOpacity
                                                    onPress={()=>{
                                                        let subtracted = aqty-1;
                                                        if(subtracted<1){
                                                            remove({
                                                                id:item.pid,
                                                                name:item.product_name});
                                                        }else{
                                                            update_existing({id:item.pid,
                                                                name:item.product_name,
                                                                quantity:aqty-1,
                                                                image:item.product_image,
                                                                price:item.product_price,
                                                                added:true});
                                                        }
                                                        
                                                        }}
                                                        
                                                        style={{
                                                            backgroundColor:app_theme.app_button_backgroundColor,
                                                            borderTopLeftRadius:5,
                                                            borderBottomLeftRadius:5,
                                                            height:25,
                                                            width:25,
                                                            alignItems:"center",
                                                            justifyContent:"center",
                                                            zIndex:10,
                                                            }}>
                                                            <Image
                                                            source={require("../assets/icons/subtract.png")}
                                                            style={{
                                                                height:20,
                                                                width:20,
                                                                tintColor:"white"
                                                            }}/>
                                                </TouchableOpacity>
                                                <View style={{
                                                    borderBottomWidth:2,
                                                    borderColor:app_theme.app_button_backgroundColor,
                                                    height:25,
                                                    width:"40%",
                                                    justifyContent:"center",
                                                    alignItems:"center",
                                                }}>
                                                    <Text style={{
                                                            color:app_theme.app_textColor_primary,
                                                            fontSize:20,
                                                        }}>
                                                            {cartItems.items.map(cartitem=>{
                                                                if(cartitem.id == item.pid){
                                                                    aqty = cartitem.quantity;
                                                                }
                                                            })}
                                                            {aqty}
                                                        </Text>
                                                </View>
                                                
                                            
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    update_existing({id:item.pid,
                                                        name:item.product_name,
                                                        quantity:aqty+1,
                                                        image:item.product_image,
                                                        price:item.product_price,
                                                        added:true});
                                                }}
                                                
                                                style={{
                                                    backgroundColor:app_theme.app_button_backgroundColor,
                                                    borderBottomRightRadius:5,
                                                    borderTopRightRadius:5,
                                                    height:25,
                                                    width:25,
                                                    alignItems:"center",
                                                    justifyContent:"center",
                                                    zIndex:10,
                                                    marginRight:2,
                                                    }}>
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
                                    </View>:
                                    <TouchableOpacity
                                    onPress={()=>{
                                            add({id:item.pid,
                                                name:item.product_name,
                                                quantity:1,
                                                image:item.product_image,
                                                price:item.product_price,
                                                added:true})
                                        }}
                                        
                                        style={{
                                            marginLeft:"5%",
                                            backgroundColor:app_theme.app_button_backgroundColor,
                                            width:"90%",
                                            borderRadius:5,
                                            height:25,
                                            alignItems:"center",
                                            justifyContent:"center",
                                            marginTop:5,
                                            marginBottom:5,
                                            zIndex:10,
                                            shadowColor:app_theme.app_textColor_primary,
                                            shadowOffset:{
                                                width:0,
                                                height:10,
                                            },
                                            shadowopacity:1,
                                            shadowradius:5,
                                            elevation:5,
                                            }}>
                                            <Text style={{
                                                color:"white"
                                            }}>
                                                Add to Cart
                                            </Text>
                                    </TouchableOpacity>}
                    </View>
                </TouchableOpacity>
                )
            })
     
    )
}

export default ProductCardComponent;