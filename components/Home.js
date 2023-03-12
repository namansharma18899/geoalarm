import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Switch } from 'react-native';

export default function HomePage() {
  const [alarmName, setAlarmName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [radius, setRadius] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  const handleCreateAlarm = () => {
    console.log('Alarm created', {
      alarmName,
      latitude,
      longitude,
      radius,
      isEnabled,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GeoAlarm</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Alarm name"
          value={alarmName}
          onChangeText={setAlarmName}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          value={latitude}
          onChangeText={setLatitude}
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          value={longitude}
          onChangeText={setLongitude}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Radius (in meters)"
          value={radius}
          onChangeText={setRadius}
        />
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Enabled</Text>
          <Switch
            style={styles.switch}
            value={isEnabled}
            onValueChange={setIsEnabled}
            thumbColor={isEnabled ? 'hotpink' : '#f4f3f4'}
            trackColor={{ false: '#bdbdbd', true: 'hotpink' }}
          />
        </View>
      </View>
      <Button title="Create Alarm" onPress={handleCreateAlarm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  switchText: {
    fontSize: 16,
    marginRight: 8,
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
});
