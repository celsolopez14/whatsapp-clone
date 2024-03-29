import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons, Entypo} from '@expo/vector-icons'
import StatusScreen from '../../screens/StatusScreen';
import CallsScreen from '../../screens/CallsScreen';
import CameraScreen from '../../screens/CameraScreen';
import ChatsScreen from '../../screens/ChatsScreen/ChatsScreen';
import SettingsScreen from '../../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Chats'
    screenOptions={{
        tabBarStyle: { backgroundColor: "whitesmoke" },
        headerStyle: { backgroundColor: "whitesmoke" },
      }}
    >
        <Tab.Screen name="Status" component={StatusScreen}
        options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="logo-whatsapp" size={size} color={color} />
            ),
          }}
         />
        <Tab.Screen name="Calls" component={CallsScreen}
         options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="call-outline" size={size} color={color} />
            ),
          }}
         />
        <Tab.Screen name="Camera" component={CameraScreen}
         options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="camera-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen name="Chats" component={ChatsScreen}
         options={({navigation}) => (
          {
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-chatbubbles-sharp" size={size} color={color} />
            ),

            headerRight: () => (
                <Entypo
                  onPress={() => navigation.navigate("Contacts") }
                  name="new-message"
                  size={18}
                  color={"royalblue"}
                  style={{ marginRight: 15 }}
                />
              ),
          }
         )}
        />
        <Tab.Screen name="Settings" component={SettingsScreen}
         options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
  </Tab.Navigator>
  )
}

export default MainTabNavigator