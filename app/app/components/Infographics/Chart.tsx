import React, { FC } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface Props {
    title?: string;
    data: {
        labels: string[];
        datasets: {
            data: number[];
        }[];
    };
    chartConfig?: {
        backgroundColor?: string;
        backgroundGradientFrom?: string;
        backgroundGradientTo?: string;
        decimalPlaces?: number;
        color?: (opacity?: number) => string;
        labelColor?: (opacity?: number) => string;
        style?: object;
        propsForDots?: object;
    };
    width?: number;
    height?: number;
    yAxisLabel?: string;
    yAxisSuffix?: string;
    bezier?: boolean;
}

const Chart: FC<Props> = ({
    title,
    data,
    chartConfig = {},
    width = Dimensions.get('window').width - 32,
    height = 220,
    yAxisLabel = '',
    yAxisSuffix = '',
    bezier = true,
}) => {
    // Дефолтная конфигурация графика
    const defaultConfig = {
        backgroundColor: '#1a1a1a',
        backgroundGradientFrom: '#2d2d2d',
        backgroundGradientTo: '#404040',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#a3a',
        },
        ...chartConfig,
    };

    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}
            <LineChart
                data={data}
                width={width}
                height={height}
                yAxisLabel={yAxisLabel}
                yAxisSuffix={yAxisSuffix}
                yAxisInterval={1}
                chartConfig={defaultConfig}
                bezier={bezier}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        marginTop: 16,
    },
    title: {
        color: '#f1f1f1',
        fontSize: 16,
        fontWeight: '900',
        padding: 10,
    },
});

export default Chart;
