import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NotasProvider } from './context/NotasContext';

// Screens
import Notas from './screens/Notas';
import Eliminados from './screens/Elimnados';
import Calendario from './screens/Calendario';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Notas"
            screenOptions={{
                tabBarActiveTintColor: "black",
            }}
        >
            <Tab.Screen 
                name="Notas" 
                component={Notas}
                options={{
                    tabBarLabel: 'Notas',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="document-text-outline" size={size} color={color} />
                    ),
                    headerShown: false,
                }}  
            />
            <Tab.Screen 
                name="Calendario" 
                component={Calendario}
                options={{
                    tabBarLabel: 'Calendario',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar-outline" size={size} color={color} />
                    ),
                    headerShown: true,
                }}  
            />
            <Tab.Screen 
                name="Eliminados" 
                component={Eliminados}
                options={{
                    tabBarLabel: 'Eliminados',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="trash-outline" size={size} color={color} />
                    ),
                    headerShown: true,
                }}  
            />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NotasProvider>
            <NavigationContainer>
                <MyTabs />
            </NavigationContainer>
        </NotasProvider>
    );
}