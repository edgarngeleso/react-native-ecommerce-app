import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    ScrollView,
    Dimensions
} from "react-native";
import ImageZoom from "react-native-image-pan-zoom";

const ProductModalComponent = ({productName,productPrice,imageUri,children})=>{
    return(
        <View style={{
            alignItems:"center",
            justifyContent:"center",
            backgroundColor:"#00000099",
            height:"100%",
            width:"100%"
        }}>
            <Text style={{color:"white",
                        fontSize:20}}>{productName}</Text>
            <Text style={{color:"white",
                        fontSize:20}}>Ksh.{productPrice}</Text>
            <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height-150}
                       imageWidth={Dimensions.get('window').width}
                       imageHeight={400}>
                <Image
                    source={{uri:imageUri}}
                    resizeMode="contain"
                    style={{width:"98%",
                            height:"85%",
                            marginTop:5,
                            borderRadius:10,
                            }}
                />
            </ImageZoom>
              {children}          
        </View>
    )
}

export default ProductModalComponent;