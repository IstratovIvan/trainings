import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import { removeJwt, setUserData } from '../../store/slices/healthSlice'; // импорт действия для обновления данных

const UserBlock = () => {
    const dispatch = useDispatch();

    const [profileData, setProfileData] = useState(
        useSelector((state) => state.health.userData)
    ); // Получаем данные пользователя из Redux
    const [modalVisible, setModalVisible] = useState(false); // Состояние для отображения модалки

    // Обработчик изменения данных пользователя
    const handleUpdateProfile = () => {
        dispatch(setUserData(profileData)); // Обновляем данные в Redux
        setModalVisible(false); // Закрыть модальное окно
    };

    const handleLogout = () => {
        // Ваш код для выхода из аккаунта
        dispatch(removeJwt());
    };

    return (
        <View style={styles.userBlock}>
            <View style={styles.userInfo}>
                <View style={styles.imageWrapper}>
                    {/* Здесь может быть изображение пользователя */}
                </View>
                <View style={styles.userData}>
                    <Text style={styles.text}>{profileData.name}</Text>
                    <Text style={styles.text}>Рост: {profileData.height}</Text>
                    <Text style={styles.text}>Возраст: {profileData.age}</Text>
                    <Text style={styles.text}>Вес: {profileData.weight}</Text>
                </View>
            </View>

            <Button
                text="Редактировать"
                icon="edit"
                backgroundColor="#e26a00"
                outline
                onPress={() => setModalVisible(true)} // Открыть модальное окно
            />
            <Button
                text="Выйти"
                icon="logout"
                backgroundColor="#f45"
                outline
                onPress={handleLogout}
            />

            {/* Модальное окно для редактирования */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            Редактирование профиля
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Имя"
                            value={profileData.name}
                            onChangeText={(text) =>
                                setProfileData({ ...profileData, name: text })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Возраст"
                            keyboardType="numeric"
                            value={String(profileData.age)}
                            onChangeText={(text) =>
                                setProfileData({
                                    ...profileData,
                                    age: Number(text),
                                })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Рост"
                            keyboardType="numeric"
                            value={String(profileData.height)}
                            onChangeText={(text) =>
                                setProfileData({
                                    ...profileData,
                                    height: Number(text),
                                })
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Вес"
                            keyboardType="numeric"
                            value={String(profileData.weight)}
                            onChangeText={(text) =>
                                setProfileData({
                                    ...profileData,
                                    weight: Number(text),
                                })
                            }
                        />

                        <Button
                            text="Сохранить"
                            onPress={handleUpdateProfile}
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
        </View>
    );
};

const styles = StyleSheet.create({
    userBlock: {
        flexDirection: 'column',
        padding: 16,
        backgroundColor: '#333',
        gap: 16,
    },
    userInfo: {
        flexDirection: 'row',
        gap: 16,
    },
    imageWrapper: {
        aspectRatio: 1,
        backgroundColor: '#e26a00',
        width: '30%',
        borderRadius: '50%',
    },
    userData: {
        flex: 1,
        gap: 8,
    },
    text: {
        color: '#f1f1f1',
        fontSize: 20,
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

export default UserBlock;
