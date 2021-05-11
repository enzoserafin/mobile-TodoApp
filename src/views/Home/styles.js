import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  filter: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    height: 70,
    alignItems: 'center',
  },
  filterTextActived: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#EE6b26',
  },
  filterTextInative: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#20295f',
    opacity: 0.5,
  },
  content: {
    width: '100%',
    marginTop: 30,
    marginBottom: Platform.OS === 'ios' ? 90 : 0,
  },
  title: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#20295f',
    alignItems: 'center',
  },
  titleText: {
    color: '#20295f',
    fontSize: 18,
    fontWeight: 'bold',
    position: 'relative',
    top: 11,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
});

export default styles;
