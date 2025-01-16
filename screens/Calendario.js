import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NotasContext } from '../context/NotasContext';

const Calendario = () => {
    const { nota, notasEliminadas } = useContext(NotasContext);
    const [selectedNotes, setSelectedNotes] = useState([]);

    const markedDates = nota
        .filter((n) => !notasEliminadas.some((e) => e.id === n.id))
        .reduce((acc, nota) => {
            const date = nota.dateTime;
            acc[date] = { marked: true,  dotColor: 'transparent',  customStyles: { container: styles.greenCircle } };
            return acc;
        }, {});

    const handleDayPress = (day) => {
        const selectedDate = day.dateString;
        if (markedDates[selectedDate]) {
            const notesForDate = nota.filter(
                (n) => n.dateTime === selectedDate && !notasEliminadas.some((e) => e.id === n.id)
            );
            setSelectedNotes(notesForDate.map((n) => ({ key: n.id, title: n.task })));
        } else {
            setSelectedNotes([]);
        }
    };

    const renderNote = ({ item }) => (
        <View style={styles.noteItem}>
            <Text style={styles.noteText}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.calendarWrapper}>
                <Calendar
                    markedDates={markedDates}
                    markingType={'custom'}
                    onDayPress={handleDayPress}
                    renderArrow={(direction) => (
                        <Icon name={`chevron-${direction}`} size={24} color="black" />
                    )}
                    theme={{
                        arrowColor: 'black',
                        todayTextColor: 'black', 
                        dayTextColor: 'black', 
                        textMonthFontWeight: 'bold',
                        
                    }}
                />
            </View>
            <FlatList
                data={selectedNotes}
                keyExtractor={(item) => item.key.toString()}
                renderItem={renderNote}
                contentContainerStyle={styles.notesContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f3f1', //fondo
        padding: 16,
    },
    calendarWrapper: {
        borderWidth: 2,
        borderColor: 'black', //es el marco negro para el calendatio
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 16,
    },
    greenCircle: {
        backgroundColor: '#25d37f',
        borderRadius: 15,
    },
    notesContainer: {
        flexGrow: 1,  //eta propiedad asegura que la lista ocupe todo el espacio disponible
    },
    noteItem: {
        borderBottomWidth: 1, //bordesillo lo aplana abajo
        padding: 15,
        backgroundColor: '#25d37f', //fondo verde
        borderRadius: 150,  //borde ovalado
        borderWidth: 1,  //ancho del borde
        borderColor: 'black',  //color borde negro
        marginBottom: 10,  //espacio entre las notas
    },
    noteText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center', 
    },
});

export default Calendario;
