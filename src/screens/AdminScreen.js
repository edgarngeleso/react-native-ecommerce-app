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
    BackHandler
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ErrorComponent from "../components/ErrorComponent";
import AddProduct from "../components/profile/AddProduct";
import APPSETTINGS from "../constants/APPSETTINGS";

const AdminScreen = ({navigation})=>{
    const [openWindow,setopenWindow] = useState(0);
    
    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }
    return(
        <ScrollView style={{
            width:"100%",
            height:"100%"
        }}>
            <View style={{
                width:"98%",
                justifyContent:"space-between",
                marginLeft:"1%",
                flexDirection:"row"
            }}>
                <TouchableOpacity 
                onPress={()=>setopenWindow(0)}
                style={{
                    height:35,
                    width:"30%",
                    borderRadius:5,
                    justifyContent:"center",
                    alignItems:"center"
                }}>
                    <Text style={{
                        fontSize:18,
                        color:theme == ""?openWindow ==0?"#27ae60":"black":openWindow ==0?"#27ae60":"white",
                        textDecorationLine:openWindow ==0?"underline":null,
                    }}>
                        Add product
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>setopenWindow(1)}
                style={{
                    height:35,
                    width:"30%",
                    borderRadius:5,
                    justifyContent:"center",
                    alignItems:"center"
                }}>
                    <Text style={{
                        fontSize:18,
                        color:theme == ""?openWindow ==1?"#27ae60":"black":openWindow ==1?"#27ae60":"white",
                        textDecorationLine:openWindow ==1?"underline":null,
                    }}>
                        Add Supplier
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>setopenWindow(2)}
                style={{
                    height:35,
                    width:"30%",
                    borderRadius:5,
                    justifyContent:"center",
                    alignItems:"center"
                }}>
                    <Text style={{
                        fontSize:18,
                        color:theme == ""?openWindow ==2?"#27ae60":"black":openWindow ==2?"#27ae60":"white",
                        textDecorationLine:openWindow ==2?"underline":null,
                    }}>
                        Add User
                    </Text>
                </TouchableOpacity>
            </View>
                {
                    openWindow == 0?
                    <AddProduct/>:
                    openWindow==1?
                    <AddSupplier/>:
                    openWindow==2?
                    <AddUser/>:null
                }
        </ScrollView>
    )
}

const AddSupplier = ()=>{
    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }
    return(
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
                }}>Add Supplier</Text>
            <Image/>
            <Text style={{
                color:app_theme.app_textColor_primary,
            }}>First name</Text>
            <TextInput 
                underlineColorAndroid={"transparent"}
                style={{...styles.text_input_style,
                borderColor:app_theme.app_textInput_borderColor,
                color:app_theme.app_textColor_primary}}/>
            <Text style={{
                color:app_theme.app_textColor_primary,
            }}>
                Second name
            </Text>
            <TextInput
                underlineColorAndroid={"transparent"}
                style={{...styles.text_input_style,
                borderColor:app_theme.app_textInput_borderColor,
                color:app_theme.app_textColor_primary}}/>
            <Text style={{
                color:app_theme.app_textColor_primary,
            }}>
                User name
            </Text>
            <TextInput
                underlineColorAndroid={"transparent"}
                style={{...styles.text_input_style,
                borderColor:app_theme.app_textInput_borderColor,
                color:app_theme.app_textColor_primary}}/>
            <Text style={{
                color:app_theme.app_textColor_primary,
            }}>
                Email
            </Text>
            <TextInput
                underlineColorAndroid={"transparent"}
                style={{...styles.text_input_style,
                borderColor:app_theme.app_textInput_borderColor,
                color:app_theme.app_textColor_primary}}/>
            <Text style={{
                color:app_theme.app_textColor_primary,
            }}>
                Phone Number
            </Text>
            <TextInput
                underlineColorAndroid={"transparent"}
                style={{...styles.text_input_style,
                borderColor:app_theme.app_textInput_borderColor,
                color:app_theme.app_textColor_primary}}/>
            <Text style={{
                color:app_theme.app_textColor_primary,
            }}>
                Supplier products type
            </Text>
            <TextInput
                underlineColorAndroid={"transparent"}
                style={{...styles.text_input_style,
                borderColor:app_theme.app_textInput_borderColor,
                color:app_theme.app_textColor_primary}}/>

            <TouchableOpacity style={styles.touchable_style}>
                <Text style={{color:"white",fontSize:20}}>
                    Add Supplier
                </Text>
            </TouchableOpacity>

            <View style={{
                width:"98%",
                marginLeft:"1%"
            }}>
                <Text style={{
                    textAlign:"center",
                    textDecorationLine:"underline",
                    fontSize:20,
                    fontWeight:"bold"
                }}>Suppliers</Text>
                    <Text>Products suppliers</Text>
            </View>


        </View>
    )
}

const AddUser = ()=>{
    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }
    return(
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
                }}>Add User</Text>
            <Image/>
            <Text style={{
                color:app_theme.app_textColor_primary,
            }}>First name</Text>
            <TextInput 
                underlineColorAndroid={"transparent"}
                style={{...styles.text_input_style,
                borderColor:app_theme.app_textInput_borderColor,
                color:app_theme.app_textColor_primary}}/>
            <Text style={{
                color:app_theme.app_textColor_primary,
            }}>
                Second name
            </Text>
            <TextInput
                underlineColorAndroid={"transparent"}
                style={{...styles.text_input_style,
                borderColor:app_theme.app_textInput_borderColor,
                color:app_theme.app_textColor_primary}}/>
            <Text style={{
                color:app_theme.app_textColor_primary,
            }}>
                User name
            </Text>
            <TextInput
                underlineColorAndroid={"transparent"}
                style={{...styles.text_input_style,
                borderColor:app_theme.app_textInput_borderColor,
                color:app_theme.app_textColor_primary}}/>
            <Text style={{
                color:app_theme.app_textColor_primary,
            }}>
                Email
            </Text>
            <TextInput
                underlineColorAndroid={"transparent"}
                style={{...styles.text_input_style,
                borderColor:app_theme.app_textInput_borderColor,
                color:app_theme.app_textColor_primary}}/>
            <Text style={{
                color:app_theme.app_textColor_primary,
            }}>
                Phone Number
            </Text>
            <TextInput
                underlineColorAndroid={"transparent"}
                style={{...styles.text_input_style,
                borderColor:app_theme.app_textInput_borderColor,
                color:app_theme.app_textColor_primary}}/>
            <TouchableOpacity style={styles.touchable_style}>
                <Text style={{color:"white",fontSize:20}}>
                    Add User
                </Text>
            </TouchableOpacity>

            <View style={{
                width:"98%",
                marginLeft:"1%"
            }}>
                <Text style={{
                    textAlign:"center",
                    textDecorationLine:"underline",
                    fontSize:20,
                    fontWeight:"bold"
                }}>Users</Text>
                    <Text>App users </Text>
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

export default AdminScreen;