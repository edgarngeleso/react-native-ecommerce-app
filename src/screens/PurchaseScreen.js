import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert,
    Modal,
    ActivityIndicator,
    BackHandler,
    Image
} from "react-native";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import HeaderComponent from "../components/HeaderComponent";
import { useDispatch, useSelector } from "react-redux";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CustomCheckbox from "../components/CustomCheckbox";
import SignInSignUpComponent from "../components/SignInSignUpComponent";
import ProgressBarComponent from "../components/ProgressBarComponent";
import { Picker } from "@react-native-picker/picker";


const PurchaseScreen = ({navigation})=>{
    const [place_order_error,setplace_order_error] = useState({state:false,error:""});
    const [ismodalopen,setismodalopen] = useState(false);
    const [selectedPaymentMethod,setSelectedPaymentMethod] = useState({value:"",index:0});
    const [selectedDeliveryMethod,setSelectedDeliveryMethod] = useState({value:"",index:0});
    const [selectedDestination,setSelectedDestination] = useState({value:"",index:0});
    const [conditionsAccepted,setconditionsAccepted] = useState(false);
    const [isConfirmVisible,setisConfirmVisible] = useState(false);
    const pickerRef = useRef();
    const url = "https://dreamrise.000webhostapp.com/api/api.php";
    let items = useSelector((state)=>state.Reducer.selectedItems);
    let login_data = useSelector((state)=>state.Reducer.loginInfo);
    const dispatch = useDispatch();

    function open() {
        pickerRef.current.focus();
    }
    
    function close() {
        pickerRef.current.blur();
    }
    //fetch delivery cost based on the location specified by the user
    useEffect(()=>{
        //run after destination selection
    },[selectedDestination]);

    const confirm = ()=>{
        if(selectedDeliveryMethod.index == 0){
            Alert.alert("Error","Select a delivery method first!",[{text:"Ok",onPress:()=>{}}]);
            return false;
        }
        if(selectedDeliveryMethod.index == 1){
            //pass i.e do nothing
        }else{
            if(selectedDestination.index == 0){
                Alert.alert("Error","Select destination first!",[{text:"Ok",onPress:()=>{}}]);
                return false;
            }
        }
        
        setismodalopen(true);
        let formdata = new FormData();
        
        formdata.append("placed_order",JSON.stringify(items.items));
        formdata.append("userid",login_data.data.id);
        fetch(url,{
            method:"POST",
            body:formdata
        }).
        then(response=>response.json()).
        then(data=>{
            if(data.error == true){
                setplace_order_error({state:true,error:data.message});
            }else{
                setplace_order_error({state:false,error:"Order successfully placed."});
                dispatch({
                    type:"CLEAN_CART"
                })
            }
        }).
        catch(e=>{
            setplace_order_error({state:true,error:e.message});
        })
    }

    
    const qty = items.items
    .map(item=>item.quantity)
    .reduce((prev,curr)=>prev+curr,0);
    const grand_total = items.items
        .map(item=>item.quantity*Number((item.price).replace(",","")))
        .reduce((prev,curr)=>prev+curr,0);

    //update bottom tabs display
    const bottomTabsState = useSelector(state=>state.Reducer.BottomTabsDisplayed);
    useEffect(()=>{
        dispatch(
           {
               type:"TOGGLE_BOTTOM_TABS",
               payload:false
           })
    },[])

    const DisplayBottomTabs = ()=>{
        dispatch(
            {
                type:"TOGGLE_BOTTOM_TABS",
                payload:true
            })
    }

    BackHandler.addEventListener("hardwareBackPress",()=>{
        DisplayBottomTabs()
    })
    /*****************/
    const close_modal = ()=>{
        DisplayBottomTabs();
        setismodalopen(false);
        navigation.navigate("Cart");
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
            {login_data.loggedIn == true?
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
                    <Text style={{fontSize:25,fontWeight:"bold",
                                    color:app_theme.app_textColor_primary,
                                    margin:5}}>Purchase</Text>

                </View>
                {/*will display successful message or any error*/}
                <Modal 
                    transparent
                    animationType="slide"
                    onRequestClose={close_modal}
                    visible={ismodalopen}>
                        <PurchaseModalComponent error={place_order_error}>
                        {place_order_error.state==false?
                            <TouchableOpacity 
                                style={{
                                    height:40,
                                    width:"98%",
                                    margin:"1%",
                                    borderRadius:10,
                                    backgroundColor:"#27ae60",
                                    alignItems:"center",
                                    justifyContent:"center"
                                }}
                                onPress={()=>{
                                        navigation.navigate("profile");
                                        setismodalopen(false);}}
                            >
                                <Text style={{color:"white",fontSize:20}}>
                                    View Orders
                                </Text>
                            </TouchableOpacity>:
                            <></>}
                        </PurchaseModalComponent>
                </Modal>
                {/******/}
                <Text style={{color:app_theme.app_textColor_primary,
                            textAlign:"center",
                            fontSize:20,
                            fontWeight:"bold",
                            textDecorationLine:"underline"}}>
                    Purchase Details
                </Text>

                <View style={{
                flexDirection:"row",
                marginLeft:"5%"
                    }}>
                        <ProgressBarComponent 
                            isCompleted={selectedPaymentMethod.index>0?true:false} 
                            text="Payment"/>
                        <ProgressBarComponent 
                            isCompleted={selectedDeliveryMethod.index>0?true:false} 
                            text="Delivery method"/>

                        {selectedDeliveryMethod.index>1?<ProgressBarComponent 
                            isCompleted={selectedDestination.index>0?true:false} 
                            text="Destination"/>:<></>}
                        
                        <ProgressBarComponent 
                        isCompleted={conditionsAccepted} 
                        text="Terms accepted"/>
                </View>

                <Picker
                    mode = {"dropdown"}
                    ref={pickerRef}
                    selectedValue={selectedPaymentMethod.value}
                    onValueChange={(itemValue, itemIndex) =>{
                        setSelectedPaymentMethod({value:itemValue,index:itemIndex});
                        if(itemIndex > 0){
                            setisConfirmVisible(true);
                        }else{
                            setisConfirmVisible(false);
                        }}}>
                    <Picker.Item label="Select payment method." value="Select payment method." />
                    <Picker.Item label="Pay on delivery" value="on delivery" />
                    <Picker.Item label="Pay via M-PESA" value="M-PESA" />
                    <Picker.Item label="Pay with Mastercard" value="Mastercard" />
                </Picker>

                <Picker
                    mode = {"dropdown"}
                    ref={pickerRef}
                    selectedValue={selectedDeliveryMethod.value}
                    onValueChange={(itemValue, itemIndex) =>{setSelectedDeliveryMethod({value:itemValue,index:itemIndex})}}>
                    <Picker.Item label="Select delivery method" value="Select delivery method" />
                    <Picker.Item label="Pick at our store" value="store" />
                    <Picker.Item label="Delivery within Nairobi" value="Nairobi" />
                    <Picker.Item label="Delivery outside Nairobi" value="upcountry" />
                </Picker>

                <Picker
                    style={{
                        display:selectedDeliveryMethod.index == 1?"none":"flex",
                    }}
                    mode = {"dropdown"}
                    ref={pickerRef}
                    selectedValue={selectedDestination.value}
                    onValueChange={(itemValue, itemIndex) =>{setSelectedDestination({value:itemValue,index:itemIndex})}}>
                    <Picker.Item label="Select destination" value="Select destination" />
                    <Picker.Item label="Nairobi" value="Nairobi" />
                    <Picker.Item label="Nakuru" value="Nakuru" />
                    <Picker.Item label="Eldoret" value="Eldoret" />
                </Picker>

                <View style={{width:"45%",marginLeft:"55%"}}>
                    <Text style={{fontSize:18,
                                fontWeight:"bold",
                                textDecorationLine:"underline"}}>Accumulated Total</Text>
                    <Text style={{fontSize:18}}>Items quantity: {qty}</Text>
                    <Text style={{fontSize:18}}>Items total: Ksh. {grand_total}</Text>
                    <Text style={{fontSize:18,
                                display:selectedDeliveryMethod.index <= 1?"none":"flex",}}>
                                Destination: {selectedDestination.index==0?"N/A":selectedDestination.value}</Text>
                    <Text style={{fontSize:18,
                                display:selectedDeliveryMethod.index <= 1?"none":"flex",}}>
                                    Delivery cost: {selectedDestination.index==0?"N/A":20}</Text>
                    <Text style={{fontSize:18, 
                                fontWeight:"bold",}}>
                            Total: {selectedDestination.index<=1?grand_total:grand_total+20}</Text>
                </View>

                <BouncyCheckbox
                    style={{marginLeft:10}}
                    size={25}
                    fillColor={"#27ae60"}
                    unfillColor="#FFFFFF"
                    text="I accept terms and conditions."
                    iconStyle={{ borderColor: "#27ae60" }}
                    textStyle={{ fontFamily: "JosefinSans-Regular",fontSize:20,textDecorationLine: "none", }}
                    onPress={()=>{
                        conditionsAccepted==true?setconditionsAccepted(false):setconditionsAccepted(true);
                    }}
                    ></BouncyCheckbox>

                <View style={{
                            flexDirection:"row",
                            marginTop:20,
                            }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{
                                display:isConfirmVisible==true?"flex":"none",
                                flexDirection:"row",
                                width:"80%",
                                height:40,
                                borderRadius:10,
                                backgroundColor:conditionsAccepted==true?"#27ae60":"grey",
                                marginLeft:"10%",
                                alignItems:"center",
                                justifyContent:"center"
                                }}
                                onPress={confirm}
                                disabled={conditionsAccepted==true?false:true}
                        >

                            <Text style={{
                                fontSize:18,
                                color:"white",
                                marginRight:10
                                }}>
                                Confirm
                            </Text>

                            <Text style={{
                                fontSize:18,
                                color:"white"
                                }}>
                                Ksh.{selectedDestination.index==0?grand_total:grand_total+20}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>:<SignInSignUpComponent navigation={navigation}/>}
        </View>
    )
}

