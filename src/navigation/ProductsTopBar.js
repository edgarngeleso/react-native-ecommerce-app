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
} from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import SearchIcon from "../components/SearchIcon";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DUMMYDATA from "../constants/DUMMYDATA";

const Tab = createMaterialTopTabNavigator();

const CustomScreen = ({navigation,route})=>{
    const [isList,setisList] = useState("list");
    const [list_grid,setlist_grid] = useState({img:require("../assets/icons/list.png"),});

    const [products,setproducts] = useState({data:""});
    const [isLoading,setisLoading] = useState(true);

    //const {category} = route.params!==undefined?route.params:{category:""};
    //const products = [1,2,3,4,5,6,7,8,9,10];

    //fetch all products
    const fetch_data = ()=>{
        const url = "https://dreamrise.000webhostapp.com/api/api.php";
        const formdata = new FormData();
        formdata.append("products",route.name);
        fetch(url,{
            method:"POST",
            body:formdata
        }).
        then(response=>response.json()).
        then(data=>{
            setproducts({data:data});
            setisLoading(false);
        }).
        catch(error=>{
            Alert.alert("Error","Unable to fetch products",[
                {text:"Try again",onPress:()=>{}},
                {text:"cancel",onPress:()=>{} }
            ])
        })
    }
    
    useEffect(()=>{
        fetch_data();
    },[])

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

     console.log(route.params);
    return(
        <View>
            {isLoading==true?<View style={{justifyContent:"center",
                                        alignItems:"center",
                                        height:"100%",
                                        width:"100%"}}>
                <ActivityIndicator 
                    size="large"
                    color="00ff00"
                    style={{height:50,
                            width:40,
                        }}
                    /></View>:
            <View>
                <HeaderComponent navigation={navigation}/>
                <SearchIcon navigation={navigation}/>
                <ScrollView 
                    style={{
                        marginBottom:185,
                        }}>

                        
                    <View style={{
                        flexWrap:"wrap",
                        flexDirection:isList=="list"?"column":"row",
                        justifyContent:"space-between",
                        }}>
                        {products.data.map(item=>{
                            return(
                                <View>
                                    <Modal>
                            
                                    </Modal>
                                    <TouchableOpacity 
                                        style={{
                                            flexDirection:isList=="list"?"row":"column",
                                            marginTop:10,
                                            width:isList=="list"?"100%":"48%",
                                            backgroundColor:"white",
                                            borderRadius:5
                                            }} 
                                        key={item.pid} 
                                        onPress={()=>navigation.navigate("Show More",{
                                            id:item.pid,
                                            name:item.product_name,
                                            price:item.product_price,
                                            image:item.product_image,
                                            rating:item.product_rating,
                                            description:item.product_description
                                        })}>
                                            <Image
                                                source={{uri:item.product_image}}
                                                resizemode="cover"
                                                style={{
                                                    width:isList=="list"?"50%":"100%",
                                                    height:100,
                                                    borderRadius:5,
                                                }}
                                            />
                                        <View style={{marginLeft:10,}}>
                                        <Text style={{fontSize:20,}}>
                                                {item.product_name}
                                            </Text>
                                            <Text style={{fontSize:20,}}>
                                                ksh.{item.product_price}
                                            </Text>
                                            <Text style={{fontSize:17,}}>
                                                Availability:In stock
                                            </Text>
                                            <View style={{flexDirection:"row",}}>
                                                <Text style={{fontSize:17,}}>
                                                    rating:{item.product_rating}
                                                </Text>
                                                <Image
                                                    source={item.product_rating>4?require("../assets/icons/star1.png"):require("../assets/icons/star.png")}
                                                    resizeMode="cover"
                                                    style={{
                                                        width:20,
                                                        height:20,
                                                        marginLeft:5,
                                                    }}
                                                    />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>}
        </View>
    )
}


function ProductsTopBar() {
    const [categories,setcategories] = useState({data:""});
    const [isLoading,setisLoading] = useState(true);
    //fetch all categories
    const fetch_data = ()=>{
        const url = "https://dreamrise.000webhostapp.com/api/api.php?home_products=all";
        const formdata = new FormData();
        
        fetch(url).
        then(response=>response.json()).
        then(data=>{
            setcategories({data:data});
            setisLoading(false);
        }).
        catch(error=>{
            Alert.alert("Error","Unable to fetch products",[
                {text:"Try again",onPress:()=>{}},
                {text:"cancel",onPress:()=>{} }
            ])
        })
    }
    
    useEffect(()=>{
        fetch_data();
    },[])
  return (
    <Tab.Navigator
        tabBarPosition="bottom"
        style={{
            marginBottom:100,
        }}
        screenOptions={{
        tabBarLabelStyle: { fontSize: 11 },
        tabBarItemStyle: { width: 100, height:"100%",borderRadius:10 },
        tabBarStyle: { backgroundColor: 'white',width:400 },
        tabBarActiveTintColor:"green",
        tabBarScrollEnabled:true,
        tabBarBounces:true,
        lazy:true,
        tabBarInactiveTintColor:"black",
        tabBarIndicator:()=>null
      }}
    >
        {categories.map(item=>{
            return(
                <Tab.Screen name={item.category} component={CustomScreen} />
            )
        })}  
    </Tab.Navigator>
  );
}


const ProductsScreen = ()=>{
    const [isLoading,setisLoading] = useState(true);
    const url = "https://dreamrise.000webhostapp.com/api/api.php?home_products=all";
    fetch(url).
    then(response=>response.json()).
    then(data=>{
        setproducts({data:data});
        setisLoading(false);
    }).
    catch(error=>{
        Alert.alert("Error","Unable to fetch products",[
            {text:"Try again",onPress:()=>{}},
            {text:"cancel",onPress:()=>{} }
        ])
    })
    
    useEffect(()=>{
        fetch_data();
    },[])
    return(
        <View>
            {isLoading==true?<View style={{justifyContent:"center",
                                        alignItems:"center",
                                        height:"100%",
                                        width:"100%"}}>
                <ActivityIndicator 
                    size="large"
                    color="00ff00"
                    style={{height:50,
                            width:40,
                        }}
                    /></View>:<View>
                        <ProductsTopBar/>
                        </View>}
        </View>
    )
}

export default ProductsScreen;