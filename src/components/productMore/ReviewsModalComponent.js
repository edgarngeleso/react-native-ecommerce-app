import React from "react";
import { 
    Text,
    View,
    Image,
    ScrollView } from "react-native";
const ReviewsModalComponent = ({reviews,productName,children})=>{
    return(
        <View style={{
            height:"100%",
            width:"100%",
            backgroundColor:"#00000099",
        }}>
            <ScrollView 
                style={{
                    height:"100%",
                    width:"100%",
                    marginTop:"0%",
                    borderTopRadius:20,
                    backgroundColor:"white"
                }}
            >
                <Text style={{
                    marginTop:10,
                    textAlign:"center",
                    fontWeight:"bold",
                    fontSize:22,
                    textDecorationLine:"underline"
                }} 
                >{reviews.length} review{reviews.length>1?"s":""} on {productName}</Text>
                <View style={{
                    height:"100%",
                    width:"100%",
                    marginTop:"2%",
                    borderRadius:20,
                    backgroundColor:"white"
                }}>
                    {reviews.map((review,index)=>{
                        return(
                            <View key={index}
                                style={{
                                    width:"95%",
                                    marginLeft:"2.5%",
                                    marginTop:10,
                                    backgroundColor:"whitesmoke",
                                    borderRadius:10
                                }}>
                                <View style={{
                                            flexDirection:"row",
                                            marginLeft:5,
                                            }}>
                                    <Image
                                        source={require("../../assets/icons/profile.png")}
                                        resizeMode="cover"
                                        style={{
                                            height:30,
                                            width:30,
                                            borderRadius:15,
                                            backgroundColor:"white",
                                            marginRight:10,
                                            marginTop:2,
                                            }}
                                        />
                                    <Text style={{
                                        fontWeight:"bold",
                                        fontSize:22,}}>{review.firstname}</Text>
                                </View>
                                <View style={{
                                        fontSize:20,
                                        marginTop:5,
                                        marginLeft:"5%",
                                        width:"90%"
                                        
                                    }}>
                                    <Text
                                        style={{
                                            fontSize:20,
                                        }}
                                    >{review.review}</Text>
                                </View>
                                
                                <Text
                                    style={{
                                        fontSize:16,
                                        marginTop:5,
                                        fontStyle:"italic",
                                        textAlign:"right",
                                        marginRight:20,
                                    }}
                                >{review.datereviewed}</Text>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
        
    )
}

export default ReviewsModalComponent;