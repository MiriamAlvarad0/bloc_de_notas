import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Notas = () => {
    const [nota, setnota] = React.useState([]);
    const [textInput, setTextInput] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState('');
    
    //
    const [eliminadas, setEliminadas] = React.useState([]);

    React.useEffect(() => {
        getnotaFromUserDevice();
    }, []);

    React.useEffect(() => {
        savenotaToUserDevice(nota);
    }, [nota]);


    const showModal = (message, confirmAction = null) => {
        setModalMessage(message);
        setOnConfirm(() => confirmAction);
        setModalVisible(true);
    };


    const addnota = () => {
        if (textInput.trim() === '') {
            showModal('Por favor, ingrese una tarea válida');
        } else {
            const newnota = {
                id: Math.random(),
                task: textInput.trim(),
                completed: false,
                dateTime: new Date().toLocaleString(),
            };
            setnota([...nota, newnota]);
            setTextInput('');
        }
    };


    const savenotaToUserDevice = async (nota) => {
        try {
            const stringifynota = JSON.stringify(nota);
            await AsyncStorage.setItem('nota', stringifynota);
        } catch (error) {
            console.log(error);
        }
    };


    const getnotaFromUserDevice = async () => {
        try {
            const storednota = await AsyncStorage.getItem('nota');
            if (storednota != null) {
                setnota(JSON.parse(storednota));
            }
        } catch (error) {
            console.log(error);
        }
    };


    const deletenota = (notaId) => {
        const updatednota = nota.filter((item) => item.id !== notaId);
        setnota(updatednota);
    };


    const ListItem = ({ notas }) => (
        <View style={styles.TaskCard}>
            <View style={{ flex: 1 }}>
                <Text style={styles.TaskTitle} >
                    {notas?.task}
                </Text>
                <Text style={styles.TaskDateTime} >Fecha de Creación: {notas?.dateTime}</Text>
            </View>
            <Icon
                name="delete"
                size={20}
                color="red"
                onPress={() => deletenota(notas.id)}
            />
        </View>
    );

    const eliminadoItem = ({ notas }) => (
        <View style={styles.TaskCard}>
            <View style={{ flex: 1 }}>
                <Text style={styles.TaskTitle} >
                    {notas?.task}
                </Text>
                <Text style={styles.TaskDateTime} >Fecha de Creación: {notas?.dateTime}</Text>
            </View>
            <Icon
                name="delete"
                size={20}
                color="red"
                onPress={() => deletenota(notas.id)}
            />
        </View>
    );

    return (
        <View style={styles.container}>

            <FlatList style={styles.TaskList}
                data={nota}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ListItem notas={item} />}
            />

            
            <View style={styles.Footer}>
                <View style={styles.InputContainer}>
                    <TextInput
                        value={textInput}
                        placeholder="Agregar tarea"
                        onChangeText={(text) => setTextInput(text)}
                        style={{
                            height: 50,
                            fontSize: 16,
                            width: 250,
                            paddingHorizontal: 10
                        }}
                    />
                </View>

                <TouchableOpacity style={styles.fab} onPress={addnota}>
                    <Text style={styles.fabText}>+</Text>
                </TouchableOpacity>
            </View>
            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.ModalBackground}>
                    <View style={styles.ModalBox}>
                        <Text style={styles.ModalText}>{modalMessage}</Text>
                        <View style={styles.ButtonRow}>
                            <TouchableOpacity style={styles.ModalButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.ModalButtonText} >Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },

    Footer: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "white",
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    InputContainer: {
        flex: 1,
        marginRight: 70,
    },

    fab: {
        position: 'absolute',
        right: 16,
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
        fontSize: 24,
        fontWeight: 'bold',
    },

    TaskList: {
        flex: 1
    },

    TaskCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    TaskTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },

    TaskDateTime: {
        fontSize: 14,
        color: "gray"
    },

    ModalBackground:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"rgba(0, 0, 0, 0.5)"
    },

    ModalBox:{
        width:"80%",
        backgroundColor: "white",
        padding:20,
        borderRadius:10,
        alignItems:"center"
    },

    ModalText:{
        fontSize:18,
        color:"black",
        marginBottom:20,
        textAlign:"center"
    },

    ButtonRow:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:100
    },

    ModalButton:{
        backgroundColor:"red",
        padding:15,
        borderRadius:10,
        flex:1,
        margin:5,
        alignItems:"center"
    },

    ModalButtonText:{
        color:"black",
        fontSize:15
    }
});

export default Notas;
