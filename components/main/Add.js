import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Button } from 'react-native-paper';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
        <View style={styles.cameraContainer}>
            <Camera 
                style={styles.fixedRatio} 
                type={type}
                ratio={'1:1'}/>
        </View>
    
    <Button
        style={{flex:0.1,
        alignSelf:'flex-end',
        alignItems:'center',
        }}

        title="Flip Image"

        onPress={() => {
            setType(
                type === CameraType.back 
                    ? CameraType.front 
                    : CameraType.back
            );
        }}>

    </Button>
    </View>

  );
}

const style =StyleSheet.create({
    cameraContainer:{
        flex:1
    },
    fixedRatio:{
        flex:1,
        aspectRatio:1
    }
     

})