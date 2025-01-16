import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const NotasContext = createContext();

export const NotasProvider = ({ children }) => {
    const [nota, setnota] = useState([]);
    const [notasEliminadas, setNotasEliminadas] = useState([]);

    useEffect(() => {
        getDataFromUserDevice();
    }, []);

    useEffect(() => {
        saveDataToUserDevice();
    }, [nota, notasEliminadas]);

    const saveDataToUserDevice = async () => {
        try {
            await AsyncStorage.setItem('nota', JSON.stringify(nota));
            await AsyncStorage.setItem('notasEliminadas', JSON.stringify(notasEliminadas));
        } catch (error) {
            console.log(error);
        }
    };

    const getDataFromUserDevice = async () => {
        try {
            const storednota = await AsyncStorage.getItem('nota');
            const storedEliminadas = await AsyncStorage.getItem('notasEliminadas');
            if (storednota) setnota(JSON.parse(storednota));
            if (storedEliminadas) setNotasEliminadas(JSON.parse(storedEliminadas));
        } catch (error) {
            console.log(error);
        }
    };

    const eliminarNota = (notaId) => {
        const notaAEliminar = nota.find((item) => item.id === notaId);
        if (notaAEliminar) {
            setnota(nota.filter((item) => item.id !== notaId));
            setNotasEliminadas([...notasEliminadas, notaAEliminar]);
        }
    };
    

    const recuperarNota = (notaId) => {
        const notaARecuperar = notasEliminadas.find((item) => item.id === notaId);
        setNotasEliminadas(notasEliminadas.filter((item) => item.id !== notaId));
        setnota([...nota, notaARecuperar]);
    };

    return (
        <NotasContext.Provider value={{ nota, setnota, notasEliminadas, eliminarNota, recuperarNota }}>
            {children}
        </NotasContext.Provider>
    );
};
