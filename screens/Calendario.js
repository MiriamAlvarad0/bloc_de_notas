import React, { useContext, useState } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NotasContext } from '../context/NotasContext';

const Calendario = () => {
    const { nota, notasEliminadas } = useContext(NotasContext);
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const markedDates = nota
        .filter((n) => !notasEliminadas.some((e) => e.id === n.id))
        .reduce((acc, nota) => {
            const date = nota.dateTime;
            if (!acc[date]) {
                acc[date] = { dots: [] };
            }
            acc[date].dots.push({ key: nota.id, color: 'blue', selectedDotColor: 'blue', title: nota.task });
            return acc;
        }, {});

    const handleDayPress = (day) => {
        const selectedDate = day.dateString;
        if (markedDates[selectedDate]) {
            setSelectedNotes(markedDates[selectedDate].dots);
            setModalVisible(true);
        }
    };

    const renderNote = ({ item }) => (
        <View style={styles.noteItem}>
            <Text style={styles.noteText}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Calendar
                markedDates={Object.keys(markedDates).reduce((acc, date) => {
                    acc[date] = { dots: markedDates[date].dots };
                    return acc;
                }, {})}
                markingType={'multi-dot'}
                onDayPress={handleDayPress}
                renderArrow={(direction) => (
                    <Icon name={`chevron-${direction}`} size={24} color="black" />
                )}
                theme={{
                    arrowColor: 'black',
                    todayTextColor: 'red',
                    dotColor: 'blue',
                    selectedDotColor: 'blue',
                }}
            />
            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.ModalBackground}>
                    <View style={styles.ModalBox}>
                        <FlatList
                            data={selectedNotes}
                            keyExtractor={(item) => item.key.toString()}
                            renderItem={renderNote}
                        />
                        <TouchableOpacity style={styles.ModalButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.ModalButtonText}>Cerrar</Text>
                        </TouchableOpacity>
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
    ModalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    ModalBox: {
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center"
    },
    noteItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    noteText: {
        fontSize: 16,
        color: "black"
    },
    ModalButton: {
        backgroundColor: "red",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20
    },
    ModalButtonText: {
        color: "black",
        fontSize: 15
    }
});

export default Calendario;