const PurchaseModalComponent = ({error,children})=>{
    let login_data = useSelector((state)=>state.Reducer.loginInfo);
    return(
        <View style={{
            width:"100%",
            height:"100%",
            backgroundColor:"#00000099"
        }}>
            <View style={{
                width:"100%",
                height:"100%",
                marginTop:"20%",
                backgroundColor:"white",
                borderRadius:20
            }}>
                <View style={{
                    height:"30%",
                    width:"100%",
                    backgroundColor:"whitesmoke",
                    borderTopLeftRadius:20,
                    borderTopRightRadius:20,
                    justifyContent:"center",
                    alignItems:"center"
                }}>
                    {error.state == true?
                    <LottieView
                        source={require('../assets/animations/wrong1.json')}
                        
                        colorFilters={[
                        {
                            keypath: 'button',
                            color: '#F00000',
                        },
                        {
                            keypath: 'Sending Loader',
                            color: '#F00000',
                        },
                        ]}
                        autoPlay
                        loop={false}
                    />:<LottieView
                            source={require('../assets/animations/ok.json')}
                            
                            colorFilters={[
                            {
                                keypath: 'button',
                                color: '#F00000',
                            },
                            {
                                keypath: 'Sending Loader',
                                color: '#F00000',
                            },
                            ]}
                            autoPlay
                            loop={false}
                        />}
                    
                </View>
                {error.error?<View style={{
                                        alignItems:"center",
                                        justifyContent:"center"}}>
                        <Text style={{fontSize:18,
                                    color:error.state==true?"red":"#27ae60"}}>
                                  {error.error=="Network request failed"?"You are not connected to internet":error.error}  
                        </Text>
                        <Text style={{fontSize:18,
                                      marginTop:10,
                                      fontWeight:"bold",
                                      color:error.state==true?"red":"#27ae60"}}>
                            {error.state==false?
                                `Thank you ${login_data.data.firstname} for shopping with us.`:
                                `Oops! Unable to place your order.`}
                        </Text>
                        {children}
                        </View>:<ActivityIndicator/>}

            </View>
        </View>
    )
}
export default PurchaseScreen;