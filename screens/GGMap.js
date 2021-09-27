import React, { useState, useRef, useEffect } from 'react';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';



const GGMap = () => {
    const [regionMap, setRegionMap] = useState({
        latitude: 15.17642115964619,
        longitude: 106.51796964928509,
        latitudeDelta: 10.59873422613742,
        longitudeDelta: 5.700440816581249
    })




    const onchangeRegionMap = (region) => {
        setRegionMap(region)
    }

    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={true}
            style={styles.map}
            region={regionMap}
            onRegionChangeComplete={onchangeRegionMap}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default GGMap;