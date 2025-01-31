import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    weightData: [55, 57, 47, 78],
    caloriesData: [1100, 1200, 1000, 1258, 3874, 550],
    weightLabels: ['01.02', '01.03', '01.04', '01.05'],
    caloriesLabels: ['01.02', '01.03', '01.04', '01.05', '01.04', '01.05'],
    workouts: [],
    nutrition: [],
    userData: {
        name: '',
        age: 0,
        height: 0,
        weight: 0,
    },
    jwt: null, // Добавляем поле для хранения JWT
};

const healthSlice = createSlice({
    name: 'health',
    initialState,
    reducers: {
        setWeightData: (state, action) => {
            state.weightData = action.payload;
        },
        setCaloriesData: (state, action) => {
            state.caloriesData = action.payload;
        },
        setWorkouts: (state, action) => {
            state.workouts = action.payload;
        },
        setNutrition: (state, action) => {
            state.nutrition = action.payload;
        },
        addWorkout: (state, action) => {
            state.workouts.push(action.payload); // Добавляем новую тренировку
        },
        addNutrition: (state, action) => {
            state.nutrition.push(action.payload); // Добавляем новый прием пищи
        },
        setUserData: (state, action) => {
            state.userData = action.payload; // Обновляем данные пользователя
        },
        setJwt: (state, action) => {
            state.jwt = action.payload; // Сохраняем JWT в состояние
        },
        removeJwt: (state) => {
            state.jwt = null; // Удаляем JWT из состояния
        },
    },
});

export const {
    setWeightData,
    setCaloriesData,
    setWorkouts,
    setNutrition,
    addWorkout,
    addNutrition,
    setUserData,
    setJwt, // Действие для установки JWT
    removeJwt, // Действие для удаления JWT
} = healthSlice.actions;

export default healthSlice.reducer;
