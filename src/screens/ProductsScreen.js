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
    BackHandler
} from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import SearchIcon from "../components/SearchIcon";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LottieView from "lottie-react-native";
import DUMMYDATA from "../constants/DUMMYDATA";
import ShowMoreScreen from "./ProductMoreScreen";
import IsLoadingComponent from "../components/IsLoadingComponent";
import { useSelector,useDispatch } from "react-redux";
import APPSETTINGS from "../constants/APPSETTINGS";
import ProductCardComponent from "../components/ProductCardComponent";
import Products from "../components/products/Products";
import ErrorComponent from "../components/ErrorComponent";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const CustomScreen = ({navigation,route})=>{
    const [isList,setisList] = useState("list");
    const [list_grid,setlist_grid] = useState({img:require("../assets/icons/list.png"),});
    const [products,setproducts] = useState({data:"",
                                            loading:true,
                                            error:false,
                                            message:""});
    
    //set clicked category i.e empty for all
    const [selectedCategory,setselectedCategory] = useState({category:"",index:null});
    //fetch all products
    const fetchAllProducts = ()=>{
        const url = "https://dreamrise.000webhostapp.com/api/api.php";
        const formdata = new FormData();
        formdata.append("products","all");
        fetch(url,{
            method:"POST",
            body:formdata
        }).
        then(response=>response.json()).
        then(data=>{
            setproducts({data:data,
                        loading:false,
                        error:false,
                        message:""});
        }).
        catch(e=>{
            setproducts({data:"",
                    loading:false,
                    error:true,
                    message:e.message})
        })
    }
    useEffect(()=>{fetchAllProducts();},[])


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

     const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }else{
        app_theme = APPSETTINGS.colors.default;
    }

    const dispatch = useDispatch();
    const HideBottomTabs = ()=>{
        dispatch(
            {
                type:"TOGGLE_BOTTOM_TABS",
                payload:false
            })
    }

    //fetch all categories
    const [categories,setCategories] = useState({data:"",
                                                loading:true,
                                                error:false,
                                                message:""});
    const [category,setcategory] = useState("");
    const fetchCategories = ()=>{
        const url = "https://dreamrise.000webhostapp.com/api/api.php?categories=all";
        const formdata = new FormData();
        fetch(url).
        then(response=>response.json()).
        then(data=>{
            setCategories({data:data,
                            loading:false,
                            error:false,
                            message:""});
        }).
        catch(e=>{
            setCategories({data:"",
                           loading:false,
                           error:true,
                          message:e.message})
        })
    }
    useEffect(()=>{fetchCategories();},[]);

    const reload = ()=>{
        //reset categories
        setCategories({data:"",
            loading:true,
            error:false,
            message:""});
        fetchCategories();
    }

    //fetch brands
    const [brands,setbrands] = useState({data:"",
                                        loading:true,
                                        error:false,
                                        message:""});
    const [selectedBrand,setselectedBrand] = useState(null);
    const [SelectedBrandProducts,setSelectedBrandProducts] = useState({data:"",
                                                                       loading:true,
                                                                       error:false,
                                                                       message:""});
    const categoryBrands = ()=>{
        const url = "https://dreamrise.000webhostapp.com/api/api.php?home_products=all";
        const formdata = new FormData();
        fetch(url).
        then(response=>response.json()).
        then(data=>{
            setbrands({
                data:data,
                loading:false,
                error:false,
                message:""
            });
        }).
        catch(e=>{
            setbrands({
                data:"",
                loading:false,
                error:true,
                message:e.message
            });
        })
    }

    //fetch products related to the brand selected
    const brandProducts = ()=>{
        const url = "https://dreamrise.000webhostapp.com/api/api.php";
        const formdata = new FormData();
        formdata.append("products",selectedCategory.category);
        fetch(url,{
            method:"POST",
            body:formdata
        }).
        then(response=>response.json()).
        then(data=>{
            setSelectedBrandProducts({
                data:data,
                loading:false,
                error:false,
                message:""
            });
        }).
        catch(e=>{
            setSelectedBrandProducts({
                data:"",
                loading:false,
                error:true,
                message:e.message
            });
        })
    }

    useEffect(()=>{
        setselectedBrand(null);
        //reset brands data
        setbrands({
            data:"",
            loading:true,
            error:false,
            message:""
        });
        categoryBrands();
        //reset selected brand products
        setSelectedBrandProducts({
            data:"",
            loading:true,
            error:false,
            message:""
        });
        brandProducts();
    },[selectedCategory]);
    return(
        <View style={{
            backgroundColor:app_theme.app_primary,
            height:"100%",
            width:"100%",
        }}>
            <HeaderComponent navigation={navigation}/>
            <SearchIcon navigation={navigation}/>
            {categories.error==true?
                <ErrorComponent error={categories.message}>
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress = {reload}
                        style={{width:"100%",
                                justifyContent:"center",
                                alignItems:"center",
                                marginTop:10,}}
                    >
                        <Text style={{fontSize:20,
                                        color:app_theme.app_textColor_link}}>
                            Retry...
                        </Text>
                        
                    </TouchableOpacity>
                </ErrorComponent>:
                categories.loading == true?
                <IsLoadingComponent>
                    <NotLoaded/>
                </IsLoadingComponent>:
                <View style={{
                    width:"98%",
                    margin:"1%",
                    height:40,
                    borderRadius:5,
                    backgroundColor:"white",
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"center"
                }}>
                    <TouchableOpacity 
                        onPress={()=>{}}
                        style={{
                            height:"100%",
                            marginLeft:2,
                            marginRight:5,
                            backgroundColor:app_theme.app_box_backgroundColor,
                            height:38,
                            borderRadius:5,
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

                    <ScrollView 
                        horizontal={true}
                        showsHorizontalScrollIndicator = {false}
                        contentContainerStyle = {{
                            alignItems:"center",
                            justifyContent:"center",
                        }}
                    >
                        <TouchableOpacity 
                        onPress={()=>{
                            setselectedCategory({category:"",index:null});
                        }}
                        style={{
                                alignItems:"center",
                                justifyContent:"center",
                                height:38,
                                borderTopRightRadius:20,
                                borderTopLeftRadius:20,
                                borderBottomRightRadius:20,
                                borderBottomLeftRadius:20,
                                backgroundColor:selectedCategory.index == null?"#27ae60":"white",
                            }}>
                            <Text style={{
                                marginLeft:10,
                                marginRight:10,
                                fontSize:20,
                                color:selectedCategory.index == null?"white":"#27ae60",
                            }}>
                                All
                            </Text>
                        </TouchableOpacity>
                        {categories.data.map((c,c_index)=>{  
                            return(
                                <TouchableOpacity 
                                key={c_index}
                                onPress={()=>{
                                    setselectedCategory({category:c.category_name,index:c_index})
                                }}
                                style={{
                                    alignItems:"center",
                                    justifyContent:"center",
                                    height:38,
                                    borderTopRightRadius:20,
                                    borderTopLeftRadius:20,
                                    borderBottomRightRadius:20,
                                    borderBottomLeftRadius:20,
                                    backgroundColor:selectedCategory.index == c_index?"#27ae60":"white",
                                    marginLeft:5,
                                }}>
                                <Text style={{
                                    marginLeft:8,
                                    marginRight:8,
                                    fontSize:20,
                                    color:selectedCategory.index == c_index?"white":"#27ae60",
                                }}>
                                    {c.category_name}
                                </Text>
                            </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>}

            <ScrollView contentContainerStyle={{
                width:"100%",
                
            }}>
            <View style={{
                        backgroundColor:"#27ae60",
                        marginLeft:"1%",
                        backgroundColor:app_theme.app_box_backgroundColor,
                        borderRadius:5,
                        width:"98%",
                        justifyContent:"space-between",
                        flexDirection:'row',
                        height:40,
                    }}>
                <Text style={{
                        marginLeft:"1%",
                        fontSize:20,
                        color:app_theme.app_textColor_primary
                        }}>
                        {
                        selectedCategory.index==null?"All":categories.data[selectedCategory.index].category_name
                        }
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
            
            {selectedCategory.index==null?<View style={{
                        flexWrap:"wrap",
                        flexDirection:isList=="list"?"column":"row",
                        justifyContent:"space-between",
                        }}>
                    {products.error == true?
                    <ErrorComponent/>:
                    products.loading==true?
                    <IsLoadingComponent/>:
                    <ProductCardComponent 
                        isList={isList} 
                        products={products.data}
                        navigation={navigation}/>}
                </View> :
                <View style={{
                    width:"100%",
                    height:"100%"
                }}>
                    <View style={{
                        width:"98%",
                        marginLeft:"1%",
                    }}>
                        <Text style={{
                            color:app_theme.app_textColor_primary,
                            margin:"1%",
                            fontSize:20,
                        }}>
                            Brands
                        </Text>
                        <View style={{
                                flexWrap:"wrap",
                                flexDirection:"row",
                                }}>
                            <TouchableOpacity 
                                onPress = {()=>{
                                        setselectedBrand(null);
                                    }}
                                style={{
                                backgroundColor:selectedBrand == null?"#27ae60":"white",
                                alignItems:"center",
                                justifyContent:"center",
                                height:38,
                                borderTopRightRadius:20,
                                borderTopLeftRadius:20,
                                borderBottomRightRadius:20,
                                borderBottomLeftRadius:20,
                                margin:3,
                            }}>
                                <Text style={{
                                        color:selectedBrand == null?"white":"#27ae60",
                                        fontSize:20,
                                        marginLeft:8,
                                        marginRight:8,
                                    }}>
                                        All {categories.data[selectedCategory.index].category_name}
                                </Text>
                            </TouchableOpacity>
                            {categories.data[selectedCategory.index].category_brands.map((brand,index)=>{
                                return(
                                    <TouchableOpacity 
                                        onPress = {()=>{
                                            setselectedBrand(index);
                                        }}
                                        key={index}
                                        style={{
                                            backgroundColor:selectedBrand == index?"#27ae60":"white",
                                            alignItems:"center",
                                            justifyContent:"center",
                                            height:38,
                                            borderTopRightRadius:20,
                                            borderTopLeftRadius:20,
                                            borderBottomRightRadius:20,
                                            borderBottomLeftRadius:20,
                                            margin:3,

                                        }}>
                                        <Text style={{
                                            color:selectedBrand == index?"white":"#27ae60",
                                            fontSize:20,
                                            marginLeft:8,
                                            marginRight:8,
                                        }}>
                                            {brand.brand_name}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <Text style={{
                        color:app_theme.app_textColor_primary,
                        fontSize:20,
                        margin:"1%",
                        }}>
                            {selectedBrand == null?
                            `All ${categories.data[selectedCategory.index].category_name}`:
                            categories.data[selectedCategory.index].category_brands[selectedBrand].brand_name}
                    </Text>

                    {SelectedBrandProducts.error==true?
                        <Text>Ooops! An error occurred</Text>:
                        SelectedBrandProducts.loading==true?
                        <IsLoadingComponent/>:
                        <View style={{
                            flexWrap:"wrap",
                            flexDirection:isList=="list"?"column":"row",
                            justifyContent:"space-between",
                            }}>
                            <ProductCardComponent
                                isList={isList} 
                                products={SelectedBrandProducts.data}
                                navigation={navigation}
                            />
                        </View>}     
                </View>
                }       
            </ScrollView>
        </View>
    )
}

const NotLoaded = ()=>{
    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }else{
        app_theme = APPSETTINGS.colors.default;
    }
    const notLoaded = [1,2,3,4,5,6];
    return(
        <View style={{ flexDirection:"row",}}>
            {notLoaded.map(item=>{
                return(
                    <View 
                        key={item}
                        style={{ backgroundColor:app_theme.app_box_backgroundColor,
                                height:40,
                                width:100,
                                marginTop:5,
                                marginLeft:10,
                                borderRadius:10}}>
                    </View>
                )
                    })}
        </View>
    )
}

const ProductsScreen = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="products"
                component = {CustomScreen}
                options={{
                    headerShown:false,
                }}
            />

            <Stack.Screen
                name="Show More"
                component = {ShowMoreScreen}
                options={{
                    headerShown:false,
                }}
            />
        </Stack.Navigator>
    )
}

export default ProductsScreen;