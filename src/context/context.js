import React,{createContext,useContext} from "react";
import {
    View,
    Text,
} from "react-native";
import Hometabs from "../navigation/HomeTabs";
import ShowMoreScreen from "../screens/ProductMoreScreen"

export const Context = createContext("0");

const UpdateCart = ()=>{
    return(
        <Context.Provider value={"another"}>
            <ShowMoreScreen/>
        </Context.Provider>
    )
}

const Other = ()=>{
    const value = useContext(Context);
    return(
        <Context.Consumer>
             <View style={{flexDirection:"row",
                                justifyContent:"space-between",
                                marginTop:30,
                                marginBottom:10,
                                backgroundColor:"white",
                                height:40,}}>
                        <Text>
                        Category:{category}
                        </Text>

                        <TouchableOpacity
                            onPress={toggleLisGrid}
                        >
                        <Image
                            source={list_grid.img}
                            style={{
                                width:40,
                                height:"100%",
                                tintColor:"green",
                                marginRight:10,
                            }}
                        />
                        </TouchableOpacity>
                    </View>
        </Context.Consumer>
    )
}