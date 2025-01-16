import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NotasContext } from '../context/NotasContext';

const Calendario = () => {
    const { nota, notasEliminadas } = useContext(NotasContext);
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null); 

    const markedDates = nota
        .filter((n) => !notasEliminadas.some((e) => e.id === n.id))
        .reduce((acc, nota) => {
            const date = nota.dateTime;
            acc[date] = { marked: true, dotColor: 'transparent', customStyles: { container: styles.greenCircle } };
            return acc;
        }, {});

    useEffect(() => {
        if (selectedDate) {
            const notesForDate = nota.filter(
                (n) => n.dateTime === selectedDate && !notasEliminadas.some((e) => e.id === n.id)
            );
            setSelectedNotes(notesForDate.map((n) => ({ key: n.id, title: n.task })));
        }
    }, [nota, notasEliminadas, selectedDate]);

    const handleDayPress = (day) => {
        const selectedDate = day.dateString;
        setSelectedDate(selectedDate);
        const notesForDate = nota.filter(
            (n) => n.dateTime === selectedDate && !notasEliminadas.some((e) => e.id === n.id)
        );
        setSelectedNotes(notesForDate.map((n) => ({ key: n.id, title: n.task })));
    };

    const renderNote = ({ item }) => (
        <View style={styles.noteItem}>
            <View style={styles.row}>
                <Text style={styles.noteTitle}>{item.title}</Text>
                <View style={styles.verticalLine} />
            </View>
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
        backgroundColor: '#f4f3f1', 
        padding: 16,
    },
    calendarWrapper: {
        borderWidth: 2,
        borderColor: 'black', 
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 16,
    },
    greenCircle: {
        backgroundColor: '#25d37f',
        borderRadius: 15,
    },
    notesContainer: {
        flexGrow: 1,  
    },
    noteItem: {
        borderBottomWidth: 1, 
        padding: 5,
        backgroundColor: '#25d37f', 
        borderRadius: 40, // 
        borderWidth: 1,  
        borderColor: 'black',  
        marginBottom: 10,
        justifyContent: 'center', //cntra el contenido verticalmente
        alignItems: 'center', //centra el contenido horizontalmente
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',  //negrita
        color: 'black', //titulo en negro
        textAlign: 'center',
        marginBottom: 1,  //aade un pequeño espacio debajo del titulo
    },
    noteText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center', 
    },
});



export default Calendario;
