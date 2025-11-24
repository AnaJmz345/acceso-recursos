import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { loadAlumnos } from "../controller/controller";


export default function TodosAlumnos({ navigation }) {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    // Cargar inicialmente
    async function fetchData() {
      const data = await loadAlumnos();
      setAlumnos(data);
    }
    fetchData();

    //SUSCRIPCIÓN REALTIME A LA TABLA "alumnos"
    const channel = supabase
      .channel("alumnos-changes")
      .on(
        "postgres_changes",
        {
          event: "*",        // insert, update, delete
          schema: "public",
          table: "alumnos",
        },
        async () => {
          console.log("Tabla alumnos cambió, refrescando...");
          const data = await loadAlumnos();
          setAlumnos(data);
        }
      )
      .subscribe();

    // Limpiar suscripción al salir
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);


  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>
        {item.matricula}, {item.nombre}, {item.semestre}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Supabase</Text>
      </View>

      <FlatList
        data={alumnos}
        keyExtractor={(item) => item.matricula}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    backgroundColor: "#3f51b5",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 15, // separa la flecha del texto
  },

  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  itemText: {
    fontSize: 16,
  },
});
