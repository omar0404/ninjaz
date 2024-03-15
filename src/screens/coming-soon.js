import {StyleSheet, Text, View} from 'react-native';

const ComingSoon = () => {
  return (
    <View style={style.container}>
      <Text style={style.text}>Coming Soon</Text>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});
export default ComingSoon;
