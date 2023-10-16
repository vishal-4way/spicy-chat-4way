import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Common from '../../Style/Common.style';

const HomePageFilter = () => {
  return (
    <View style={Common.container}>
      <View style={styles.FilterBox}>
        <View style={styles.FilterText}>
          <TouchableOpacity style={styles.MaleFilter}>
            <Text style={styles.maleText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.MaleFilter}>
            <Text style={styles.maleText}>Female</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.dropDown}>
          <Text style={styles.maleText}>populary</Text>
          <Image
            source={require('../../assest/HomePage/DropDown.png')}
            style={styles.Drop_Img}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomePageFilter;
const styles = StyleSheet.create({
  FilterBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  FilterText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 14,
  },
  MaleFilter: {
    width: 86,
    height: 25,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(30, 41, 59, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  maleText: {
    color: '#fff',
    fontSize: 12,
  },
  dropDown: {
    width: 80,
    height: 25,
    backgroundColor: 'rgba(8, 74, 147, 0.47)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    flexDirection: 'row',
  },
  Drop_Img: {
    marginLeft: 8,
  },
  CharacterHitsList: {
    marginTop: 5,
  },
});
