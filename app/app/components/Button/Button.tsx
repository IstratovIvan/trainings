import React, { FC } from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
    icon?: string;
    iconPosition?: 'left' | 'right';
    text: string;
    backgroundColor?: string; // Любой цвет
    textColor?: string; // Опциональный цвет текста
    iconColor?: string; // Опциональный цвет иконки
    outline?: boolean;
    onPress?: () => void;
    style?: ViewStyle;
}

const Button: FC<Props> = ({
    icon,
    iconPosition = 'left',
    text,
    backgroundColor = '#FFFFFF',
    textColor,
    iconColor,
    outline = false,
    onPress,
    style,
}) => {
    // Автоматическое определение цвета текста и иконок
    const calculatedTextColor =
        textColor ||
        (outline ? backgroundColor : getContrastColor(backgroundColor));

    const calculatedIconColor = iconColor || calculatedTextColor;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[
                styles.button,
                {
                    backgroundColor: outline ? 'transparent' : backgroundColor,
                    borderColor: outline ? backgroundColor : 'transparent',
                    flexDirection:
                        iconPosition === 'right' ? 'row-reverse' : 'row',
                },
                style,
            ]}
        >
            {icon && (
                <MaterialIcons
                    name={icon}
                    size={24}
                    color={calculatedIconColor}
                    style={
                        iconPosition === 'left'
                            ? styles.leftIcon
                            : styles.rightIcon
                    }
                />
            )}
            <Text style={[styles.text, { color: calculatedTextColor }]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

// Вспомогательная функция для определения контрастного цвета
const getContrastColor = (hexColor: string) => {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        borderWidth: 2,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    leftIcon: {
        marginRight: 8,
    },
    rightIcon: {
        marginLeft: 8,
    },
});

export default Button;
