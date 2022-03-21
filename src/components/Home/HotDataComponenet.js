import React,{useState,useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Button,
    FlatList,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    Alert,
    Modal,
} from "react-native";
import DUMMYDATA from "../../constants/DUMMYDATA";
import APPSETTINGS from "../../constants/APPSETTINGS";
import IsLoadingComponent from "../IsLoadingComponent";
import ProductModalComponent from "../ProductModalComponent";
import { useSelector, useDispatch } from "react-redux";


//Horizontal data display ie highly rated
const HotDataComponent = ({navigation})=>{
    const url = "https://dreamrise.000webhostapp.com/api/api.php?home_hot=all";
    const [hotDeals,sethotDeals] = useState({data:""});
    const [loading,setloading] = useState(true);
    const [ismodalopen,setismodalopen] = useState({index:0,state:false});
    //const products = [1,2,3,4,5,6,7,8,9,10];
    const fetch_data = ()=>{
        fetch(url).
        then(response=>response.json()).
        then(data=>{
            sethotDeals({data:data});
            setloading(false);
        }).
        catch(error=>{
            
        })
    }
    useEffect(()=>{fetch_data()},[]);

    const closeModal = ()=>{
        setismodalopen({...ismodalopen,state:false});
    }

    const openModal = (index)=>{
        setismodalopen({index:index,state:true});
    }

    const toggle_modal = ()=>{
        ismodalopen==true?setismodalopen(false):setismodalopen(true);
    }

    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }
    
    const key_extractor = (item)=>{
        return item.pid;
    }

    //hide bottom tabs
    const dispatch = useDispatch();
    const HideBottomTabs = ()=>{
        dispatch(
            {
                type:"TOGGLE_BOTTOM_TABS",
                payload:false
            })
    }
    const render_item = ({item,index})=>{
     return(
         <View collapsable={false}>
            <View 
                style={styles.view_style}>

                <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={()=>{openModal(index)}}
                >
                    <Image
                        source={item.product_image==""?require("../../assets/icons/image.png"):{uri: item.product_image}}
                        resizeMode="cover"
                        style = {{...styles.image_style,
                            tintColor:item.product_image == ""?"grey":null}}
                    />
                </TouchableOpacity>

                <Image
                    source={require("../../assets/icons/hot.png")}
                    resizeMode="cover"
                    style={{position:"absolute",
                            height:30,
                            width:30,
                            marginLeft:2}}
                />
                
                <TouchableOpacity 
                    style={{...styles.button_style,
                            backgroundColor:"#27ae60"/*theme== ""?app_theme.app_button_backgroundColor:app_theme.app_box_backgroundColor*/}}
                    onPress={()=>{
                            HideBottomTabs();
                            navigation.navigate("Show More",{
                                        id:item.pid,
                                        name:item.product_name,
                                        price:item.product_price,
                                        image:item.product_image,
                                        category:item.product_category,
                                        rating:item.product_rating,
                                        description:item.product_description,
                                    })}}
                    >
                    <Text style={{fontSize:18,
                                color:"white"}}>
                        {item.product_name}
                    </Text>
                    <Text
                        style={styles.text_style}
                    >Ksh. {item.product_price}</Text>
                </TouchableOpacity>
            </View>
         </View>
     )
 }
 return(
    <View>
    {loading == true?<IsLoadingComponent/>:
        <View>
            <Modal
                transparent
                animationType="slide"
                visible={ismodalopen.state}
                onRequestClose={closeModal}
                >
                <ProductModalComponent 
                    productName={hotDeals.data[ismodalopen.index].product_name} 
                    productPrice={hotDeals.data[ismodalopen.index].product_price} 
                    imageUri={hotDeals.data[ismodalopen.index].product_image}
                    >
                        
                    <TouchableOpacity
                        activeOpacity={0.8} 
                        style={{
                            width:"60%",
                            height:40,
                            borderRadius:10,
                            backgroundColor:"white",
                            alignItems:"center",
                            justifyContent:"center",
                                }}
                                onPress={()=>{
                                    HideBottomTabs();
                                    setismodalopen({...ismodalopen,state:false});
                                    navigation.navigate("Show More",{
                                    id:hotDeals.data[ismodalopen.index].pid,
                                    name:hotDeals.data[ismodalopen.index].product_name,
                                    price:hotDeals.data[ismodalopen.index].product_price,
                                    image:hotDeals.data[ismodalopen.index].product_image,
                                    category:hotDeals.data[ismodalopen.index].product_category,
                                    rating:hotDeals.data[ismodalopen.index].product_rating,
                                    description:hotDeals.data[ismodalopen.index].product_description
                                })}}
                                >
                        <Text style={{color:"green",fontSize:20}}>
                            -- View more --
                        </Text>
                    </TouchableOpacity>
                </ProductModalComponent>
            </Modal>
            <FlatList 
                horizontal = {true}
                data = {hotDeals.data/*DUMMYDATA[0].items*/}
                renderItem = {render_item}
                keyExtractor = {key_extractor}
                showsHorizontalScrollIndicator = {false}
            />
        </View>}
    </View>

 )
}
const styles = StyleSheet.create({
    view_style:{
        flex:1,
        flexDirection:"column",
        width:300,
        height:190,
        borderRadius:10,
        marginLeft:5,
        backgroundColor:"white",
    },
    image_style:{
        width:"100%",
        height:"100%",
        borderRadius:10
    },
    text_style:{
        color:"white",
        fontSize:15,
        fontStyle:"italic"
    },
    button_style:{
        position:"absolute",
        alignItems:"center",
        justifyContent:"center",
        height:40,
        width:"80%",
        marginTop:150,
        marginLeft:"20%",
        borderBottomRightRadius:10,
        borderTopLeftRadius:10,
        zIndex:5
    }
})
export default HotDataComponent;