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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LottieView from "lottie-react-native";
import DUMMYDATA from "../../constants/DUMMYDATA";
import IsLoadingComponent from "../IsLoadingComponent";
import { useSelector,useDispatch } from "react-redux";
import APPSETTINGS from "../../constants/APPSETTINGS";
import ProductCardComponent from "../ProductCardComponent";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const Products = ({category,isList,navigation})=>{
    const [categoryData,setcategoryData] = useState(category);
    return(
        <View style={{
            flexWrap:"wrap",
            flexDirection:isList=="list"?"column":"row",
            justifyContent:"space-between",
            }}>
                <ProductCardComponent 
                    products={categoryData/*products.data*/} 
                    isList={isList} 
                    navigation={navigation}>
                </ProductCardComponent>
            </View>
    )
}

export default Products;