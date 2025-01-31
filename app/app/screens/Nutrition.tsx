// screens/Nutrition.js
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
import { addNutrition } from '../store/slices/healthSlice';

const Nutrition = () => {
    const dispatch = useDispatch();
    const nutrition = useSelector((state) => state.health.nutrition);

    // Состояние для открытия модального окна и формы добавления приема пищи
    const [modalVisible, setModalVisible] = useState(false);
    const [newNutrition, setNewNutrition] = useState({
        date: '',
        calories: '',
        meal: '',
    });

    // Функция для добавления приема пищи
    const handleAddNutrition = () => {
        if (newNutrition.date && newNutrition.calories && newNutrition.meal) {
            dispatch(addNutrition(newNutrition)); // Добавляем прием пищи в Redux
            setModalVisible(false); // Закрыть модальное окно
            setNewNutrition({ date: '', calories: '', meal: '' }); // Очистить поля
        } else {
            alert('Пожалуйста, заполните все поля!');
        }
    };

    // Рендеринг элемента приема пищи
    const renderNutritionItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{`Дата: ${item.date}`}</Text>
            <Text style={styles.itemText}>{`Тип: ${item.meal}`}</Text>
            <Text
                style={styles.itemText}
            >{`Калории: ${item.calories} кКал`}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Мое питание</Text>
            <Button
                text="Добавить приём пищи"
                outline
                backgroundColor="#e26a00"
                icon="add"
                onPress={() => setModalVisible(true)} // Открыть модальное окно для добавления приема пищи
            />

            <FlatList
                data={nutrition}
                renderItem={renderNutritionItem}
                keyExtractor={(item, index) => index.toString()}
            />

            {/* Модальное окно для добавления приема пищи */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            Добавить приём пищи
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Дата"
                            value={newNutrition.date}
                            onChangeText={(text) =>
                                setNewNutrition({ ...newNutrition, date: text })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Тип еды (завтрак, обед, ужин)"
                            value={newNutrition.meal}
                            onChangeText={(text) =>
                                setNewNutrition({ ...newNutrition, meal: text })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Калории"
                            value={newNutrition.calories}
                            onChangeText={(text) =>
                                setNewNutrition({
                                    ...newNutrition,
                                    calories: text,
                                })
                            }
                            keyboardType="numeric"
                        />
                        <Button
                            text="Добавить"
                            onPress={handleAddNutrition}
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

export default Nutrition;
