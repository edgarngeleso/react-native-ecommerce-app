import React,{useState,useEffect,createContext} from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    Button,
    FlatList,
    TouchableOpacity,
    TextInput,
    Alert,
    Modal,
    NativeModules,
    Keyboard,
    ActivityIndicator,
    ScrollView,
    BackHandler,
    ToastAndroid,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import ProductModalComponent from "../components/ProductModalComponent";
import APPSETTINGS from "../constants/APPSETTINGS";
import ReviewsModalComponent from "../components/productMore/ReviewsModalComponent";
import DescriptionModalComponent from "../components/productMore/DescriptionModalComponent";
import SignInScreen from "./SignInScreen";
import SeperatorComponent from "../components/SeparatorComponent";

export var Context = createContext(null);
const ShowMoreScreen = ({navigation,route})=>{
    //increase or decrease quantity
    const [quantity,setquantity] = useState({quantity:1});
    const [isadded,setisadded] = useState(false);
    const [item_total,setitem_total] = useState({item_total:1});
    const [ismodalopen,setismodalopen] = useState(false);
    const [description_modal_open,setdescription_modal_open] = useState(false);
    const [button_title,setbutton_title] = useState("Add to cart");
    const [rating_modal_open,setrating_modal_open] = useState(false);
    const [modal_rating,setmodal_rating] = useState({star:1,content:""});
    const [modal_input_focused,setmodal_input_focused] = useState(false);
    const [loading,setloading] = useState(false);
    const [addreview,setaddreview] = useState("");
    const [allreviews,setallreviews] = useState(null);
    const [error,seterror] = useState("");
    const [reviewsLoading,setreviewsLoading] = useState(true);
    const [reviewsModalOpen,setreviewsModalOpen] = useState(false);
    const url = "https://dreamrise.000webhostapp.com/api/api.php";
    //keyboard events
    Keyboard.addListener("keyboardDidShow",()=>{
        setmodal_input_focused(true);
    })
    Keyboard.addListener("keyboardDidHide",()=>{
        setmodal_input_focused(false);
        seterror("");
        setaddreview("");
    })


    const {id,name,price,image,category,rating,description} = route.params;
    //fetch product reviews using its id
    const [reloadReviews,setreloadReviews] = useState(true);
    const [reviewsError,setreviewsError] = useState({state:false,message:""});
    const getReviews = ()=>{
        const url = "https://dreamrise.000webhostapp.com/api/api.php";
        const formdata = new FormData();
        formdata.append("get_reviews_by_id",route.params.id);
        fetch(url,{
            method:"POST",
            body:formdata
        }).
        then(response=>response.json()).
        then(data=>{
            setallreviews(data);
            setreviewsLoading(false);
        }).
        catch(e=>{
            setreviewsError({state:true,message:e.message});
        })
    }
    useEffect(()=>{getReviews()},[reloadReviews]);
    
    const add_quantity = ()=>{
        setquantity({quantity:quantity.quantity+1});
    }

    const reduce_quantity = ()=>{
        if(quantity.quantity>1){
            setquantity({quantity:quantity.quantity-1});
        }
    }

    const add_type_quantity = (e)=>{
        const qty = parseInt(e);
        if(qty>=1){
            setquantity({quantity:qty});
        }
        
        if(qty == ""){
            setquantity({quantity:1});
        }
    }

    /*redux functionality*/
    const dispatch = useDispatch();
    const selected = (item)=>{
        dispatch({
            type:"ADD_TO_CART",
            payload:item
        })
    }
    
    const allItems = useSelector(state=>state.Reducer.selectedItems);
    const [isselected,setisselected] = useState({added:""});
    useEffect(()=>{
        setquantity({quantity:1});
        setisselected({added:false});
        allItems.items.map(item=>{
            if(item.id == id){
                setisselected({added:item.added});
                setquantity({quantity:item.quantity})
                return false;
            }
        })
    },[allItems])
    
    const bottomTabsState = useSelector(state=>state.Reducer.BottomTabsDisplayed);
    const update_existing = (item)=>{
        dispatch({
            type:"UPDATE_CART",
            payload:[item]
        })
    }
    
    const remove = (item)=>{
        setisadded(false);
        dispatch({
            type:"DELETE_PRODUCT",
            payload:item,
        })
    }

    //update bottom tabs display
    const HideBottomTabs = ()=>{
        dispatch(
            {
                type:"TOGGLE_BOTTOM_TABS",
                payload:false
            })
    }
    useEffect(()=>{
        //hide bottom tabs
        HideBottomTabs();
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
    /**************** */

    const theme = useSelector(state=>state.Reducer.selectedTheme);
    let app_theme = APPSETTINGS.colors.default;
    if(theme !== ""){
        //setapp_theme(APPSETTINGS.colors.dark);
        app_theme = APPSETTINGS.colors.dark;
    }else{
        app_theme = APPSETTINGS.colors.default;
    }

    let login_data = useSelector((state)=>state.Reducer.loginInfo);
    /**************/

    const open_modal = ()=>{
        setismodalopen(true);
    }

    const open_description_modal = ()=>{
        setdescription_modal_open(true);
    }

    const reviewText = (text)=>{
        setmodal_rating({...modal_rating,content:text});
    }

    const review = ()=>{
        const url = "https://dreamrise.000webhostapp.com/api/api.php";
        if(login_data.loggedIn == true){
            setloading(true);
            if(modal_rating.content!==""){
                let formdata = new FormData();
                formdata.append("userid",login_data.data.id);
                formdata.append("productid",route.params.id);
                formdata.append("review",modal_rating.content);
                formdata.append("reviewStar",modal_rating.star);
                fetch(url,{
                    method:"POST",
                    body:formdata
                }).
                then(response=>response.json()).
                then(data=>{
                    setloading(false);
                    if(data.error == true){
                        seterror(data.message);
                        
                    }else{
                        seterror("");
                        setaddreview(data);
                        setreloadReviews(data.error);
                        setTimeout(()=>{
                            setreviewsModalOpen(false); 
                         },2000);
                    }
                }).
                catch(e=>{
                    setloading(false);
                    seterror(e.message);
                })
            }else{
                seterror("Add a description first.");
            }
        }else{
            Alert.alert("Logged Out","Log in to review this product",[{text:"OK",onPress:()=>{}}]);
        }
    }

    const viewreviews = ()=>{
        setreviewsModalOpen(true);
    }

    const [isLiked,setisLiked] = useState({state:false,likeid:""});
    const addProductToFavorites = ()=>{
        setloading(true);
        if(login_data.loggedIn == false){
            Alert.alert("Logged Out","Log in to add this product to favorites.",[{text:"OK",onPress:()=>{}}]);
            return false;
        }
        let formdata = new FormData();
        formdata.append("userid",login_data.data.id);
        formdata.append("add_favorites_product_id",route.params.id);
        fetch(url,{
                method:"POST",
                body:formdata
        }).
        then(response=>response.json()).
        then(data=>{
           if(data.error == false){
              ToastAndroid.show(`Successfully added ${route.params.name} to favorites.`, ToastAndroid.LONG);
               getFavorites();
           }
        }).
        catch(e=>{
            console.log(e.message);
        })
    }

    const [favoritesData,setfavoritesData] = useState(null);
    const [favoritesError,setfavoritesError] = useState({state:false,error:""});
    const getFavorites = ()=>{

        if(login_data.loggedIn == false){
            return false;
        }

        let formdata = new FormData();
        formdata.append("get_favorites_by_userid",login_data.data.id);
        fetch(url,{
                method:"POST",
                body:formdata
        }).
        then(response=>response.json()).
        then(data=>{
            setfavoritesError({state:false,error:""});
            setloading(false);
            setfavoritesData(data);
            if(data != null){
                data.map(favorite=>{
                    if(favorite.pid == id){
                        setisLiked({state:true,likeid:favorite.likeid});
                    }
                })
            }
        }).
        catch(e=>{
            setloading(false);
            setfavoritesError({state:true,error:e.message});
        })
    }

    const removeFromFavorites = ()=>{
        setloading(true);
        setismodalopen(false);
        let formdata = new FormData();
        formdata.append("remove_favorites_by_id",isLiked.likeid);
        fetch(url,{
            method:"POST",
            body:formdata
        }).
        then(response=>response.json()).
        then(data=>{
            if(data.error == false){
                ToastAndroid.show(`Successfully removed ${route.params.name} from favorites.`, ToastAndroid.LONG);
                setisLiked({state:false,likeid:""});
                getFavorites();
            }
        }).catch(e=>{
            console.log(e.message);
        })
    }
    
    //get related products
    const [relatedProducts,setrelatedProducts] = useState({
        loading:true,
        error:false,
        errorMessage:"",
        data:null
    });
    const [relatedProductsLoading,setrelatedProductsLoading] = useState(true);
    const getRelatedProducts = ()=>{
        setrelatedProductsLoading(true);
        const url = "https://dreamrise.000webhostapp.com/api/api.php";
        const formdata = new FormData();
        formdata.append("products",category);
        fetch(url,{
            method:"POST",
            body:formdata
        })
        .then(response=>response.json())
        .then(data=>{
            setrelatedProductsLoading(false);
            setrelatedProducts({
                loading:false,
                error:false,
                errorMessage:"",
                data:data
            });
        })
        .catch(e=>{
            setrelatedProductsLoading(false);
            setrelatedProducts({
                ...relatedProducts,
                loading:false,
                error:true,
                errorMessage:e.message
            })
        })
    }

    useEffect(()=>{
        getRelatedProducts();
        getFavorites();
    },[])

    return(
        <ScrollView style={{
            backgroundColor:app_theme.app_primary,
            width:"100%",
            height:"100%",
        }}
        
        >
            <Modal 
                animationType="slide"
                transparent
                visible={ismodalopen}
                onRequestClose={()=>setismodalopen(false)}
                >
                <ProductModalComponent 
                    productName={name} 
                    productPrice={price} 
                    imageUri={image}/> 
            </Modal>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={open_modal}
            >
                <Image
                    source={{uri:image}}
                    resizeMode="cover"
                    style={{
                        width:"98%",
                        marginLeft:"1%",
                        height:300,
                        marginTop:10,
                        borderBottomRightRadius:10,
                        borderBottomLeftRadius:10,
                    }}
                />
                <TouchableOpacity 
                    onPress={()=>{
                        DisplayBottomTabs();
                        navigation.goBack()}}
                    style={{
                        position:"absolute",
                        height:40,
                        width:40,
                        margin:2,
                        borderRadius:20,
                        backgroundColor:"white",
                        alignItems:"center",
                        justifyContent:"center",
                        zIndex:10
                    }}
                    >
                    <Image 
                        source={require("../assets/icons/back.png")}
                        style={{
                            height:30,
                            width:30,
                        }}
                        />
                </TouchableOpacity>
                
                {login_data.loggedIn == true?
                    <View style={{
                        position:"absolute",
                        height:40,
                        width:40,
                        marginTop:5,
                        marginLeft:"89%",
                        borderRadius:20,
                        backgroundColor:"white",
                        alignItems:"center",
                        justifyContent:"center",
                        zIndex:10
                    }}>
                        {isLiked.state == true?<TouchableOpacity 
                            onPress={removeFromFavorites}
                            activeOpacity={0.8}
                            style={{
                                height:"100%",
                                width:"100%",
                                borderRadius:15,
                                backgroundColor:"white",
                                alignItems:"center",
                                justifyContent:"center",
                                zIndex:10
                            }}>
                            {loading == true?<ActivityIndicator
                                                size="large"
                                                color="green"
                                                style={{height:30,
                                                        width:30,
                                                    }}
                                            />:<Image
                                            source={require("../assets/icons/heart.png")}
                                            resizeMode="cover"
                                            style={{
                                                width:30,
                                                height:30,
                                                tintColor:"green",
                                            }}
                                        />}
                            
                            </TouchableOpacity>:
                                <TouchableOpacity 
                                    onPress={addProductToFavorites}
                                    activeOpacity={0.8}
                                    style={{
                                        height:"100%",
                                        width:"100%",
                                        borderRadius:15,
                                        backgroundColor:"white",
                                        alignItems:"center",
                                        justifyContent:"center",
                                    }}>

                                        {loading == true?<ActivityIndicator
                                                size="large"
                                                color="green"
                                                style={{height:30,
                                                        width:30,
                                                    }}
                                            />:<Image
                                            source={require("../assets/icons/heart.png")}
                                            resizeMode="cover"
                                            style={{
                                                width:30,
                                                height:30,
                                                tintColor:"black",
                                            }}
                                        />}         
                                </TouchableOpacity>}
                            </View>
                        :<TouchableOpacity 
                            onPress={addProductToFavorites}
                            activeOpacity={0.8}
                            style={{
                                position:"absolute",
                                height:30,
                                width:30,
                                marginTop:5,
                                marginLeft:"89%",
                                borderRadius:15,
                                backgroundColor:"white",
                                alignItems:"center",
                                justifyContent:"center",
                                zIndex:10
                            }}>
                            <Image
                                source={require("../assets/icons/heart.png")}
                                resizeMode="cover"
                                style={{
                                    width:30,
                                    height:30,
                                    tintColor:"black",
                                }}
                            />
                        </TouchableOpacity>}
            </TouchableOpacity>
            
            <View style={{
                borderRadius:5,
                width:"98%",
                marginLeft:"1%",
                height:"100%",
                backgroundColor:app_theme.app_box_backgroundColor,
            }}>
                <View>
                    <View style={{height:25}}>
                        <Text style={{fontSize:17,fontSize:20,color:app_theme.app_textColor_primary}}>
                            {name}
                        </Text>  
                    </View>
                    
                    <Text style={{fontSize:17,
                                color:app_theme.app_textColor_primary}}>
                        Ksh.{price}
                    </Text>
                    <Text style={{
                                position:"absolute",
                                marginTop:50,
                                fontWeight:"bold",
                                fontSize:20
                        }}></Text>
                        
                    {isselected.added==true?<View style={{
                                display:"flex",
                                flexDirection:"row",
                                height:35,
                                marginBottom:10,
                                width:"100%",
                                marginLeft:"0%"
                        }}>
                        
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{
                                width:"55%",
                                height:40,
                                borderRadius:10,
                                backgroundColor:app_theme.app_danger,
                                alignItems:"center",
                                justifyContent:"center"
                                }}
                                onPress={()=>remove({id:id,
                                                    name:name,
                                                    quantity:quantity.quantity,
                                                    image:image,
                                                    price:price})}
                        >
                            <Text style={{
                                fontSize:20,
                                color:"white"
                                }}>
                                Remove
                            </Text>
                        </TouchableOpacity>

                        <View style={{
                            flexDirection:"row",
                            width:"40%",
                            marginLeft:"5%",
                        }}>

                            <TouchableOpacity
                                style = {{
                                    backgroundColor:app_theme.app_button_backgroundColor,
                                    borderTopLeftRadius:5,
                                    borderBottomLeftRadius:5,
                                    height:35,
                                    width:35,
                                    alignItems:"center",
                                    justifyContent:"center",
                                }}
                                activeOpacity={0.8}
                                onPress={()=>{
                                    reduce_quantity();
                                    let subtracted = quantity.quantity-1;
                                    if(subtracted<1){
                                        console.log("called");
                                        remove({id:id,
                                                name:name,
                                                quantity:quantity.quantity,
                                                image:image,
                                                price:price})
                                    }else{
                                        console.log("is called");
                                        update_existing({id:id,
                                                        name:name,
                                                        quantity:quantity.quantity-1,
                                                        image:image,
                                                        price:price,
                                                        added:true})  
                                    }
                                    }}
                            >
                                    <Image
                                        source={require("../assets/icons/subtract.png")}
                                        style={{
                                            height:30,
                                            width:25,
                                            tintColor:"white",
                                        }}
                                        /> 
                                        </TouchableOpacity>
                            
                            <TextInput
                                placeholder="123"
                                keyboardType = "numeric"
                                value = {quantity.quantity.toString()}
                                style={{borderBottomWidth:2,
                                        borderColor:app_theme.app_button_backgroundColor,
                                        height:"100%",
                                        fontSize:24,
                                        padding:0,
                                        paddingLeft:5,
                                        color:app_theme.app_textColor_primary,}}
                                onChangeText = {add_type_quantity}
                            />
                            <TouchableOpacity
                                style = {{
                                    backgroundColor:app_theme.app_button_backgroundColor,
                                    borderTopRightRadius:5,
                                    borderBottomRightRadius:5,
                                    height:35,
                                    width:35,
                                    alignItems:"center",
                                    justifyContent:"center",
                                    marginRight:5,
                                }}
                                activeOpacity={0.8}
                                onPress={()=>{
                                            add_quantity();
                                            update_existing({id:id,
                                                            name:name,
                                                            quantity:quantity.quantity+1,
                                                            image:image,
                                                            price:price,
                                                            added:true
                                                            })}}
                            >
                                <Image
                                source={require("../assets/icons/add.png")}
                                style={{
                                    height:30,
                                    width:30,
                                    tintColor:"white",
                                }}
                                />
                            </TouchableOpacity>     
                        </View>
                    </View>:

                    <TouchableOpacity
                            activeOpacity={0.8}
                            style={{
                                width:"100%",
                                height:40,
                                borderRadius:10,
                                backgroundColor:app_theme.app_button_backgroundColor,
                                alignItems:"center",
                                justifyContent:"center"
                                }}
                                onPress={()=>selected({id:id,
                                                        name:name,
                                                        quantity:quantity.quantity,
                                                        image:image,
                                                        price:price,
                                                        added:true})}
                        >
                            <Text style={{
                                fontSize:20,
                                color:"white"
                                }}>
                                Add to cart
                            </Text>
                        </TouchableOpacity>}
                </View>
                
                <View style={{
                            width:"100%",
                            borderBottomLeftRadius:5,
                            borderBottomRightRadius:5,
                            backgroundColor:"white",
                            marginTop:10,
                            marginBottom:5,
                        }}>
                    <Modal 
                        animationType="slide"
                        visible = {description_modal_open}
                        onRequestClose = {()=>setdescription_modal_open(false)}
                        transparent
                    >
                        <View 
                            style= {{
                                backgroundColor:"#00000099",
                                height:"100%",
                            }}
                        >
                            <TouchableOpacity 
                                activeOpacity={0.8}
                                style={{
                                    alignItems:"center",
                                    justifyContent:"center",
                                    height:"20%",
                                    width:"100%",
                                }}
                                onPress = {()=>setdescription_modal_open(false)}
                            ></TouchableOpacity>
                            <DescriptionModalComponent description={description}/>
                        </View>
                    </Modal>
                    <View style={{
                            width:"100%",
                            height:30,
                            borderRadius:5,
                            justifyContent:"space-between",
                            backgroundColor:"whitesmoke",
                            flexDirection:"row",
                        }}>
                            <Text 
                                style={{
                                    color:"black",
                                    fontWeight:"bold",
                                    fontSize:20,}}>
                                Description
                            </Text>
                            <TouchableOpacity 
                                activeOpacity={0.8}
                                onPress={open_description_modal}
                                style={{
                                        height:30,
                                        width:30,
                                        borderRadius:20,
                                        backgroundColor:"white",
                                        alignItems:"center",
                                        justifyContent:"center",
                                        zIndex:10
                                        }}
                            >
                                <Image 
                                    source={require("../assets/icons/go.png")}
                                    style={{
                                            height:20,
                                            width:20,
                                            transform:[{
                                                rotate:"-180deg"
                                            }],
                                            }}
                                    />
                            </TouchableOpacity>
                        </View>
                        <SeperatorComponent/>
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={open_description_modal}
                        style={{
                            backgroundColor:app_theme.app_box_backgroundColor,
                        }}
                    >
                        <Text style={{
                            fontSize:18,
                            color:app_theme.app_textColor_primary,
                        }}>
                            {description.substring(0,150)}...    
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    marginBottom:5,
                    backgroundColor:app_theme.app_box_backgroundColor,
                    borderRadius:5,
                }}>
                    <Text 
                        style={{
                            color:app_theme.app_textColor_primary,
                            fontWeight:"bold",
                            fontSize:20,
                            textDecorationLine:"underline",}}>
                        Rating
                    </Text>
                    <View style={{flexDirection:"row",}}>
                        <Text style={{fontSize:17,
                                    color:app_theme.app_textColor_primary,}}>
                            {rating}
                        </Text>
                        <Image
                            source={rating>4?require("../assets/icons/star1.png"):require("../assets/icons/star.png")}
                            resizeMode="cover"
                            style={{
                                width:20,
                                height:20,
                                marginLeft:5,
                            }}
                        />
                    </View>

                    <View style={{
                        backgroundColor:app_theme.app_box_backgroundColor,
                    }}>
                        <View style={{
                            width:"100%",
                            height:30,
                            borderBottomLeftRadius:5,
                            borderBottomRightRadius:5,
                            justifyContent:"space-between",
                            backgroundColor:"whitesmoke",
                            flexDirection:"row",
                        }}>
                            <Text style={{
                                color:"black",
                                fontWeight:"bold",
                                fontSize:20,
                                margin:2,
                                }}>
                                Reviews
                            </Text>
                            {allreviews ==  null?<></>:<TouchableOpacity 
                                onPress={viewreviews}
                                style={{
                                        height:30,
                                        width:30,
                                        borderRadius:20,
                                        backgroundColor:"white",
                                        alignItems:"center",
                                        justifyContent:"center",
                                        zIndex:10
                                        }}
                            >
                                <Image 
                                source={require("../assets/icons/go.png")}
                                style={{
                                        height:20,
                                        width:20,
                                        transform:[{
                                        rotate:"-180deg"
                                        }],
                                        }}
                                />
                                
                            </TouchableOpacity>}
                        </View>
                        <SeperatorComponent/>

                            {reviewsError.state == true?<Text style={{
                                fontStyle:"italic",
                                fontSize:18,
                                color:app_theme.app_textColor_primary,
                            }}>
                                Oops! Something went wrong.
                            </Text>:
                                reviewsLoading == true?<ActivityIndicator
                                                size="large"
                                                color="green"
                                                style={{height:50,
                                                        width:40,
                                                    }}
                                            />:<View>
                            {allreviews == null?
                            <Text 
                                style={{color:app_theme.app_textColor_primary,}}>
                                    No reviews on this product</Text>:
                                <View style={{
                                    marginTop:5,
                                }}>

                                    <Modal 
                                        visible={reviewsModalOpen}
                                        animationType="slide"
                                        onRequestClose={()=>setreviewsModalOpen(false)}
                                        transparent
                                    >
                                        <View style={{
                                                flexDirection:"row",
                                                width:"100%",
                                                height:50,
                                                backgroundColor:app_theme.app_header_backgroundColor,
                                                borderBottomRightRadius:10,
                                                borderBottomLeftRadius:10
                                            }}>
                                                <TouchableOpacity 
                                                    onPress={()=>{setreviewsModalOpen(false)}}
                                                    style={{
                                                        height:40,
                                                        width:40,
                                                        margin:2,
                                                        borderRadius:20,
                                                        backgroundColor:"white",
                                                        alignItems:"center",
                                                        justifyContent:"center",
                                                        zIndex:10
                                                    }}
                                                    >
                                                    <Image 
                                                        source={require("../assets/icons/back.png")}
                                                        style={{
                                                            height:30,
                                                            width:30,
                                                        }}
                                                        />
                                                </TouchableOpacity>
                                                <Text style={{
                                                    fontSize:25,
                                                    fontWeight:"bold",
                                                    color:"white",
                                                    margin:5}}>Product reviews</Text>
                                            </View>
                                        {/*reviews modal*/}
                                        <ReviewsModalComponent reviews={allreviews} productName={name}/>

                                    </Modal>
                                    <View style={{
                                        flexDirection:"row",
                                    }}>
                                        <Image
                                            source={require("../assets/icons/profile.png")}
                                            resizeMode="cover"
                                            style={{
                                                height:20,
                                                width:20,
                                                borderRadius:10,
                                                backgroundColor:"white",
                                                marginRight:10,
                                            }}
                                        />
                                        <Text style={{color:app_theme.app_textColor_primary,}}>{allreviews[0].firstname}</Text>
                                    </View>
                                    
                                    <Text style={{color:app_theme.app_textColor_primary,}}>
                                        {allreviews[0].review}</Text>
                                    <Text style={{color:app_theme.app_textColor_primary,}}>
                                        {allreviews[0].datereviewed}</Text>
                                    
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={viewreviews}
                                        style={{
                                            height:40,
                                            width:"40%",
                                            marginLeft:"59%",
                                            backgroundColor:app_theme.app_button_backgroundColor,
                                            borderRadius:10,
                                            alignItems:"center",
                                            justifyContent:"center",
                                            marginTop:0
                                            
                                        }}
                                    >
                                        <Text style={{
                                                fontSize:20,
                                                color:"white"
                                            }}
                                        >View all reviews</Text>
                                    </TouchableOpacity>
                                </View>}
                            </View>}
                    </View>

                    <View style={{marginBottom:10}}>
                        <Text style={{
                                color:app_theme.app_textColor_primary,
                                fontWeight:"bold",
                                fontSize:20,
                                textDecorationLine:"underline",}}>Rate this product</Text>
                        <View style={{flexDirection:"row",height:30}}>
                            {[1,2,3,4,5].map((star,index)=>{
                                let arr = ["Bad","Quite cool","Good","Better","Awesome!"];
                                return(
                                    <TouchableOpacity 
                                        activeOpacity={0.8}
                                        key = {star}
                                        style={{marginLeft:5}}
                                        onPress = {()=>{
                                            setmodal_rating({star:star,content:arr[index]});
                                            setrating_modal_open(true);
                                        }}>
                                        <Image
                                            source={require("../assets/icons/star.png")}
                                            style = {{width:30,height:30}}
                                        />
                                    </TouchableOpacity>
                                )
                            })}
                        </View>

                        <Modal
                            animationType="slide"
                            visible = {rating_modal_open}
                            onRequestClose = {()=>setrating_modal_open(false)}
                            transparent>
                            <View 
                                style= {{
                                    backgroundColor:"#00000099",
                                    height:"100%",
                                }}
                            >
                                { login_data.loggedIn == true?
                                <View style={{
                                    marginTop:modal_input_focused==true?"40%":"90%",
                                    height:"100%",
                                    width:"100%",
                                    backgroundColor:"white",
                                    borderRadius:10
                                }}>

                                    <Text style={{textAlign:"center",
                                                fontSize:20,
                                                color:"red"}}>
                                                    {error=="Network request failed"?"You are not connected to internet":error}
                                    </Text>
                                    <Text style={{textAlign:"center",
                                                fontSize:20,
                                                color:"green"}}>
                                                    {addreview.error==false?"Succesfully added a review.":addreview.message}
                                    </Text>

                                    <Text style={{
                                        fontSize:20,
                                        textAlign:"center"
                                    }}>
                                       Rating {modal_rating.star} {modal_rating.star>1?"stars":"star"} for {name}
                                    </Text>

                                    <View style={{
                                        width:"100%",
                                        marginTop:20,
                                    }}>
                                        <TextInput
                                            multiline
                                            placeholder="Why this rating?"
                                            style={{
                                                height:40,
                                                width:"98%",
                                                borderWidth:1,
                                                borderRadius:10,
                                                padding:10,
                                                fontSize:18,
                                                marginLeft:"1%",
                                            }}
                                            onChangeText={reviewText}
                                            onFocus={()=>{setmodal_input_focused(true)}}
                                            autoFocus
                                        />
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={review}
                                            style={{
                                                height:40,
                                                width:"40%",
                                                marginLeft:"59%",
                                                backgroundColor:"green",
                                                borderRadius:10,
                                                alignItems:"center",
                                                justifyContent:"center",
                                                marginTop:10
                                                
                                            }}
                                        >
                                            {loading==true?<ActivityIndicator
                                                size="large"
                                                color="green"
                                                style={{height:50,
                                                        width:40,
                                                    }}
                                            />:<Text  style={{
                                                fontSize:20,
                                                color:"white"
                                            }}>Review</Text>}
                                        </TouchableOpacity>
                                    </View>
                                </View>:
                                <View style={{
                                    marginTop:"40%",
                                    height:"100%",
                                    width:"100%",
                                    backgroundColor:app_theme.app_primary,
                                    borderRadius:10
                                }}>
                                    <Text style={{textAlign:"center",
                                                 fontSize:20,
                                                 fontWeight:"bold",
                                                 color:app_theme.app_textColor_primary,
                                                 }}>Sign In to rate this product</Text>
                                    <SignInScreen/>
                                </View>}
                            </View>
                        </Modal>
                    </View>

                    </View>
                    <View>
                        <Text style={{
                                color:app_theme.app_textColor_primary,
                                fontWeight:"bold",
                                fontSize:20,
                                textDecorationLine:"underline",}}>
                                    {relatedProducts.data == null ?"":
                                    relatedProducts.data.length == 1?"":"Check also"}
                        </Text>
                        <ScrollView 
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                        >
                            {relatedProducts.error == true?
                                <Text style={{
                                    color:app_theme.app_textColor_primary,
                                    fontSize:18
                                }}>
                                    {relatedProducts.errorMessage=="Network request failed"?
                                        "You are not connected to internet":
                                        relatedProducts.errorMessage}
                                </Text>:
                                relatedProducts.loading == true?
                                <ActivityIndicator
                                    size="large"
                                    color="green"
                                    style={{height:50,
                                            width:40,
                                        }}
                                />:
                                    relatedProducts.data.map((related,index)=>{
                                        if(related.pid == id){
                                            return<></>
                                        }else{
                                            return(
                                                <TouchableOpacity 
                                                    key={index}
                                                    activeOpacity={0.8}
                                                    onPress={()=>{
                                                        navigation.replace("Show More",{
                                                            id:related.pid,
                                                            name:related.product_name,
                                                            price:related.product_price,
                                                            image:related.product_image,
                                                            category:related.product_category,
                                                            rating:related.product_rating,
                                                            description:related.product_description
                                                            })
                                                    }}
                                                    style={{
                                                        height:150,
                                                        width:140,
                                                        margin:5,
                                                        borderRadius:5,
                                                        backgroundColor:"whitesmoke",
                                                        shadowOffset:{
                                                            width:0,
                                                            height:10,
                                                        },
                                                        shadowopacity:1,
                                                        shadowradius:5,
                                                        elevation:5,
                                                        shadowColor:"grey"
                                                    }}>
                                                    <Image
                                                        source={related.product_image==""?
                                                            require("../assets/icons/image.png"):
                                                                {uri:related.product_image}}
                                                        resizeMode="cover"
                                                        style={{
                                                            height:"60%",
                                                            width:"100%",
                                                        }}
                                                    />
                                                    <Text style={{color:"black",
                                                                fontStyle:"italic",
                                                                marginLeft:5,
                                                                fontSize:16
                                                                }}>
                                                        {related.product_name}
                                                    </Text>
                                                    <Text style={{color:"black",
                                                                fontStyle:"normal",
                                                                marginLeft:5,
                                                                fontSize:16
                                                                }}>
                                                        Ksh.{related.product_price}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        }
                            })}
                        </ScrollView >
                    </View>
            
        </View>
        </ScrollView>
    )
}

const DescriptionComponent = ()=>{
    
}

const ReviewsComponent = ()=>{

}
export default ShowMoreScreen;