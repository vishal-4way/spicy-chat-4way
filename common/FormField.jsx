import {View, Text, StyleSheet} from 'react-native';
import {lightTheme, darkTheme} from '../Screen/Theme/Theme';
import {useTheme} from '../Store/ThemeContext';

const FormField = props => {
  const {isDarkMode} = useTheme();
  const theme = isDarkMode ? lightTheme : darkTheme;
  let {title, description} = props;
  return (
    <View>
      <View>
        <View>
          <Text style={[styles.headingText, {color: theme.textColor}]}>
            {title}
          </Text>
        </View>
        <View>
          <Text style={[styles.descText, {color: theme.textColor}]}>
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headingText: {
    color: '#FDFDFD',
    fontSize: 16,
    fontWeight: '400',
  },
  descText: {
    color: '#C8C8C8',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 3,
  },
  textInput: {
    backgroundColor: '#333944',
    color: '#FDFDFD',
    fontSize: 18,
  },
});

export default FormField;
