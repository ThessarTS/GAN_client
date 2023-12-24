import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function Home() {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [salesNames, setSalesName] = useState([])
    const fetchAllSalesName = async () => {
        try {
            const { data } = await axios({
                url: "  https://9b10-180-244-154-90.ngrok-free.app",
                method: 'GET'
            });
            setSalesName(data)
        } catch (error) {
            console.log('Error >>>>>', error);
        }
    }

    const goToProfile = (id) => {
        dispatch({ type: 'UPDATE_ID', payload: id })
        navigation.navigate("toProfile", { screen: 'profile', params: { id } })
    }

    useFocusEffect(
        useCallback(() => {
            fetchAllSalesName()
        })
    )

    return (
        <>
            <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 28, }}>Salesman Name</Text>
            </View>
            <ScrollView style={{ flex: 2, paddingHorizontal: 15 }}>
                {
                    salesNames?.map((el, idx) => {
                        return (
                            <Pressable style={{ flex: 1, borderRadius: 15, backgroundColor: '#002366', justifyContent: 'center', alignItems: 'center', height: 60, marginBottom: 20 }} key={idx} onPress={() => {
                                goToProfile(el.id)
                            }}><Text style={{ fontSize: 24, color: 'white' }}>{el.Salesman_name}</Text></Pressable>
                        )
                    })
                }
            </ScrollView>
        </>
    );
}