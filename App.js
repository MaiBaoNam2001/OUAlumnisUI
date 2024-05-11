import { useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserContext from './UserContext';
import UserReducer from './UserReducer';
import LoadingScreen from './screens/LoadingScreen/LoadingScreen';
import LoginScreen from './screens/Auth/LoginScreen/LoginScreen';
import AlumniRegisterScreen from './screens/Auth/AlumniRegisterScreen/AlumniRegisterScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import NotificationsScreen from './screens/NotificationsScreen/NotificationsScreen';
import MenuScreen from './screens/MenuScreen/MenuScreen';
import UserInfoScreen from './screens/UserInfoScreen/UserInfoScreen';
import CoverImageChangeScreen from './screens/CoverImageChangeScreen/CoverImageChangeScreen';
import AvatarChangeScreen from './screens/AvatarChangeScreen/AvatarChangeScreen';
import BioChangeScreen from './screens/BioChangeScreen/BioChangeScreen';
import PasswordChangeScreen from './screens/PasswordChangeScreen/PasswordChangeScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  const [currentUser, dispatch] = useReducer(UserReducer, null);


  return (
    <UserContext.Provider value={[currentUser, dispatch]}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Loading'
          screenOptions={{
            headerShown: false,
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
            }}
          />
          <Tab.Screen
            name='Login'
            component={LoginScreen}
            options={{
              tabBarStyle: { display: 'none' },
              tabBarItemStyle: { display: 'none' },
            }}
          />
          <Tab.Screen
            name='AlumniRegister'
            component={AlumniRegisterScreen}
            options={{
              tabBarStyle: { display: 'none' },
              tabBarItemStyle: { display: 'none' },
            }}
          />
          <Tab.Screen
            name='Profile'
            component={ProfileScreen}
            options={{
              tabBarStyle: { display: 'none' },
              tabBarItemStyle: { display: 'none' },
            }}
          />
          <Tab.Screen
            name='UserInfo'
            component={UserInfoScreen}
            options={{
              tabBarStyle: { display: 'none' },
              tabBarItemStyle: { display: 'none' },
            }}
          />
          <Tab.Screen
            name='CoverImageChange'
            component={CoverImageChangeScreen}
            options={{
              tabBarStyle: { display: 'none' },
              tabBarItemStyle: { display: 'none' },
            }}
          />
          <Tab.Screen
            name='AvatarChange'
            component={AvatarChangeScreen}
            options={{
              tabBarStyle: { display: 'none' },
              tabBarItemStyle: { display: 'none' },
            }}
          />
          <Tab.Screen
            name='BioChange'
            component={BioChangeScreen}
            options={{
              tabBarStyle: { display: 'none' },
              tabBarItemStyle: { display: 'none' },
            }}
          />
          <Tab.Screen
            name='PasswordChange'
            component={PasswordChangeScreen}
            options={{
              tabBarStyle: { display: 'none' },
              tabBarItemStyle: { display: 'none' },
            }}
          />
          <Tab.Screen
            name='Home'
            component={HomeScreen}
            options={{
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
              tabBarLabel: 'Thông báo',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="bell" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name='Menu'
            component={MenuScreen}
            options={{
              tabBarLabel: 'Menu',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="menu" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;