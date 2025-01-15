import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Eliminados = () => {
    return (
        <View style={styles.container}>
        {/* Card Template */}
        <View style={styles.cardRow}>
            <View style={styles.card}>
            <Text style={styles.title}>Título de la Nota Eliminada</Text>
            <Text style={styles.date}>Fecha de Eliminación: 14/01/2025</Text>
            </View>
            <TouchableOpacity style={styles.recoverButton}>
            <Text style={styles.recoverButtonText}>Recuperar</Text>
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
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
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
    recoverButton: {
        backgroundColor: '#28a745',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    recoverButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default Eliminados;
