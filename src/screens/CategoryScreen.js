import React,{useState,useEffect} from "react";
import {
    View,
    Text,
    Alert,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
    Modal,
    StyleSheet,
    BackHandler
} from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import IsLoadingComponent from "../components/IsLoadingComponent";
import ErrorComponent from "../components/ErrorComponent";
import SearchIcon from "../components/SearchIcon";
import ProductsScreen from "./ProductsScreen";
import APPSETTINGS from "../constants/APPSETTINGS";
import { useSelector, useDispatch } from "react-redux";
import DUMMYDATA from "../constants/DUMMYDATA";
import ProductCardComponent from "../components/ProductCardComponent";

const CategoryScreen = ({navigation,route})=>{
    const {category} = route.params!==undefined?route.params:{category:""};
    const [isList,setisList] = useState("list");
    const [list_grid,setlist_grid] = useState({img:require("../assets/icons/list.png"),});
    const [isLoading,setisLoading] = useState(true);
    const [products,setproducts] = useState({data:""});
    const [err,seterr] = useState({state:false,
        message:"",});
    const [ismodalopen,setismodalopen] = useState(false);
    //fetch all products
    const fetch_data = ()=>{
    const url = "https://dreamrise.000webhostapp.com/api/api.php";
    const formdata = new FormData();
    formdata.append("products",category);
    fetch(url,{
        method:"POST",
        body:formdata
    })
    .then(response=>response.json())
    .then(data=>{
        setproducts({data:data});
        setisLoading(false);
    })
    .catch(error=>{seterr({state:true,
                    message:error.message})})
    }
    
    const reload = ()=>{
        setisLoading(true);
        seterr({...err,state:false});
        fetch_data();
         }
   useEffect(()=>{reload();},[])

    //toggle list and grid
    const toggleLisGrid = ()=>{
        if(isList == "list"){
            setlist_grid({img:require("../assets/icons/grid.png")});
            setisList("grid");
        }else if(isList == "grid"){
            setlist_grid({img:require("../assets/icons/list.png")})
            setisList("list");
        }
     }

     const toggle_modal = ()=>{
        ismodalopen==true?setismodalopen(false):setismodalopen(true);
    }

    //update bottom tabs display
    const bottomTabsState = useSelector(state=>state.Reducer.BottomTabsDisplayed);
    const dispatch = useDispatch();
    useEffect(()=>{
        //hide bottom tabs
        dispatch(
           {
               type:"TOGGLE_BOTTOM_TABS",
               payload:false
           })
    },[])

    const DisplayBottomTabs = ()=>{
        dispatch(
            {
                type:"TOGGLE_BOTTOM_TABS",
                payload:true
            })
    }

    BackHandler.addEventListener("hardwareBackPress",()=>{
        //navigation.goBack();
        DisplayBottomTabs();
    })
    /*****************/

    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }else{
        app_theme = APPSETTINGS.colors.default;
    }

    const cartItems = useSelector(state=>state.Reducer.selectedItems.items);
    return(
        <View style={{
            backgroundColor:app_theme.app_primary,
            width:"100%",
            height:"100%",
        }}>
            <View style={{
                width:"100%",
                height:50,
                backgroundColor:app_theme.app_header_backgroundColor,
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
                                DisplayBottomTabs();
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
            </View>
            <SearchIcon navigation={navigation}/>
            {err.state == true?<ErrorComponent error={err.message}>
                <TouchableOpacity 
                    onPress = {reload}
                    style={{width:"100%",
                            justifyContent:"center",
                            alignItems:"center",
                            marginTop:10,}}>
                    <Text style={{fontSize:20,
                                color:"green"}}>
                                Retry...
                    </Text>
                            
                </TouchableOpacity>
            </ErrorComponent>:
                <View>
                {isLoading==true?<IsLoadingComponent/>:<View><ScrollView 
                    style={{
                        marginBottom:110,
                        }}>
                    <Modal 
                            transparent
                            visible={ismodalopen}
                            animationType="slide"
                            onRequestClose={toggle_modal}
                            >
                            <View style={{
                                backgroundColor:"#00000099",
                                height:"100%",
                                width:"100%"
                            }}>
                                <TouchableOpacity style={{
                                    width:"100%",
                                    height:"30%"
                                }}
                                onPress={()=>setismodalopen(false)}
                                >

                                </TouchableOpacity>
                                <View style={{
                                    width:"100%",
                                    height:"100%",
                                    marginTop:"0%",
                                    borderRadius:20,
                                    backgroundColor:app_theme.app_bottomTabs_backgroundColor,
                                }}>
                                    <Text style={{...styles.modal_text_style,
                                                    textAlign:"center",
                                                    textDecorationLine:"underline"}}>
                                        Sort by:
                                    </Text>
                                    <View style={{marginLeft:"10%"}}>
                                        <View>
                                            <Text style={styles.modal_text_style}>
                                                Price:
                                            </Text>
                                            <View style={{
                                                flexDirection:"row",
                                                justifyContent:"space-between"
                                            }}>
                                                <TextInput 
                                                    placeholder="minimum"
                                                    style={{
                                                        borderWidth:1,
                                                        height:40,
                                                        width:"48%",
                                                        borderRadius:10,
                                                        padding:10,
                                                        fontSize:18
                                                    }}
                                                    />
                                                <TextInput  
                                                placeholder="maximum"
                                                style={{
                                                    borderWidth:1,
                                                    height:40,
                                                    width:"48%",
                                                    borderRadius:10,
                                                    marginLeft:10,
                                                    padding:10,
                                                    fontSize:18
                                                }}
                                                />
                                            </View>
                                        </View>
                                        
                                        <TouchableOpacity style={styles.modal_touchable_style}>
                                            <Text style={styles.modal_text_style}>
                                                Highly rated
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.modal_touchable_style}>
                                            <Text style={styles.modal_text_style}>
                                                Most popular
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.modal_touchable_style}>
                                            <Text style={styles.modal_text_style}>
                                                Newly added
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.modal_touchable_style}>
                                            <Text style={styles.modal_text_style}>
                                                A-Z
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={{
                                            width:"60%",
                                            height:30,
                                            backgroundColor:app_theme.app_button_backgroundColor,
                                            alignItems:"center",
                                            justifyContent:"center",
                                            marginLeft:"40%",
                                            borderRadius:10,
                                            marginTop:10
                                            }}
                                        onPress={()=>setismodalopen(false)}
                                    >
                                        <Text style={{fontSize:20,color:"white"}}>
                                            Apply 
                                        </Text>
                                    </TouchableOpacity>
                                    
                                </View>
                            </View>
                        </Modal>

                    <View style={{flexDirection:"row",
                                justifyContent:"space-between",
                                marginTop:10,
                                backgroundColor:app_theme.app_box_backgroundColor,
                                height:40,
                                width:"98%",
                                marginLeft:"1%",
                                borderRadius:5}}>

                        <TouchableOpacity 
                            onPress={toggle_modal}
                            style={{
                                height:"100%"
                            }}
                        >
                            <Image
                                source={require("../assets/icons/funnel.png")}
                                style={{
                                    width:25,
                                    height:"80%",
                                    tintColor:app_theme.app_image_tinColor,
                                    margin:5,
                                }}
                            />
                        </TouchableOpacity>
                        

                        <Text style={{
                            fontSize:20,
                            fontWeight:"bold",
                            color:app_theme.app_textColor_primary
                        }}>
                        {category}
                        </Text>

                        <TouchableOpacity
                            onPress={toggleLisGrid}
                        >
                        <Image
                            source={list_grid.img}
                            style={{
                                width:40,
                                height:"100%",
                                tintColor:app_theme.app_image_tinColor,
                                marginRight:10,
                            }}
                        />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexWrap:"wrap",
                        flexDirection:isList=="list"?"column":"row",
                        justifyContent:"space-between",
                        }}>
                        <ProductCardComponent 
                            products={/*DUMMYDATA.map(item=>item.items)*/products.data} 
                            isList={isList} 
                            navigation={navigation}>
                        </ProductCardComponent>
                    </View>
                </ScrollView>
            </View>}
            
        </View>}
    </View>
    )
}

const styles = StyleSheet.create({
    modal_text_style:{
        fontSize:20,
    },
    modal_touchable_style:{
        marginTop:10,
    }
})
export default CategoryScreen;