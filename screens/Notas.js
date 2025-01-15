import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Notas = () => {
    return (
        <View style={styles.container}>
        <View style={styles.card}>
            <Text style={styles.title}>Título de la Nota</Text>
            <Text style={styles.date}>Fecha de Creación: 14/01/2025</Text>
        </View>

        <TouchableOpacity style={styles.fab}>
            <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
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
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
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
    fab: {
        position: 'absolute',
        bottom: 16,
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
});

export default Notas;
