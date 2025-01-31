import React, { FC, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { setJwt } from '../store/slices/healthSlice'; // Импортируем действие для сохранения JWT
import loginUser from '../apiController/login';
import Button from '../components/Button/Button';

interface Props {
    replace: (value: boolean) => void;
}

const Login: FC<Props> = ({ replace }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
            return;
        }

        setLoading(true);

        const response = await loginUser(email, password);

        if (response) {
            // Сохраняем JWT в Redux
            dispatch(setJwt(response.jwt));
            console.log(response);
        } else {
            Alert.alert('Ошибка', 'Неверные данные для входа');
        }

        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вход</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button
                text={loading ? 'Загрузка...' : 'Войти'}
                onPress={handleLogin}
                backgroundColor="#3c2"
                style={{ marginBottom: 20 }}
                outline
            />

            <Button
                text={loading ? 'Загрузка...' : 'Регистрация'}
                onPress={() => replace(false)} // Переход на экран регистрации
                backgroundColor="#36a"
                outline
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        borderRadius: 5,
    },
});

export default Login;
