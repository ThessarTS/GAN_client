
import { StyleSheet, Text, View, Image } from 'react-native';
import Header from '../components/Header';
import { useCallback, useState } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Profile({ navigation }) {
    const route = useRoute()
    const { currentId } = useSelector((state) => state)

    const [salesInfo, setSalesInfo] = useState([])
    const fetchSalesInfo = async () => {
        try {
            const { data } = await axios({
                url: `  https://9b10-180-244-154-90.ngrok-free.app/salesman/${currentId}`,
                method: 'GET'
            });
            setSalesInfo(data)
        } catch (error) {
            console.log('Error >>>>>', error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchSalesInfo()
        }, [currentId])
    )
    return (
        <>
            <Header navigation={navigation} route={route} />
            <View style={styles.container}>
                <Image style={{ height: 200, width: 200, marginBottom: -15 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5580/5580993.png' }} />
                <Text style={styles.salesName}>{salesInfo.name}</Text>
                <Text style={{ fontSize: 16 }}>{salesInfo.city}</Text>
            </View>
            <View style={styles.detailSales}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'white', width: '100%', alignItems: 'center', marginBottom: 20 }}>
                    <Text style={{ color: 'white' }}>Jabatan</Text>
                    <Text style={{ color: 'white', fontSize: 32, marginBottom: 20, }}>Salesman</Text>
                </View>
                <Text style={styles.summary}>Total Order</Text>
                <Text style={styles.summaryAmount}>{salesInfo.totalOrder}</Text>
                <Text style={styles.summary}>Total Revenue</Text>
                <Text style={styles.summaryAmount}>{salesInfo.totalAmount.toLocaleString('id', 'ID')}</Text>
                <Text style={styles.summary}>Total Commission</Text>
                <Text style={styles.summaryAmount}>{salesInfo.totalCommission.toLocaleString('id', 'ID')}</Text>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailSales: {
        flex: 1,
        color: 'white',
        backgroundColor: '#002366',
        alignItems: 'center',
        justifyContent: 'center',
    },
    salesName: {
        fontSize: 32,
    },
    summary: {
        color: 'white',
        fontSize: 16
    },
    summaryAmount: {
        color: 'white',
        fontSize: 22,
        marginBottom: 10
    }
});