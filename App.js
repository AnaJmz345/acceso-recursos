import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AgregarAlumno from './app/view/AgregarAlumno';
import TodosAlumnos from './app/view/TodosAlumnos';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AgregarAlumno" component={AgregarAlumno} />
        <Stack.Screen name="TodosAlumnos" component={TodosAlumnos}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}