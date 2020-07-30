import React from 'react'
import { Modal, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import styles from './styles'
interface ComponentProps {
    visible: boolean,
    coordinate: any,
    handlePosition: any,
}
export default function ({
    visible = false,
    coordinate = {},
    handlePosition
}: ComponentProps) {
    const initialRegion = {
        longitude: coordinate.longitude || 37.78825, latitude: coordinate.latitude || -122.4324,
        latitudeDelta: 0.0922, longitudeDelta: 0.0421,
    }
    return (
        <Modal visible={visible}>
            <View style={styles.container}>
                <MapView
                    onMarkerDragEnd={handlePosition}
                    onPress={handlePosition}
                    provider={PROVIDER_GOOGLE}
                    style={styles.mapView}
                    initialRegion={initialRegion}
                >
                    <Marker
                        draggable
                        coordinate={coordinate || initialRegion} />
                </MapView>
            </View>
        </Modal>
    )
}
