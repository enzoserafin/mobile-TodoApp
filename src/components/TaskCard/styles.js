import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: '90%',
    height: 70,
    padding: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: '#FFF',

    // Android
    shadowColor: '#000',
    elevation: 5,

    // iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeActive: {
    width: 50,
    height: 50,
  },
  cardTitle: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  cardDate: {
    color: '#EE6B26',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardTime: {
    color: '#707070',
  },
  cardDone: {
    opacity: 0.5,
  },
});

export default styles;
