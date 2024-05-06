import { useReducer } from 'react';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingScreen from './screens/LoadingScreen/LoadingScreen';
import LoginScreen from './screens/Auth/LoginScreen/LoginScreen';
import AlumniRegisterScreen from './screens/Auth/AlumniRegisterScreen/AlumniRegisterScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import NotificationsScreen from './screens/NotificationsScreen/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import UserReducer from './UserReducer';
import UserContext from './UserContext';

const Tab = createBottomTabNavigator();

const App = () => {
  const [currentUser, dispatch] = useReducer(UserReducer, null);


  return (
    <UserContext.Provider value={[currentUser, dispatch]}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Loading'
          screenOptions={{
            tabBarStyle: {
              backgroundColor: '#000',
            },
            tabBarActiveTintColor: 'rgb(220, 184, 255)',
          }}
        >
          <Tab.Screen
            name='Loading'
            component={LoadingScreen}
            options={{
              tabBarStyle: { display: 'none' },
              tabBarItemStyle: { display: 'none' },
              headerShown: false,
            }}
          />
          <Tab.Screen
            name='Login'
            component={LoginScreen}
            options={{
              tabBarStyle: { display: 'none' },
              tabBarItemStyle: { display: 'none' },
              headerShown: false,
            }}
          />
          <Tab.Screen
            name='AlumniRegister'
            component={AlumniRegisterScreen}
            options={{
              tabBarStyle: { display: 'none' },
              tabBarItemStyle: { display: 'none' },
              headerShown: false,
            }}
          />
          <Tab.Screen
            name='Home'
            component={HomeScreen}
            options={{
              headerShown: false,
              tabBarLabel: 'Trang chủ',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name='Notifications'
            component={NotificationsScreen}
            options={{
              headerShown: false,
              tabBarLabel: 'Thông báo',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="bell" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name='Profile'
            component={ProfileScreen}
            options={{
              headerShown: false,
              tabBarLabel: 'Bạn',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
