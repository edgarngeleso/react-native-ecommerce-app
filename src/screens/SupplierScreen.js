import React,{useState,useEffect} from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    Button,
    TouchableOpacity,
    StyleSheet,
    Modal,
    SafeAreaView,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { useSelector } from "react-redux";
import ErrorComponent from "../components/ErrorComponent";
import APPSETTINGS from "../constants/APPSETTINGS";

const SupplierScreen = ()=>{
    return(
        <View>
            <View style={{
                width:"98%",
                marginLeft:"1%",
            }}>
                <Text>Add product</Text>
                <TouchableOpacity
                    style={{
                        justifyContent:"center",
                        alignItems:"center",
                        width:"100%"
                    }}
                >
                    <Image 
                        source={require("../assets/icons/camera.png")}
                        style={{
                            width:30,
                            height:30
                        }}
                    />
                    <Text>
                        Upload image(s)
                    </Text>
                </TouchableOpacity>
                
                <Text>Product name</Text>
                <TextInput 
                    style={styles.text_input_style}/>
                <Text>
                    Select category
                </Text>
                {/*open sub category based on the category chosen*/}
                <TextInput
                    style={styles.text_input_style}/>
                <Text>
                    Product price
                </Text>
                <TextInput
                    style={styles.text_input_style}/>
                <TouchableOpacity style={styles.touchable_style}>
                    <Text style={{color:"white",fontSize:20}}>
                        Confirm
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const AddProduct = ()=>{
    return(
        <View>
            <View style={{
                width:"98%",
                marginLeft:"1%",
            }}>
                <Text>Add product</Text>
                <TouchableOpacity
                    style={{
                        justifyContent:"center",
                        alignItems:"center",
                        width:"100%"
                    }}
                >
                    <Image 
                        source={require("../assets/icons/camera.png")}
                        style={{
                            width:30,
                            height:30
                        }}
                    />
                    <Text>
                        Upload image(s)
                    </Text>
                </TouchableOpacity>
                
                <Text>Product name</Text>
                <TextInput 
                    style={styles.text_input_style}/>
                <Text>
                    Select category
                </Text>
                {/*open sub category based on the category chosen*/}
                <TextInput
                    style={styles.text_input_style}/>
                <Text>
                    Product price
                </Text>
                <TextInput
                    style={styles.text_input_style}/>
                <TouchableOpacity style={styles.touchable_style}>
                    <Text style={{color:"white",fontSize:20}}>
                        Confirm
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const AddedProducts = ({supplierId})=>{
    return(
        <View>
            <Text>
                Products uploaded by the supplier
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    text_input_style:{
        borderWidth:1,
        borderRadius:5,
        height:30,
    },
    touchable_style:{
        width:"100%",
        height:35,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#27ae60",
        borderRadius:5,
        marginTop:5
    }
})
export default SupplierScreen;