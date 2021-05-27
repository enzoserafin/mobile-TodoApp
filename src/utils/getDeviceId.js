import { Platform } from 'react-native';
import * as Application from 'expo-application';

async function getDeviceId() {
  if (Platform.OS === 'ios') {
    const iosId = await Application.getIosIdForVendorAsync();
    return iosId;
  }

  const androidID = Application.androidId;
  return androidID;
}

export default getDeviceId;
