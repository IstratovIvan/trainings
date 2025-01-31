import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import React, { memo, useMemo, lazy, Suspense, useEffect, FC } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { useSelector } from 'react-redux';

// Типы для навигации
type TabParamList = {
    Profile: undefined;
    Workout: undefined;
    Calendar: undefined;
    Nutrition: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// Конфигурация иконок
const TAB_ICONS: Record<keyof TabParamList, [string, string]> = {
    Profile: ['person-outline', 'person'],
    Workout: ['barbell-outline', 'barbell'],
    Calendar: ['calendar-outline', 'calendar'],
    Nutrition: ['nutrition-outline', 'nutrition'],
};

// Русские названия экранов
const TAB_TITLES: Record<keyof TabParamList, string> = {
    Profile: 'Профиль',
    Workout: 'Тренировки',
    Calendar: 'Календарь',
    Nutrition: 'Питание',
};

// Ленивая загрузка экранов
const SCREENS = {
    Profile: lazy(() => import('../screens/Profile')),
    Workout: lazy(() => import('../screens/Workout')),
    Calendar: lazy(() => import('../screens/Calendar')),
    Nutrition: lazy(() => import('../screens/Nutrition')),
};

// Fallback для Suspense
const Loader = () => (
    <View className="flex-1 items-center justify-center bg-dark">
        <ActivityIndicator color={Colors.yellow} size="large" />
    </View>
);

// Мемоизированный компонент иконок
const TabIcon = memo(
    ({ name, focused }: { name: keyof TabParamList; focused: boolean }) => (
        <Ionicons
            name={TAB_ICONS[name][focused ? 1 : 0]}
            size={24}
            color={focused ? Colors.yellow : Colors.white}
        />
    )
);

interface Props {
    setAuth: (value: boolean) => void;
}

const Navigator: FC<Props> = memo(({ setAuth }) => {
    const screenOptions = useMemo(
        () => ({
            tabBarStyle: {
                backgroundColor: Colors.dark,
                borderTopWidth: 0,
                elevation: 0,
                height: 60,
                paddingBottom: 5,
            },
            tabBarActiveTintColor: Colors.yellow,
            tabBarInactiveTintColor: Colors.white,
            tabBarHideOnKeyboard: true,
            headerShown: false,
            lazy: true,
        }),
        []
    );

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
        <Suspense fallback={<Loader />}>
            <Tab.Navigator screenOptions={screenOptions}>
                {(Object.keys(TAB_ICONS) as (keyof TabParamList)[]).map(
                    (name) => (
                        <Tab.Screen
                            key={name}
                            name={name}
                            options={{
                                title: TAB_TITLES[name],
                                tabBarIcon: ({ focused }) => (
                                    <TabIcon name={name} focused={focused} />
                                ),
                            }}
                        >
                            {() => (
                                <Suspense fallback={<Loader />}>
                                    {React.createElement(SCREENS[name])}
                                </Suspense>
                            )}
                        </Tab.Screen>
                    )
                )}
            </Tab.Navigator>
        </Suspense>
    );
});

export default Navigator;
