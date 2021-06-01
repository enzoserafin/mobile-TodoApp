import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: getBottomSpace() + 70,
    backgroundColor: '#20295F',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 5,
    borderColor: '#EE6B26',
    alignItems: 'center',
  },
  icon: {
    position: 'relative',
    top: -40,
  },
  iconImage: {
    width: 80,
    height: 80,
  },
  text: {
    position: 'relative',
    top: -35,
    color: '#FFF',
  },
});

export default styles;
