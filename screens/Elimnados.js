import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NotasContext } from '../context/NotasContext';

const Eliminados = () => {
    const { notasEliminadas, recuperarNota } = useContext(NotasContext);

    const ListItem = ({ item }) => (
        <View style={styles.cardRow}>
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.title}>{item.task}</Text>
                    <Text style={styles.date}>Fecha de Eliminación: {item.dateTime}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Icon
                        name="restore"
                        size={24}
                        color="green"
                        onPress={() => recuperarNota(item.id)}
                    />
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {notasEliminadas.length === 0 ? (
                <Text>No hay notas eliminadas</Text>
            ) : (
                <FlatList
                    data={notasEliminadas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <ListItem item={item} />}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardRow: {
        marginBottom: 16,
    },
    cardContent: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    date: {
        fontSize: 14,
        color: '#666',
    },
    iconContainer: {
        padding: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 30,
        marginLeft: 10,
    },
});

export default Eliminados;
