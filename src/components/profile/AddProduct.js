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
    ActivityIndicator,
    BackHandler,
    Alert,
    ToastAndroid
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ErrorComponent from "../../components/ErrorComponent";
import APPSETTINGS from "../../constants/APPSETTINGS";
import GetSupplierProducts from "./GetSupplierProducts";
import {launchCamera,launchImageLibrary} from "react-native-image-picker";

const AddProduct = ({userId})=>{
    const [selected_images,setselected_images] = useState(null);
    const theme = useSelector(state=>state.Reducer.selectedTheme);
    const [uploading,setUploading] = useState({
        loading:false,
        state:false,
        message:""
    });
    const url = "https://dreamrise.000webhostapp.com/api/api.php";
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }
    //select images
    const select_images = async ()=>{
        const result = await launchImageLibrary({selectionLimit:0,mediaType:"photo"});
        setselected_images(result);
    }
    //add product
    const add_a_product = ()=>{
        let formdata = new FormData();
        if(selected_images == null){
            Alert.alert("No image(s) selected",
                        "Select images before confirming.",
                        [{text:"Cancel",onPress:()=>{}},{text:"Select",onPress:()=>{select_images()}}]);
            return false;
        }
        for(let i = 0;i<selected_images.assets.length;i++){
            formdata.append("add_product_images[]",{
                name:selected_images.assets[i].fileName,
                type:selected_images.assets[i].type,
                size:selected_images.assets[i].fileSize,
                uri:selected_images.assets[i].uri
            });
        }
        formdata.append("add_product_name","Electric circuit");
		formdata.append("add_product_price", 7000);
		formdata.append("add_product_category","electric");
		formdata.append("add_product_description","An awesome product. It'll meet your daily needs.");
        setUploading({
            loading:true,
            state:false,
            message:""
        })
        fetch(url,{
            method:"POST",
            body:formdata
        }).
        then(response=>response.json()).
        then(data=>{
            setUploading({
                loading:false,
                state:data.error,
                message:data.mesage
            })
        }).catch(error=>{
            setUploading({
                loading:false,
                state:true,
                message:error.message
            })
        })
    }

    return(
        <View style={{
            width:"100%",
            height:"100%"
        }}>
            <View style={{
                width:"98%",
                marginLeft:"1%",
            }}>
                <Text style={{
                    textAlign:"center",
                    textDecorationLine:"underline",
                    fontSize:20,
                    fontWeight:"bold",
                    color:app_theme.app_textColor_primary,
                }}>Add product</Text>
                <Text style={{
                    color:uploading.state == true?"red":"green"
                }}>{uploading.message}</Text>
                <View style={{
                            flexDirection:"row",
                            marginTop:10,
                            width:"100%",
                            backgroundColor:app_theme.app_box_backgroundColor,
                            borderRadius:10,
                            flexWrap:"wrap"
                            }} >
                    {selected_images == null?<></>:
                    selected_images.assets.map((selected_image,index)=>{
                        return(
                            <View 
                                key={index}
                                style={{
                                    width:"30%",
                                    height:120,
                                    margin:"1%",
                                    borderRadius:10,
                                }}>
                                <Image
                                    source={{uri:selected_image.uri}}
                                    style={{
                                        width:"90%",
                                        height:120,
                                        borderRadius:10,
                                    }}
                                />
                                <TouchableOpacity 
                                
                                onPress={()=>{
                                    setUploading({
                                        loading:false,
                                        state:false,
                                        message:""
                                        })
                                    //slice images
                                   let new_Arr = selected_images.assets.splice(index,1);
                                   if(selected_images.assets == ""){
                                       setselected_images(null);
                                   }else{
                                        let updated = "";
                                        setselected_images({assets:selected_images.assets}); 
                                   }
                                }}
                                style={{
                                    position:"absolute",
                                    justifyContent:"center",
                                    alignItems:"center",
                                    width:30,
                                    height:30,
                                    borderRadius:15,
                                    backgroundColor:"white",
                                    marginLeft:"53%"
                                }}>
                                    <Image
                                        source={require("../../assets/icons/delete.png")}
                                        style={{
                                            tintColor:"red",
                                            width:25,
                                            height:25
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                    <TouchableOpacity
                        onPress={select_images}
                        style={{
                            justifyContent:"center",
                            alignItems:"center",
                            width:selected_images == null?"100%":"30%",
                            height:120,
                            backgroundColor:app_theme.app_box_backgroundColor,
                            margin:"1%",
                            borderRadius:10,
                        }}
                        >
                        <Image 
                            source={require("../../assets/icons/camera.png")}
                            style={{
                                width:30,
                                height:30,
                                tintColor:app_theme.app_image_tinColor,
                            }}
                        />
                        <Text style={{
                            color:app_theme.app_textColor_primary
                        }}>
                            Upload image(s)
                        </Text>
                    </TouchableOpacity>
                </View>
                
                
                <Text style={{
                    color:app_theme.app_textColor_primary,
                    }}>Product name</Text>
                <TextInput 
                    underlineColorAndroid={"transparent"}
                    placeholderTextColor={app_theme.app_textColor_primary}
                    style={{...styles.text_input_style,
                            borderColor:app_theme.app_textInput_borderColor,
                            color:app_theme.app_textColor_primary}}/>
                <Text style={{
                    color:app_theme.app_textColor_primary,
                    }}>
                    Select category
                </Text>
                {/*open sub category based on the category chosen*/}
                <TextInput
                    underlineColorAndroid={"transparent"}
                    placeholderTextColor={app_theme.app_textColor_primary}
                    style={{...styles.text_input_style,
                            borderColor:app_theme.app_textInput_borderColor,
                            color:app_theme.app_textColor_primary}}/>
                <Text style={{
                    color:app_theme.app_textColor_primary,
                    }}>
                    Product price
                </Text>
                <TextInput
                    underlineColorAndroid={"transparent"}
                    placeholderTextColor={app_theme.app_textColor_primary}
                    style={{...styles.text_input_style,
                            borderColor:app_theme.app_textInput_borderColor,
                            color:app_theme.app_textColor_primary}}/>
                <Text style={{
                    color:app_theme.app_textColor_primary,
                    }}>
                    Product description
                </Text>
                <TextInput
                    underlineColorAndroid={"transparent"}
                    placeholderTextColor={app_theme.app_textColor_primary}
                    style={{...styles.text_input_style,
                            borderColor:app_theme.app_textInput_borderColor,
                            color:app_theme.app_textColor_primary}}/>
                <TouchableOpacity 
                
                onPress={add_a_product}
                style={styles.touchable_style}>
                    {uploading.loading == true?
                    <ActivityIndicator
                        color="white"
                        size="large"
                    />
                    :<Text style={{color:"white",fontSize:20}}>
                        Confirm
                    </Text>}
                    
                </TouchableOpacity>
            </View>
            <View style={{
                width:"98%",
                marginLeft:"1%",
                marginTop:5
            }}>
                <Text style={{
                    textAlign:"center",
                    textDecorationLine:"underline",
                    fontSize:20,
                    fontWeight:"bold"
                }}>My products</Text>
                
                <GetSupplierProducts/>
            </View>
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

export default AddProduct;