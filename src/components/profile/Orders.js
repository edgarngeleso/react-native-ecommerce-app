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
    ActivityIndicator
} from "react-native";
import { useSelector } from "react-redux";
import ErrorComponent from "../ErrorComponent";
import APPSETTINGS from "../../constants/APPSETTINGS";

const Orders = ()=>{
    const [error,seterror] = useState({state:false,message:""});
    const [loading,setloading] = useState(true);
    const [orders,setorders] = useState(null);
    const [isOrderModalOpen,setisOrderModalOpen] = useState(false);
    const [modalDataindex,setmodalDataindex] = useState(0);
    const login_data = useSelector(state=>state.Reducer.loginInfo);
    const url = "https://dreamrise.000webhostapp.com/api/api.php";

    const fetchOrders = ()=>{
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
    useEffect(()=>{
        fetchOrders()
    },[]);

    const toggleOrderModal = ()=>{
        isOrderModalOpen == true?setisOrderModalOpen(false):setisOrderModalOpen(true);
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
            height:"100%",
            width:"100%",
            backgroundColor:app_theme.app_primary,
        }}>
            {error.state == true?
            <ErrorComponent error={error.message}/>:
            loading==true?<ActivityIndicator/>:
            orders==null?
                <Text style={{textAlign:"center",
                            marginTop:10,
                            fontSize:20,
                            color:app_theme.app_textColor_primary}}>
                You haven't made any orders yet.
                </Text>:orders.map((order,index)=>{
                    return(
                        <View key={index}>
                            <Text 
                                style={{
                                    fontSize:22,
                                    fontWeight:"bold",
                                    color:app_theme.app_textColor_primary
                                }}
                            >Order Id: {order.orderid}</Text>
                            {order.data.map((item,item_id)=>{
                                return(
                                    <View key={item_id}
                                        style={{flexDirection:"row"}}
                                    >
                                        <Image
                                            source={require("../../assets/icons/bought_products.png")}
                                            resizeMode="cover"
                                            style={{
                                                width:40,
                                                height:40,
                                                marginLeft:5
                                            }}
                                        />
                                        <Text style={{...styles.textStyle,
                                                    color:app_theme.app_textColor_primary}}>
                                            Name:{item.product_name}
                                        </Text>
                                        <Text style={{...styles.textStyle,
                                                    color:app_theme.app_textColor_primary}}>
                                            Total:{item.total}
                                        </Text>
                                    </View>
                                )
                            })}
                            <View style={{
                                flexDirection:"row",
                                width:"100%",
                                marginLeft:"38%"
                            }}>
                                <TouchableOpacity
                                    style={{...styles.touchable_style,
                                        marginLeft:0,
                                        backgroundColor:app_theme.app_button_backgroundColor,}}
                                    onPress={()=>{
                                        setisOrderModalOpen(true)
                                        setmodalDataindex(index);
                                    }}
                                >
                                    <Text style={{
                                        color:"white"
                                    }}>
                                        View more
                                    </Text>
                                </TouchableOpacity>
                                {order.iscanceled !== undefined?<TouchableOpacity
                                        style={{...styles.touchable_style,
                                                marginLeft:"1%",
                                                backgroundColor:app_theme.app_button_backgroundColor,}}
                                        onPress={()=>{}}
                                    >
                                        <Text style={{
                                            color:"red"
                                        }}>
                                            Order canceled
                                        </Text>
                                    </TouchableOpacity>:
                                    <TouchableOpacity
                                        style={{...styles.touchable_style,
                                                marginLeft:"1%",
                                                backgroundColor:app_theme.app_button_backgroundColor,}}
                                        onPress={()=>{}}
                                    >
                                        <Text style={{
                                            color:"white"
                                        }}>
                                            Cancel order
                                        </Text>
                                    </TouchableOpacity>
                                }
                                
                            </View>
                            
                        </View>
                    )
                })}


                <Modal 
                animationType="slide"
                visible={isOrderModalOpen}
                transparent
                onRequestClose={()=>setisOrderModalOpen(false)}
                >
                    
                    {orders==null?
                    <></>:
                    <View style={{
                        alignItems:"center",
                        justifyContent:"center",
                        backgroundColor:"#00000099",
                        height:"100%",
                        width:"100%"
                    }}>
                        <View style={{backgroundColor:app_theme.app_primary,
                                width:"100%",
                                height:"100%"}}>
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
                                    onPress={()=>setisOrderModalOpen(false)}
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
                                        source={require("../../assets/icons/back.png")}
                                        style={{
                                            width:30,
                                            height:30,
                                            margin:5,
                                        }}
                                    />
                                </TouchableOpacity>
                                <Text style={{fontSize:20,
                                            margin:5,
                                            color:app_theme.app_textColor_primary}}>Order ID:{orders[modalDataindex].orderid}</Text>
                                <Text style={{fontSize:20,
                                            margin:5,
                                            color:app_theme.app_textColor_primary}}>Delivery:In progress</Text>
                            </View>
                            <View style={{
                                width:"98%",
                                marginLeft:"1%",
                                height:"100%",
                            }}>
                                <OrdersModal data={orders[modalDataindex]}/>
                            </View>
                            

                        </View>
                    </View>
                    }
                </Modal>
            
        </View>
    )
}

const OrdersModal = ({data})=>{
    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }else{
        app_theme = APPSETTINGS.colors.default;
    }
    return(
        <ScrollView>
            {data.data.map((item,item_id)=>{
                return(
                        <View key={item_id}
                            style={{
                                flexDirection:"row",
                                marginTop:10,
                                borderRadius:5,
                                justifyContent:"space-between",
                                backgroundColor:app_theme.app_box_backgroundColor,
                                }}
                                >
                        {/**/}
                        <View style={{
                            margin:5,
                        }}>
                            <Text style={{...styles.textStyle,
                                        color:app_theme.app_textColor_primary}}>
                                Name:{item.product_name}
                            </Text>
                            <Text style={{...styles.textStyle,
                                        color:app_theme.app_textColor_primary}}>
                                Quantity:{item.product_quantity}
                            </Text>
                            <Text style={{...styles.textStyle,
                                        color:app_theme.app_textColor_primary}}>
                                Price:{item.product_price}
                            </Text>
                        </View>

                        <Image
                            source={require("../../assets/icons/bought_products.png")}
                            resizeMode="cover"
                            style={{
                                    width:40,
                                    height:40,
                                    marginLeft:5
                                    }}
                                />
                        
                        <Text style={{...styles.textStyle,
                                        color:app_theme.app_textColor_primary}}>
                            Total:{item.total}
                        </Text>
                    </View>
                )
            })}
            <View style={{
                        flexDirection:"row",
                        marginTop:10,
                        justifyContent:"space-between"
                        }}>
                <Text style={{fontSize:20,
                            fontWeight:"bold",
                            margin:5,
                            color:app_theme.app_textColor_primary}}>Total</Text>
                <Text style={{fontSize:20,
                            fontWeight:"bold",
                            margin:5,
                            color:app_theme.app_textColor_primary}}>
                     Ksh.{data.data.map(item=>item.total).reduce((prev,curr)=>prev+curr,0)}
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textStyle:{
        fontSize:15,
        marginLeft:5,
    },
    touchable_style:{
        width:"30%",
        height:40,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center"
    }
})
export default Orders;