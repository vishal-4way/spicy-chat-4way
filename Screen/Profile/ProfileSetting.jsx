import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  TextInput,
  Linking,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AvatarCreate from '../Avatar/AvatarCreate';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setProfileItems} from '../User/userSlice';
import {useContext} from 'react';
import {avatarContext} from '../../Store/Auth_Context';
import RadioGroup from 'react-native-radio-buttons-group';
import FormField from '../../common/FormField';
import Common from '../../Style/Common.style';
import ProfileSettingStyle from './ProfileSetting.style';
import {Formik, useFormik} from 'formik';
import {lightTheme, darkTheme} from '../Theme/Theme';
import {useTheme} from '../../Store/ThemeContext';
const BASE_URL = 'https://ukoiv6wk37.execute-api.us-east-1.amazonaws.com';

const ProfileSetting = () => {
  const {isDarkMode} = useTheme();
  const theme = isDarkMode ? lightTheme : darkTheme;
  const {avatar} = useContext(avatarContext);
  const userToken = useSelector(state => state?.user?.kindeToken?.access_token);
  const navigation = useNavigation();

  const [selectRadio, setSelectRadio] = useState();
  const [showAdvance, setShowAdvance] = useState(false);
  const profile = useSelector(state => state?.user.profile);
  const dispatch = useDispatch();

  function getHeaders() {
    let headers = {};
    if (userToken) headers['Authorization'] = `Bearer ${userToken}`;
    return headers;
  }

  const initialValues = {
    username: profile?.username,
    name: profile?.name,
    avatar_url: profile?.avatar_url,
    highlights: profile?.highlights,
    openai_api_key: profile?.openai_api_key,
    openai_mode: profile?.openai_mode,
  };

  const {values, errors, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: initialValues,
    onSubmit: async values => {
      try {
        const response = await axios
          .patch(`${BASE_URL}/users`, values, {headers: getHeaders()})
          .catch(error => {
            throw new Error(error.response.data.error);
          });
        if (response.status == 200) {
          dispatch(setProfileItems(response.data));
        }
        return response.data;
      } catch (error) {
        console.error(`Error updating resource: ${error}`);
        throw error;
      }
    },
  });
  const openAiMode = useMemo(
    () => [
      {
        id: '1',
        label: 'Disabled : Not using your key.',
        value: 'disabled',
        color: 'black',
        labelStyle: {fontSize: 14, fontWeight: 400, color: 'white'},
      },
      {
        id: '2',
        label: 'Enabled : Always using OpenAI',
        value: 'enabled',
        color: 'black',
        labelStyle: {fontSize: 14, fontWeight: 400, color: 'white'},
      },
      {
        id: '3',
        label: 'Hybrid : OpenAI unless moderation is triggered.',
        value: 'hybrid',
        color: 'black',
        labelStyle: {fontSize: 14, fontWeight: 400, color: 'white'},
      },
    ],
    [values.openai_mode],
  );

  return (
    <Formik enableReinitialize={true} onSubmit={handleSubmit}>
      <View
        style={[Common.container, {backgroundColor: theme.backgroundColor}]}>
        <View style={ProfileSettingStyle.secondView}>
          <Text
            style={[ProfileSettingStyle.profileText, {color: theme.textColor}]}>
            Profile Setting
          </Text>
        </View>
        <ScrollView>
          <View style={ProfileSettingStyle.nextView}>
            <View>
              <FormField
                name="username"
                title="Username"
                description="You can change this at any time."
              />
              <TextInput
                style={ProfileSettingStyle.textInput}
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur}
              />
            </View>
            <View>
              <FormField
                name="name"
                title="Name"
                description="The name you'll use for chatting."
              />
              <TextInput
                style={ProfileSettingStyle.textInput}
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur}
              />
            </View>
            <View>
              <FormField
                name="Avatar"
                title="Avatar"
                description="You can either create an image from text or upload an image."
              />
              <AvatarCreate />
            </View>
            <View>
              <FormField
                name="highlights"
                title="Highlights (Optional)"
                description="Used only in your conversations to help the AI with context. Keep it short (1-2 sentences)."
              />
              <TextInput
                style={ProfileSettingStyle.textInput}
                value={values.highlights}
                onChangeText={handleChange('highlights')}
                onBlur={handleBlur}
              />
            </View>
            <View style={{width: 100}}>
              <Button
                title="Advanced"
                onPress={() => setShowAdvance(!showAdvance)}
                color={showAdvance ? '#1D5BA9' : '#3B4451'}
              />
            </View>
            {showAdvance ? (
              <>
                <Text
                  style={ProfileSettingStyle.link}
                  onPress={() =>
                    Linking.openURL(
                      'https://docs.spicychat.ai/advanced/openai-api-on-spicychat',
                    )
                  }>
                  Read how to improve your experience using openAI
                  <Image
                    source={require('../../assest/Profile/ShareImage.png')}
                  />
                </Text>
                <View>
                  <FormField
                    name="openai_api_key"
                    title="OpenAI API Key"
                    description="Your api key is securely stored."
                  />
                  <TextInput
                    style={ProfileSettingStyle.textInput}
                    value={values.openai_api_key}
                    onChangeText={handleChange('openai_api_key')}
                    onBlur={handleBlur}
                  />
                </View>
                <View>
                  <FormField
                    name="OpenAI Mode"
                    title="OpenAI Mode"
                    description="The OpenAI mode you want to use"
                  />
                  <View style={ProfileSettingStyle.radioView}>
                    <RadioGroup
                      containerStyle={{alignItems: 'flex-start'}}
                      radioButtons={openAiMode}
                      onPress={setSelectRadio}
                      selectedId={selectRadio}
                    />
                  </View>
                </View>
              </>
            ) : null}
          </View>
        </ScrollView>
        <View style={ProfileSettingStyle.lastBtns}>
          <View style={ProfileSettingStyle.lastBtnsSubView}>
            <Button
              title="Cancel"
              color={'#808080'}
              onPress={() => navigation.navigate('HomePage')}
            />
          </View>
          <View style={ProfileSettingStyle.lastBtnsSubView}>
            <Button title="Update" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </Formik>
  );
};

export default ProfileSetting;
