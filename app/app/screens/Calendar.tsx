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
import CalendarPicker from 'react-native-calendar-picker';

const Calendar = () => {
    const dispatch = useDispatch();
    const workouts = useSelector((state) => state.health.workouts);
    const nutrition = useSelector((state) => state.health.nutrition);

    const [selectedDate, setSelectedDate] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [newWorkout, setNewWorkout] = useState({
        date: '',
        duration: '',
        type: '',
    });

    const handleDateChange = (date) => {
        setSelectedDate(date.toLocaleDateString('ru-RU')); // Форматируем в строку
    };

    const handleAddWorkout = () => {
        if (newWorkout.date && newWorkout.duration && newWorkout.type) {
            dispatch(addWorkout(newWorkout)); // Добавляем тренировку в Redux
            setModalVisible(false); // Закрыть модальное окно
            setNewWorkout({ date: '', duration: '', type: '' }); // Очистить поля
        } else {
            alert('Пожалуйста, заполните все поля!');
        }
    };

    // Фильтрация тренировок и питания по выбранной дате
    const filteredWorkouts = workouts.filter(
        (workout) => workout.date === selectedDate
    );

    const filteredNutrition = nutrition.filter(
        (meal) => meal.date === selectedDate
    );

    // Рендеринг элементов тренировки и приёма пищи
    const renderWorkoutItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{`Дата: ${item.date}`}</Text>
            <Text style={styles.itemText}>{`Тип: ${item.type}`}</Text>
            <Text
                style={styles.itemText}
            >{`Длительность: ${item.duration} мин`}</Text>
        </View>
    );

    const renderNutritionItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{`Дата: ${item.date}`}</Text>
            <Text style={styles.itemText}>{`Приём пищи: ${item.meal}`}</Text>
            <Text
                style={styles.itemText}
            >{`Каллории: ${item.calories} кКал`}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Календарь</Text>
            <CalendarPicker
                onDateChange={handleDateChange} // Функция, которая вызывается при изменении даты
                selectedDayColor="#e26a00" // Цвет выбранного дня
                selectedDayTextColor="#fff" // Цвет текста выбранного дня
                todayBackgroundColor="#3c2" // Цвет фона сегодняшнего дня
                textStyle={{ color: '#fff' }} // Цвет текста для всех дней
                previousTitle="<"
                nextTitle=">"
                weekdays={['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']}
                months={[
                    'Январь',
                    'Февраль',
                    'Март',
                    'Апрель',
                    'Май',
                    'Июнь',
                    'Июль',
                    'Август',
                    'Сентябрь',
                    'Октябрь',
                    'Ноябрь',
                    'Декабрь',
                ]}
            />

            {filteredWorkouts.length > 0 && (
                <>
                    <Text style={styles.sectionTitle}>
                        Тренировки на {selectedDate}
                    </Text>
                    <FlatList
                        data={filteredWorkouts}
                        renderItem={renderWorkoutItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </>
            )}

            {filteredNutrition.length > 0 && (
                <>
                    <Text style={styles.sectionTitle}>
                        Приёмы пищи на {selectedDate}
                    </Text>
                    <FlatList
                        data={filteredNutrition}
                        renderItem={renderNutritionItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </>
            )}
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
    sectionTitle: {
        color: '#e26a00',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10,
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
    selectedDate: {
        color: '#e26a00',
        marginTop: 20,
        fontSize: 16,
    },
});

export default Calendar;
