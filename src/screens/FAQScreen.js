import React,{useState} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet
} from "react-native";
import APPSETTINGS from "../constants/APPSETTINGS";
import HeaderComponent from "../components/HeaderComponent";
import SearchIcon from "../components/SearchIcon";
import IsLoadingComponent from "../components/IsLoadingComponent";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from "react-redux";
const Stack = createNativeStackNavigator();

const FAQScreen = ({navigation})=>{
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
                                color:app_theme.app_textColor_primary,margin:5}}>FAQ</Text>

                </View>
            {isloading == true?<IsLoadingComponent/>:
            <View style={{
                width:"100%"
            }}>
                <Text 
                style={{
                    textAlign:"center",
                    textDecorationLine:"underline",
                    fontWeight:"bold",
                    fontSize:20,}}>Frequently Asked Questions</Text>
                <View style={styles.view_style}>
                    <Text style={styles.text_style}>1. How does Market work?</Text>
                </View>
                <View style={styles.view_style}>
                    <Text style={styles.text_style}>2. When is a refund rendered invalid?</Text>
                </View>
                <View style={styles.view_style}>
                    <Text style={styles.text_style}>3. Which payment methods does market accept?</Text>
                </View>
                <View style={styles.view_style}>
                    <Text style={styles.text_style}>4. How do I get my product after purchasing in market?</Text>
                </View>
            </View>}
            
        </View>
    )
}

const styles = StyleSheet.create({
    view_style:{
        width:"98%",
        marginBottom:10,
        marginLeft:"1%",
    },
    text_style:{
        fontSize:18,
        color:"green",
    }
})
export default FAQScreen;