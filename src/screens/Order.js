
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import axios from 'axios';

export default function Order({ navigation }) {
    const route = useRoute()
    const { currentId } = useSelector((state) => state)

    const [order, setOrder] = useState([])
    const fetchOrder = async () => {
        try {
            const { data } = await axios({
                url: `https://9b10-180-244-154-90.ngrok-free.app/order/${currentId}`,
                method: 'GET'
            });
            setOrder(data)
        } catch (error) {
            console.log('Error >>>>>', error);
        }
    }

    console.log(order);

    useFocusEffect(
        useCallback(() => {
            fetchOrder()
        }, [currentId])
    )
    return (
        <>
            <Header navigation={navigation} route={route} />
            <ScrollView>
                {
                    order?.map((el, idx) => {
                        return (
                            <View key={idx} style={styles.card}>
                                <View style={{ marginBottom: 10, paddingTop: 10 }}>
                                    <Text style={{ textAlign: 'right', fontSize: 18, fontWeight: '600' }}>Order Masuk</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.text1}>Waktu</Text>
                                    <Text style={styles.text2}>{el.Order_date.split('T')[0]}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.text1}>Nama</Text>
                                    <Text style={styles.text2}>{el.Customer.Customer_name}</Text>
                                </View>
                                <View style={{
                                    borderTopWidth: 1,
                                    borderBottomWidth: 1,
                                    borderColor: '#189ad3',
                                    flexDirection: 'row',
                                    paddingVertical: 5,
                                    marginBottom: 45
                                }}>
                                    <Text style={styles.text1}>Amount</Text>
                                    <Text style={styles.text2}>{el.Amount.toLocaleString('id', 'ID')}</Text>
                                </View>
                            </View>
                        )
                    })
                }

            </ScrollView>
        </>
    );
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#CAE8FB',
        borderWidth: 1,
        borderColor: '#189ad3',
        marginVertical: 10,
        marginHorizontal: 15,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    row: {
        borderTopWidth: 1,
        borderColor: '#189ad3',
        flexDirection: 'row',
        paddingVertical: 5
    },
    text1: {
        flex: 1,
        fontSize: 16
    },
    text2: {
        flex: 1,
        textAlign: 'right',
        fontSize: 16
    }
});