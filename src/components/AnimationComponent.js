import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Animated
} from "react-native";

const AnimationComponent = ()=>{
    const startAnimation = useRef(new Animated.ValueXY({x:0,y:0,z:0})).current;
    const [iswhite,setiswhite] = useState(false);
    let count = 0;
    useEffect(()=>{
        let id = setInterval(() => {
            Animated.sequence([
                Animated.timing(
                    startAnimation,
                    {
                        toValue:{
                            x:((100*count)+1)/2,
                            y:((200*count)+1)/2,
                            z:100
                        },
                        useNativeDriver:true
                    }
                )
            ])
            .start()

            if(iswhite == false){
                setiswhite(true);
            }else{
                setiswhite(false);
            }
            

            if(count ==5){
                clearInterval(id);
                return;
            }
            count++;
        }, 500);
       
        
    },[])

    return(
        <View>
            <View style={{
                backgroundColor:"white",
                height:100,
                width:"100%"
            }}>

            </View>
            <Animated.View style={{height:"50%",
                                width:"50%",
                                backgroundColor:"white",
                                shadowColor:"grey",
                                shadowOffset:{
                                    width:0,
                                    height:10,
                                },
                                shadowopacity:1,
                                shadowradius:5,
                                elevation:5,
                                position:"absolute",
                                borderWidth:0,
                                transform:[{translateX:startAnimation.x},
                                            {translateY:startAnimation.y},
                                            
                                        ],
                                }}>

            </Animated.View>
        </View>
    )
}

export default AnimationComponent;