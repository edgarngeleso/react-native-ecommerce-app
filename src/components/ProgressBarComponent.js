import React from "react";
import {
    View,
    Text,
} from "react-native";
import LottieView from "lottie-react-native";
const ProgressBarComponent = ({isCompleted,text})=>{
    return(
        <View style={{
            height:50,
            width:"25%",
        }}>
            <View style={{
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center",
            }}>
                <View style={{
                    width:30,
                    height:30,
                    borderRadius:15,
                    backgroundColor:isCompleted == true?"#27ae60":"#898992",
                }}>
                    {isCompleted==true?<LottieView
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
                        />:<></>}
                </View>
                <View style={{
                    width:"90%",
                    height:5,
                    backgroundColor:isCompleted == true?"#27ae60":"#898992",
                }}></View>
            </View>
            <Text style={{
                position:"absolute",
                marginTop:30,
                fontSize:12
            }}>
                {text}
            </Text>
        </View>
    )
}

export default ProgressBarComponent;