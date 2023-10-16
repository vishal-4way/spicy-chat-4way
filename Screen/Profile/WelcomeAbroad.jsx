import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Linking,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import CommonStyle from '../../Style/CommonStyle';
import jsonApiService from '../services/jsonApiService';
import {useDispatch} from 'react-redux';
import {setProfileItems} from '../User/userSlice';
import {useNavigation} from '@react-navigation/native';

const WelcomeAbroad = () => {
  const [checkedFirst, setCheckedFirst] = useState(false);
  const [checkedSecond, setCheckedSecond] = useState(false);
  const [userName, setUserName] = useState();
  const [Name, setName] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleSubmit = async () => {
    const data = {
      username: userName,
      name: Name,
    };
    const items = await jsonApiService.updateUser(data);
    dispatch(setProfileItems(items));
    navigation.navigate('HomePages');
  };
  return (
    <View style={CommonStyle.container}>
      <View>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          Welcome Abroad
        </Text>
      </View>
      <View style={{margin: 10, gap: 10}}>
        <View style={{marginTop: 5}}>
          <Text
            style={{
              color: 'white',
              fontSize: 17,
              fontWeight: 'bold',
            }}>
            Here's some basic rules:
          </Text>
        </View>
        <View style={{marginLeft: 9}}>
          <Text style={{color: 'white', fontSize: 17}}>- No Hate Speech</Text>
          <Text style={{color: 'white', fontSize: 17}}>- No Underage</Text>
          <Text style={{color: 'white', fontSize: 17}}>- No incest</Text>
        </View>
        <View>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Username
          </Text>
          <Text style={{color: 'white', fontSize: 13}}>
            The username that would appear on your public characters.
          </Text>
          <TextInput
            style={{backgroundColor: '#333944', color: '#FDFDFD', fontSize: 18}}
            value={userName}
            onChangeText={e => setUserName(e)}
          />
        </View>
        <View>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Name
          </Text>
          <Text style={{color: 'white', fontSize: 13}}>
            How you want to be called when chatting.
          </Text>
          <TextInput
            style={{backgroundColor: '#333944', color: '#FDFDFD', fontSize: 18}}
            value={Name}
            onChangeText={e => setName(e)}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
            }}
            onPress={() => {
              setCheckedFirst(!checkedFirst);
            }}>
            {!checkedFirst ? (
              <Image source={require('../../assest/HomePage/Check.png')} />
            ) : (
              <Image source={require('../../assest/HomePage/Checked.png')} />
            )}
            <Text style={{color: 'white', fontSize: 17}}>
              &nbsp;I confirm that, I am 18 years older.
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
            }}
            onPress={() => {
              setCheckedSecond(!checkedSecond);
            }}>
            {!checkedSecond ? (
              <Image source={require('../../assest/HomePage/Check.png')} />
            ) : (
              <Image source={require('../../assest/HomePage/Checked.png')} />
            )}
            <Text style={{color: 'white', fontSize: 17}}>
              &nbsp;You agree to be bound by our&nbsp;
              <Text
                style={{color: '#1D5BA9'}}
                onPress={() => Linking.openURL('https://spicychat.ai/terms')}>
                Terms of Services&nbsp;
              </Text>
              <Text>and&nbsp;</Text>
              <Text
                style={{color: '#1D5BA9'}}
                onPress={() => Linking.openURL('https://spicychat.ai/privacy')}>
                Privacy Policy.
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Button title="Start Chatting" onPress={() => handleSubmit()} />
        </View>
      </View>
    </View>
  );
};

export default WelcomeAbroad;
