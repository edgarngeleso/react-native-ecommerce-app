import React from "react";
import { 
    Text,
    View,
    Image,
    ScrollView } from "react-native";
import { useSelector } from "react-redux";
const DescriptionModalComponent = ({description})=>{
    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }else{
        app_theme = APPSETTINGS.colors.default;
    }
    return(
        <View style= {{
            backgroundColor:app_theme.app_box_backgroundColor,
            height:"100%",
            width:"100%",
            marginTop:"0%",
            borderRadius:20,
        }}>
            <Text 
                style={{
                    textAlign:"center",
                    margin:5,
                    fontSize:20,
                    fontWeight:"bold",
                    textDecorationLine:"underline"
                }}
            >Product description</Text>
            <View style= {{
            margin:"1.5%",
            borderRadius:20,
            width:"97%",
            backgroundColor:theme == ""?"whitesmoke":app_theme.app_box_backgroundColor,
            borderRadius:5,
            }}>
                
                <Text style={{color:app_theme.app_textColor_primary,
                            paddingLeft:10,
                            fontSize:18}}>{description}</Text>
            </View>
            
        </View>
    )
}
export default DescriptionModalComponent;