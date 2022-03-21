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
import ErrorComponent from "../../components/ErrorComponent";
import APPSETTINGS from "../../constants/APPSETTINGS";

const GetSupplierProducts = ({userId})=>{
    return(
        <View style={{
            width:"98%",
            height:"100%",
            marginLeft:"1%"
        }}>
            <Text>
                {/*fetched data*/}
                Supplier products
            </Text>
        </View>
    )
}

export default GetSupplierProducts;