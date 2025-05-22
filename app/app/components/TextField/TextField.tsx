import React, { FC } from 'react';
import { TextInput, View } from 'react-native';

interface Props {
    text: string;
    setText: (text: string) => void;
}

export const TextField: FC<Props> = ({ text, setText }) => {
    return (
        <View>
            <TextInput value={text} onChangeText={(text) => setText(text)} />
        </View>
    );
};
