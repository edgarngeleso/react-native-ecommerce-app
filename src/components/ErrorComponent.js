import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Linking
} from "react-native";
import APPSETTINGS from "../constants/APPSETTINGS";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";

const ErrorComponent = ({error,children})=>{
    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }
    return(
        <View style={{justifyContent:"center",
                      alignItems:"center",
                      height:"100%",
                      width:"100%",
                      }}
            collapsable={false}  
                    >
           
           <View>
               
               {error == "Network request failed"?<View>
               <LottieView
                        source={require("../assets/animations/no-internet1.json")}
                        style={{
                            height:"70%",
                            width:"100%"
                        }}
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
                        loop
                    />
                    <View style={{
                        marginTop:"-30%"
                    }}>

                    <Text style={{fontSize:20,
                                    color:app_theme.app_textColor_primary}}>
                    Not Connected to internet.</Text>
                    <TouchableOpacity 
                        onPress={()=>{
                            //Linking.openURL("app-settings:{3}");
                        }}
                    >
                        <Text style={{fontSize:20,
                                        marginTop:10,
                                        color:app_theme.app_textColor_primary}}>
                        Check your Internet Settings.</Text>
                    </TouchableOpacity>
                    
                    </View>
                    {children}
                   </View>:<Text style={{color:app_theme.app_textColor_primary}}>
                       Ooops an error occurred.</Text>}
            </View>
        </View>
    )
}

export default ErrorComponent;