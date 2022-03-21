import React,{useState} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import APPSETTINGS from "../constants/APPSETTINGS";
import HeaderComponent from "../components/HeaderComponent";
import SearchIcon from "../components/SearchIcon";
import IsLoadingComponent from "../components/IsLoadingComponent";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from "react-redux";
const Stack = createNativeStackNavigator();

const AboutScreen = ({navigation})=>{
    const [isloading,setisloading] = useState(false);
    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }else{
        app_theme = APPSETTINGS.colors.default;
    }

    return(
        <View style={{height:"100%",
                    width:"100%",
                    backgroundColor:app_theme.app_primary,
                        }}>
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
                        margin:5,
                        color:app_theme.app_textColor_primary}}>About us</Text>

                </View>
            {isloading == true?<IsLoadingComponent/>:
            <View>
                <Text 
                style={{
                    textAlign:"center",
                    textDecorationLine:"underline",
                    fontWeight:"bold",
                    fontSize:20,
                    color:app_theme.app_textColor_primary}}>About Us</Text>
                <View style={{
                        width:"98%",
                        marginLeft:"1%"
                    }}>
                    <Text style={{fontSize:18,
                                color:app_theme.app_textColor_primary}}>
                        Market is an e-commerce platform.
                    </Text>
                </View>

                <View >
                    <Text style={{
                            textAlign:"center",
                            textDecorationLine:"underline",
                            fontWeight:"bold",
                            fontSize:20,
                            color:app_theme.app_textColor_primary}}>Terms and Conditions</Text>
                    <View style={{
                        width:"98%",
                        marginLeft:"1%"
                    }}>
                        <Text style={{fontSize:18,
                                    color:app_theme.app_textColor_primary}}>
                            Products sold are only refundable after meeting the following conditions.
                        </Text>
                        <Text style={{fontSize:18,
                                    fontWeight:"bold",
                                    textDecorationLine:"underline",
                                    color:app_theme.app_textColor_primary}}>
                            Conditions:
                        </Text>
                        <View style={{
                                width:"90%",
                                marginLeft:"5%"
                            }}>
                        {/*conditions to be fetched from a remote server*/}
                        <Text style={{
                            color:app_theme.app_textColor_primary
                        }}>1. Product should be in good condition.</Text>
                        <Text style={{
                            color:app_theme.app_textColor_primary
                        }}>2. Product seal must be intact.</Text>
                        </View>
                        
                    </View>
                </View>
            </View>}
        </View>
    )
}

export default AboutScreen;