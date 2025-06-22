// App.tsx

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import Dashboard from './src/screens/Dashboard';
import PhishingScreen from './src/screens/phishing';
import ScamCallScreen from './src/screens/Scam-Call';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: '#111' },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: any;
          if (route.name === 'Dashboard') iconName = 'home-outline';
          if (route.name === 'Phishing') iconName = 'mail-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Phishing" component={PhishingScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'Quicksand-Bold': require('./assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-SemiBold': require('./assets/fonts/Quicksand-SemiBold.ttf'),
    'Quicksand-Medium': require('./assets/fonts/Quicksand-Medium.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="ScamCall" component={ScamCallScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
});
