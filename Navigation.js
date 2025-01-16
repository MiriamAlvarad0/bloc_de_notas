import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NotasProvider } from './context/NotasContext';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import Notas from './screens/Notas';
import Eliminados from './screens/Elimnados';
import Calendario from './screens/Calendario';
import crear from './screens/crear';

const HomeStackNavigator = createNativeStackNavigator();

function MyStack() {
    return (
        <HomeStackNavigator.Navigator
            initialRouteName="Notas"
        >
            <HomeStackNavigator.Screen
                name="Notas"
                component={Notas}
                options={{
                    headerShown: false
                }}
            />
            <HomeStackNavigator.Screen
                name="Crear"
                component={crear}
                options={{
                    headerBackTitleVisible: false,
                }}
            />
        </HomeStackNavigator.Navigator>
    )
}   

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
                component={MyStack}
                options={{
                    tabBarLabel: 'Notas',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="document-text-outline" size={size} color={color} />
                    ),
                    headerShown: false,
                    headerTitleAlign: 'center',
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
                    headerTitleAlign: 'center',
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
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#f4554c' },  //cambia el color de fondo del encabezado
                    headerTitleStyle: { color: 'white' },  //cambia el color del titulo del encabezado
                    
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
