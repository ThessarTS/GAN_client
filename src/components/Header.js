
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Header({ navigation, route }) {
    return (
        <View style={styles.header}>
            <Ionicons style={{ flex: 1, verticalAlign: 'middle' }} name="menu" size={45} color="white" onPress={() => {
                navigation.push("Home")
            }} />
            <Text style={styles.headerText}>{
                route.name == 'profile' ? 'My Profile' : 'List Order'
            }</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        position: 'relative',
        backgroundColor: '#002366',
        height: 60,
        flexDirection: 'row'
    },
    headerText: {
        flex: 5,
        color: 'white',
        textAlignVertical: 'center',
        fontSize: 22,
        fontWeight: '500'
    }
});