import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import Register from './Register';
import Login from './Login';
import { useSelector } from 'react-redux';

interface Props {
    setAuth: (value: boolean) => void;
}

const Auth: FC<Props> = ({ setAuth }) => {
    const [isLogin, setIsLogin] = useState(false);

    const token = useSelector((state) => state.health.jwt);

    useEffect(() => {
        const checkAuth = async () => {
            if (token) {
                setAuth(true); // Если JWT есть, пользователь авторизован
            } else {
                setAuth(false); // Если JWT нет, пользователь не авторизован
            }
        };

        checkAuth(); // Вызываем проверку при монтировании компонента
    }, [token]);

    return (
        <>
            {isLogin ? (
                <Login replace={setIsLogin} />
            ) : (
                <Register replace={setIsLogin} />
            )}
        </>
    );
};

export default Auth;
