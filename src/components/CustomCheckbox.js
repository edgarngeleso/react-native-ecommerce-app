import React,{useState} from "react";
import { Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CheckBox from 'react-native-check-box';

const CustomCheckbox = (props)=>{
    const [ischecked,setischecked] = useState(false);
    const toggle_ischecked = ()=>{
        if(ischecked == false){
            setischecked(true);
        }else{
            setischecked(false);
        }
    }
    return(
        <View>
            <BouncyCheckbox
            size={25}
            fillColor={ischecked==true?"green":"white"}
            unfillColor="#FFFFFF"
            text={props.text}
            iconStyle={{ borderColor: "green" }}
            textStyle={{ fontFamily: "JosefinSans-Regular",fontSize:23,textDecorationLine: "none", }}
            onPress={toggle_ischecked}
                > </BouncyCheckbox>
            {ischecked == true?props.children:<></>}
        </View>
        
    )
}

export default CustomCheckbox;