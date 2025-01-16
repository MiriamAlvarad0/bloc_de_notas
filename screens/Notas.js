import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { NotasContext } from "../context/NotasContext";

const Notas = () => {
  const { nota, setnota, eliminarNota } = useContext(NotasContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [notaToDelete, setNotaToDelete] = useState(null);
  const navigation = useNavigation();

  const showDeleteModal = (notaId) => {
    setNotaToDelete(notaId);
    setModalMessage("¿Estás seguro de que quieres eliminar esta nota?");
    setModalVisible(true);
  };

  const confirmDelete = () => {
    if (notaToDelete) {
      eliminarNota(notaToDelete);
    }
    setModalVisible(false);
  };

  const cancelDelete = () => {
    setNotaToDelete(null);
    setModalVisible(false);
  };

  const ListItem = ({ notas }) => (
    <View style={styles.TaskCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.TaskTitle}>{notas?.task}</Text>
        <Text style={styles.TaskText}>{notas?.info}</Text>

        <Text style={styles.TaskDateTime}>
          Fecha de Creación: {notas?.dateTime}
        </Text>
      </View>
      <Icon
        name="delete"
        size={25}
        color="black"
        onPress={() => showDeleteModal(notas.id)}
      />
    </View>
  );

  // Obtener la fecha actual del dispositivo
  const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "long" });
    return `${day} de ${month}`;
  };

  return (
    <View style={styles.container}>
      {/* Encabezado superior */}
      <View style={styles.header}>
        <Text style={[styles.buenDia, { marginTop: 23 }]}>Buen Día</Text>
        <Text style={styles.hoy}>Hoy</Text>
        <Text style={styles.fecha}>{getCurrentDate()}</Text>
      </View>

      <FlatList
        style={styles.TaskList}
        data={nota}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ListItem notas={item} />}
      />

      <View style={styles.Footer}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("Crear")}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={cancelDelete}
      >
        <View style={styles.ModalBackground}>
          <View style={styles.ModalBox}>
            <Text style={styles.ModalText}>{modalMessage}</Text>
            <View style={styles.ButtonRow}>
              {/* Botón de Confirmar */}
              <TouchableOpacity
                style={[styles.ModalButton, { backgroundColor: "#00bf63" }]}
                onPress={confirmDelete}
              >
                <Text style={styles.ModalButtonText}>Confirmar</Text>
              </TouchableOpacity>

              {/* Botón de Cancelar */}
              <TouchableOpacity
                style={[styles.ModalButton, { backgroundColor: "#f4554c" }]}
                onPress={cancelDelete}
              >
                <Text style={styles.ModalButtonText}>Cancelar</Text>
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
    backgroundColor: "#f4f3f1",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 70,
    marginTop: 10,
  },
  buenDia: {
    fontSize: 30,
   /*  fontWeight: "bold", */
    color: "#333",
    marginLeft: 10,
    alignSelf: "flex-start",
  },
  hoy: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  fecha: {
    fontSize: 18,
    color: "#666",
    marginTop: 5,
  },
  TaskList: {
    flex: 1,
  },
  TaskCard: {
    backgroundColor: "#b5d2dd",
    borderRadius: 25,
    padding: 10,
    marginBottom: 16,
    shadowColor: "#00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    
  },
  TaskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  TaskText: {
    marginBottom: 8,
  },
  TaskDateTime: {
    fontSize: 14,
    color: "gray",
  },
  Footer: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fab: {
    position: "absolute",
    left: 290,
    bottom: 45,
    backgroundColor: "#007bff", // color del círculo crear
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  fabCalendar: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#007bff",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  fabText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  ModalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  ModalBox: {
    width: "80%",
    backgroundColor: "#efefef",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  ModalText: {
    fontSize: 18,
    color: "black",
    marginBottom: 20,
    textAlign: "center",
  },
  ButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
  ModalButton: {
    backgroundColor: "#00bf63",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f4554c",
  },
  ModalButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  ButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Distribuye los botones a los extremos
    width: "100%", // Ocupa todo el ancho disponible
  },
  ModalButton: {
    flex: 1, // Hace que ambos botones ocupen el mismo espacio
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 5, // Añade espacio entre los botones
  },
  cancelButton: {
    backgroundColor: "#f4554c", // Rojo para el botón de cancelar
  },
  ModalButtonText: {
    color: "white", //txt de
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Notas;
