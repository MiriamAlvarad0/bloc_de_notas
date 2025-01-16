import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NotasContext } from '../context/NotasContext';


const Notas = () => {
    const { nota, setnota, eliminarNota } = useContext(NotasContext);
    const [textInput, setTextInput] = useState('');
    const [textInputcuerpo, setTextInputcuerpo] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [showWarningcuerpo, setShowWarningcuerpo] = useState(false);

    const addnota = () => {
        if (textInput.trim() === '') {
            setShowWarning(true);
        }
        if (textInputcuerpo.trim() === '') {
            setShowWarningcuerpo(true);
        }
        else {
            const newnota = {
                id: Math.random(),
                task: textInput.trim(),
                info: textInputcuerpo.trim(),
                completed: false,
                dateTime: new Date().toISOString().split('T')[0], // Fecha en formato YYYY-MM-DD
            };
            setnota([...nota, newnota]);
            setTextInput('');
            setTextInputcuerpo('');
            setShowWarning(false);
            setShowWarningcuerpo(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.InputContainer}>
                <TextInput
                    value={textInput}
                    placeholder="Título"
                    onChangeText={(text) => {
                        setTextInput(text);
                        setShowWarning(false); 
                    }}
                    style={[
                        styles.input,
                        showWarning && styles.inputWarning,
                    ]}
                />
                {showWarning && <Text style={styles.warningText}>La nota debe tener título</Text>}

                {/* Linea  entre titulo y nota */}
                <View style={styles.separator} />

                <TextInput
                    value={textInputcuerpo}
                    placeholder="Nota"
                    onChangeText={(text) => {
                        setTextInputcuerpo(text);
                        setShowWarningcuerpo(false); 
                    }}
                    style={[
                        styles.input,
                        showWarningcuerpo && styles.inputWarning,
                    ]}
                />
                {showWarningcuerpo && <Text style={styles.warningText}>La nota no puede estar vacía</Text>}

                <TouchableOpacity style={styles.fab} onPress={addnota}>
                    <Text style={styles.fabText}>Crear</Text>
                </TouchableOpacity> 
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f3f1', // fondo
        padding: 16,
    },
    InputContainer: {
        flex: 1,
        marginRight: 70,
    },
    fab: {
        position: 'absolute',
        left: 290,
        bottom: 45,
        backgroundColor: '#007bff', // color del círculo crear
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    fabCalendar: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: '#007bff',
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    fabText: {
        color: '#fff',
        fontSize: 15, // tamaño de letra para el botón crear
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        /* borderColor: '#ccc', */
        /* borderWidth: 1, */
       /*  borderRadius: 8, */
       /*  marginBottom: 10, */
       /*  paddingLeft: 10, */
        fontSize: 18, // tamaño de letra aumentado
        fontWeight: 'bold', // negrita 
        /* shadowOffset: { width: 0, height: 0 }, // Desplazamiento de la sombra */
        /* shadowOpacity: 0.3, // Transparencia de la sombra */
        shadowRadius: 3, // Radio de la sombra
        elevation: 0, // Eleva el compone
      
    },
    inputWarning: {
        borderColor: '#ff0000',
    },
    warningText: {
        color: '#f4554c',
        fontSize: 14,
        fontWeight: 'bold', // negrita en la advertencia 
    },
    separator: {
        height: 2, //linea vertical negrita
        backgroundColor: 'black',
        marginVertical: 1, //espacio entre los inputs
    },
});

export default Notas;























































































































