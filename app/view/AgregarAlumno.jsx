import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { validateData } from "../controller/controller";
import { logInfo, logError } from "../logger.js";

export default function AgregarAlumno({navigation}) {
    const [matricula, setMatricula] = useState("");
    const [nombre, setNombre] = useState("");
    const [semestre, setSemestre] = useState("");
    const [message, setMessage] = useState("");

    const sendData = async () => {
        logInfo("Btn guardar presionado");
        const msg = await validateData(matricula, nombre, semestre);

        setMessage(msg);

        if (msg === "Alumno guardado con éxito") {
            setMatricula("");
            setNombre("");
            setSemestre("");

            // borrar mensaje después de 2 sec
            setTimeout(() => setMessage(""), 2000);
        }
    };
    return (
        <View style={styles.container}>
        
        {/* Título */}
        <View style={styles.header}>
            <Text style={styles.headerText}>Supabase</Text>
        </View>
        {message !== "" && (
            <Text style={{ color: "blue", fontSize: 16, marginBottom: 10 }}>
                {message}
            </Text>
        )}


        {/* Inputs */}
        <TextInput
            style={styles.input}
            placeholder="Matrícula"
            placeholderTextColor="#b56576"
            onChangeText={setMatricula}
            value={matricula}
        />

        <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#999"
            onChangeText={setNombre}
            value={nombre}
        />

        <TextInput
            style={styles.input}
            placeholder="Semestre"
            placeholderTextColor="#999"
            onChangeText={setSemestre}
            value={semestre}
        />

        {/* Botón */}
        <TouchableOpacity style={styles.button} onPress={sendData}>
            <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("TodosAlumnos")}>
            <Text style={styles.buttonText}>Todos los alumnos</Text>
        </TouchableOpacity>

        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        paddingTop: 50,
    },

    header: {
        backgroundColor: "#3f51b5",
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 30,
    },

    headerText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },

    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginBottom: 25,
        paddingVertical: 8,
        fontSize: 16,
    },

    button: {
        backgroundColor: "#ccc",
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
});
