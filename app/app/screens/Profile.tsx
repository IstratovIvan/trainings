// screens/Profile.js
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Modal,
    TextInput,
    View,
    Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Chart from '../components/Infographics/Chart';
import Button from '../components/Button/Button';
import { setWeightData } from '../store/slices/healthSlice';
import UserBlock from '../components/UserBlock/UserBlock';

const Profile = () => {
    const dispatch = useDispatch();
    const { weightData, caloriesData, weightLabels, caloriesLabels } =
        useSelector((state) => state.health);

    const [modalVisible, setModalVisible] = useState(false);
    const [newWeight, setNewWeight] = useState('');

    // Обработчик для обновления данных о весе
    const handleUpdateWeight = () => {
        if (newWeight) {
            // Диспатчим обновление веса в Redux
            dispatch(setWeightData([...weightData, parseFloat(newWeight)]));
            setModalVisible(false);
            setNewWeight('');
        } else {
            alert('Пожалуйста, введите вес');
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* График для веса */}
            <UserBlock />
            <Chart
                title="Вес"
                data={{
                    labels: weightLabels,
                    datasets: [
                        {
                            data: weightData,
                        },
                    ],
                }}
                chartConfig={{
                    backgroundGradientFrom: '#3c2',
                    backgroundGradientTo: '#388E3C',
                    color: (opacity) => `rgba(255, 255, 255, ${opacity})`,
                }}
                yAxisLabel=""
                yAxisSuffix="кг"
            />

            {/* Кнопка для редактирования веса */}
            <Button
                text="Внести новый вес"
                style={{
                    marginHorizontal: 16,
                    borderRadius: 16,
                    borderWidth: 0,
                }}
                textColor="#3c2"
                icon="add"
                outline
                onPress={() => setModalVisible(true)} // Открыть модальное окно
            />

            {/* График для калорий */}
            <Chart
                title="Калории"
                data={{
                    labels: caloriesLabels,
                    datasets: [
                        {
                            data: caloriesData,
                        },
                    ],
                }}
                chartConfig={{
                    backgroundGradientFrom: '#3c2',
                    backgroundGradientTo: '#388E3C',
                    color: (opacity) => `rgba(255, 255, 255, ${opacity})`,
                }}
                yAxisLabel=""
                yAxisSuffix="кКал"
            />

            {/* Модальное окно для редактирования веса */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Внесите новый вес</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Введите вес"
                            value={newWeight}
                            onChangeText={setNewWeight}
                            keyboardType="numeric"
                        />
                        <Button
                            text="Сохранить"
                            onPress={handleUpdateWeight}
                            backgroundColor="#4CAF50"
                            outline
                            icon="check"
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222',
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

export default Profile;
