import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Button, 
    Image, 
    Dimensions,
    ScrollView, 
} from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const GameOverScreen = props => {
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
        Dimensions.get('window').width
    );
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
        Dimensions.get('window').height
    );

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    })

    let imageContainer = styles.bigContainer;
    let screen = styles.bigScreen;

    if (availableDeviceHeight < 450 || availableDeviceWidth < 350) {
        imageContainer = styles.smallContainer;
        screen = styles.smallScreen;
    }

    return (
        <ScrollView>
            <View style={screen}>
                <TitleText>Game Over!</TitleText>
                <View style={imageContainer}>
                    <Image 
                        source={require('../assets/success.png')} 
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.resultText}>
                        Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>.
                    </BodyText>
                </View>
                <MainButton onPress={props.onRestart}>Play Again?</MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    bigScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 80
    },
    smallScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    bigContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        marginVertical: 30,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
    },
    smallContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 15,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    // imageSmall: {
    //     width: '50%',
    //     height: '50%'
    // },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;