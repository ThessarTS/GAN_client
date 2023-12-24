import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Profile from './screens/Profile';
import Order from './screens/Order';
import Home from './screens/Home';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import store from './store';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileTab = ({ route }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 57,
          paddingTop: 7,
          paddingBottom: 7,
          backgroundColor: "#002366",
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "order") {
            iconName = focused ? "book-sharp" : "book-outline";
          } else if (route.name === "profile") {
            iconName = focused ? "person-circle-sharp" : "person-circle-outline";
          }
          //tes
          return <Ionicons name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#bed4e9",
      })}
    >
      <Tab.Screen name="profile" component={Profile} />
      <Tab.Screen name="order" component={Order} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="toProfile"
            component={ProfileTab}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}