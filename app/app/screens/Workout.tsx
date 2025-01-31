// screens/Workout.js
import React, { useState } from 'react';
import {
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button/Button';
import { addWorkout } from '../store/slices/healthSlice';

const Workout = () => {
    const dispatch = useDispatch();
    const workouts = useSelector((state) => state.health.workouts);

    // Состояние для открытия модального окна и формы добавления тренировки
    const [modalVisible, setModalVisible] = useState(false);
    const [newWorkout, setNewWorkout] = useState({
        date: '',
        duration: '',
        type: '',
    });

    // Функция для добавления тренировки
    const handleAddWorkout = () => {
        if (newWorkout.date && newWorkout.duration && newWorkout.type) {
            dispatch(addWorkout(newWorkout)); // Добавляем тренировку в Redux
            setModalVisible(false); // Закрыть модальное окно
            setNewWorkout({ date: '', duration: '', type: '' }); // Очистить поля
        } else {
            alert('Пожалуйста, заполните все поля!');
        }
    };

    // Рендеринг элемента тренировки
    const renderWorkoutItem = ({ item }: { item: any }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{`Дата: ${item.date}`}</Text>
            <Text style={styles.itemText}>{`Тип: ${item.type}`}</Text>
            <Text
                style={styles.itemText}
            >{`Длительность: ${item.duration} мин`}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Мои тренировки</Text>
            <Button
                text="Тренировка"
                outline
                backgroundColor="#e26a00"
                icon="add"
                onPress={() => setModalVisible(true)} // Открыть модальное окно для добавления тренировки
            />

            <FlatList
                data={workouts}
                renderItem={renderWorkoutItem}
                keyExtractor={(item, index) => index.toString()}
            />

            {/* Модальное окно для добавления тренировки */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            Добавить тренировку
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Дата"
                            value={newWorkout.date}
                            onChangeText={(text) =>
                                setNewWorkout({ ...newWorkout, date: text })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Тип тренировки"
                            value={newWorkout.type}
                            onChangeText={(text) =>
                                setNewWorkout({ ...newWorkout, type: text })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Длительность (мин)"
                            value={newWorkout.duration}
                            onChangeText={(text) =>
                                setNewWorkout({ ...newWorkout, duration: text })
                            }
                            keyboardType="numeric"
                        />
                        <Button
                            text="Добавить"
                            onPress={handleAddWorkout}
                            backgroundColor="#4CAF50"
                            outline
                            icon="add"
                            style={{ marginTop: 10 }}
                        />
                        <Button
                            text="Отмена"
                            onPress={() => setModalVisible(false)}
                            backgroundColor="#f44336"
                            style={{ marginTop: 10 }}
                            icon="close"
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222',
        padding: 16,
        gap: 16,
        flex: 1,
    },
    text: {
        color: '#f1f1f1',
        textAlign: 'center',
        padding: 10,
        fontSize: 20,
        fontWeight: '600',
    },
    item: {
        borderColor: '#e26a00',
        borderWidth: 2,
        padding: 10,
        marginVertical: 8,
        borderRadius: 8,
    },
    itemText: {
        color: '#f1f1f1',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 8,
    },
});

export default Workout;
