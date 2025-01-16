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
        else if (textInputcuerpo.trim() === '') {
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
                    {showWarning && <Text style={styles.warningText}>La nota debe tener titulo</Text>}
                    

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
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    InputContainer: {
        flex: 1,
        marginRight: 70,
    },
    fab: {
        position: 'absolute',
        left: 250,
        bottom: 25,
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
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Notas;
