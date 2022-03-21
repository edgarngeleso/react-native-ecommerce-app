import React, { useEffect, useState } from "react";
import {
    View,
    Dimensions,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    useWindowDimensions
} from "react-native";

const BottomTabsComponent = ()=>{
    const [aheight,setaheight] = useState(Dimensions.get("screen").height); 
    const [isOpen,setisOpen] = useState({
        Home:true,
        Products:false,
        Notifications:false,
        Cart:false
    });

    useEffect(()=>{
        Dimensions.addEventListener("change",()=>{
            setaheight(Dimensions.get("screen").height);
        })
        
    },[Dimensions.get("screen").height])

    console.log()
    return(
        <SafeAreaView>
            <Text>{aheight}</Text>
            <View style={{
                height:50,
                width:"100%",
                backgroundColor:"green",
                marginTop:aheight-140,
                borderTopLeftRadius:5,
                borderTopRightRadius:5,
            }}>
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between"
                }}>
                    <TouchableOpacity style={{
                       justifyContent:"center",
                       alignItems:"center", 
                       marginLeft:5,
                    }}
                    onPress={()=>setisOpen({Home:true,
                                            Products:false,
                                            Notifications:false,
                                            Cart:false})}
                    >
                        <Image
                            source={require("../assets/icons/home.png")}
                            style={{
                                height:30,
                                width:30,
                            }}
                        />
                        <Text>
                            Home
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{
                       justifyContent:"center",
                       alignItems:"center", 
                    }}
                    onPress={()=>setisOpen({Home:false,
                                            Products:true,
                                            Notifications:false,
                                            Cart:false})}
                    >
                        <Image
                            source={require("../assets/icons/products.png")}
                            style={{
                                height:30,
                                width:30,
                            }}
                        />
                        <Text>
                            Products
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                       justifyContent:"center",
                       alignItems:"center", 
                    }} 
                    onPress={()=>setisOpen({Home:false,
                                            Products:false,
                                            Notifications:true,
                                            Cart:false})}>
                        <Image
                            source={require("../assets/icons/notification.png")}
                            style={{
                                height:30,
                                width:30,
                            }}
                        />
                        <Text>
                            Notifications
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                       justifyContent:"center",
                       alignItems:"center", 
                       marginRight:5,
                    }} 
                    onPress={()=>setisOpen({Home:false,
                                            Products:false,
                                            Notifications:false,
                                            Cart:true})}>
                        <Image
                            source={require("../assets/icons/cart.png")}
                            style={{
                                height:30,
                                width:30,
                            }}
                        />
                        <Text>
                            Cart
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
        
    )
}
export default BottomTabsComponent;