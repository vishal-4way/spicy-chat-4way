import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';
import React, {useState, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import AvatarCreate from '../Avatar/AvatarCreate';
import RadioGroup from 'react-native-radio-buttons-group';
import FormField from '../../common/FormField';
import ProfileSettingStyle from '../Profile/ProfileSetting.style';
import {lightTheme, darkTheme} from '../Theme/Theme';
import {useTheme} from '../../Store/ThemeContext';
import CreateStyle from './Create.style';

const BASE_URL = 'https://ukoiv6wk37.execute-api.us-east-1.amazonaws.com';
const Create = () => {
  const [showAdvance, setShowAdvance] = useState(false);
  const [visibilityid, setVisibilityId] = useState();
  const [definitionVisibilityid, setDefinitionVisibilityId] = useState();
  const [check, setCheck] = useState(false);
  const [name, setName] = useState();
  const [title, setTitle] = useState();
  const [greeting, setGreeting] = useState();
  const [chatbotPersonality, setChatbotPersonality] = useState();
  const [visibility, setVisibility] = useState();
  const [definitionVisibility, setDefinitionVisibility] = useState();
  const [scenario, setScenario] = useState();
  const [exampleDialogues, setExampleDialogues] = useState();
  const {isDarkMode} = useTheme();
  const theme = isDarkMode ? lightTheme : darkTheme;
  const navigation = useNavigation();
  const userToken = useSelector(state => state?.user?.kindeToken?.access_token);

  function getHeaders() {
    let headers = {};
    if (userToken) headers['Authorization'] = `Bearer ${userToken}`;
    return headers;
  }

  const handleSave = async () => {
    console.warn('handleSave is clicked');

    // Hardcoded Values
    let payload = {
      name: name,
      title: title,
      greeting: greeting,
      persona: chatbotPersonality,
      visibility: 'public',
      definition_visible: true,
      tags: [],
      scenario: scenario?.length > 1 ? scenario : null,
      dialogue: exampleDialogues?.length > 1 ? exampleDialogues : null,
    };

    try {
      const response = await axios.post(`${BASE_URL}/characters`, payload, {
        headers: getHeaders(),
      });
    } catch (error) {
    }
  };

  const visibilityButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Public : Anyone can chat',
        value: 'public',
        color: 'black',
        labelStyle: {fontSize: 14, fontWeight: 400, color: 'white'},
      },
      {
        id: '2',
        label: 'Unlisted : Anyone with the link',
        value: 'hidden',
        color: 'black',
        labelStyle: {fontSize: 14, fontWeight: 400, color: 'white'},
      },
      {
        id: '3',
        label: 'Private : Only you can chat',
        value: 'private',
        color: 'black',
        labelStyle: {fontSize: 14, fontWeight: 400, color: 'white'},
      },
    ],
    [],
  );
  const definitionVisibilityButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Public : Anyone can see the details of this chatbot.',
        value: true,
        color: 'black',
        labelStyle: {fontSize: 14, fontWeight: 400, color: 'white'},
      },
      {
        id: '2',
        label: 'Private : The definition of this chatbot cannot be inspected.',
        value: false,
        color: 'black',
        labelStyle: {fontSize: 14, fontWeight: 400, color: 'white'},
      },
    ],
    [],
  );

  return (
    <View style={[CreateStyle.container, {backgroundColor: theme.backgroundColor}]}>
      <View>
        <Text style={[CreateStyle.profileText, {color: theme.textColor}]}>
          Create Your Own ChatBot
        </Text>
      </View>
      <Text
        style={CreateStyle.link}
        onPress={() =>
          Linking.openURL(
            'https://docs.spicychat.ai/product-guides/creating-chatbots',
          )
        }>
        Read our Chatbot Creation guide.
        <Image source={require('../../assest/Profile/ShareImage.png')} />
      </Text>
      <ScrollView>
        <View style={CreateStyle.nextView}>
          <View>
            <FormField
              name="Name"
              title="Name"
              description="The name can include first and last names."
            />
            <TextInput style={ProfileSettingStyle.textInput} />
          </View>
          <View>
            <FormField
              name="Title"
              title="Title"
              description="Short sentence describing your chatbot, for display only."
            />
            <TextInput style={ProfileSettingStyle.textInput} />
          </View>
          <View>
            <FormField
              name="Greeting"
              title="Greeting"
              description="What will they say to start a conversation."
            />
            <TextInput style={ProfileSettingStyle.textInput} />
          </View>
          <View>
            <FormField
              name="ChatBot's Personality"
              title="ChatBot's Personality"
              description="In few sentences, describe your chatbot's personality."
            />
            <TextInput style={ProfileSettingStyle.textInput} />
          </View>
          <View>
            <FormField
              name="Visibility"
              title="Visibility"
              description="Who can see and talk to your chatbot."
            />
            <View style={{backgroundColor: '#333944'}}>
              <RadioGroup
                containerStyle={{alignItems: 'flex-start'}}
                radioButtons={visibilityButtons}
                onPress={setVisibilityId}
                selectedId={visibilityid}
              />
            </View>
          </View>
          <View>
            <FormField
              name="Definition Visibility"
              title="Definition Visibility"
              description="Who can see your chatbot's personality."
            />
            <View style={{backgroundColor: '#333944'}}>
              <RadioGroup
                containerStyle={{alignItems: 'flex-start'}}
                radioButtons={definitionVisibilityButtons}
                onPress={setDefinitionVisibilityId}
                selectedId={definitionVisibilityid}
              />
            </View>
          </View>
          <View>
            <FormField
              name="Avatar"
              title="Avatar"
              description="Choose an avatar for your chatbot."
            />
            {/* <AvatarCreate /> */}
          </View>
          <View>
            <FormField
              name="Tags"
              title="Tags"
              description="Choose tags to help people find your chatbot."
            />
            <TextInput style={ProfileSettingStyle.textInput} />
          </View>
          <View style={{width: 100}}>
            <Button
              title="Advanced"
              onPress={() => setShowAdvance(!showAdvance)}
              color={showAdvance ? '#1D5BA9' : '#3B4451'}
            />
          </View>
          {showAdvance ? (
            <View>
              <View>
                <FormField
                  name="Scenario (Optional)"
                  title="Scenario (Optional)"
                  description="Describe the current situation and context of the conversation."
                />
                <TextInput style={ProfileSettingStyle.textInput} />
              </View>
              <View>
                <FormField
                  name="Example Dialogues (Optional)"
                  title="Example Dialogues (Optional)"
                  description="Example conversations to define your Character. This will impact how it talks."
                />
                <TextInput style={ProfileSettingStyle.textInput} />
              </View>
            </View>
          ) : null}
        </View>
        <View style={CreateStyle.checkBoxView}>
          <TouchableOpacity
            onPress={() => setCheck(!check)}
            style={CreateStyle.checkBoxTouch}>
            {check ? (
              <Image source={require('../../assest/HomePage/Check.png')} />
            ) : (
              <Image source={require('../../assest/HomePage/Checked.png')} />
            )}
          </TouchableOpacity>
          <View style={CreateStyle.checkTextView}>
            <Text style={[CreateStyle.checkText, {color: theme.textColor}]}>
              I have read and agree with the <Text>&nbsp;</Text>
              <Text
                onPress={() =>
                  Linking.openURL(
                    'https://docs.spicychat.ai/community-guidelines',
                  )
                }
                style={CreateStyle.checkLink}>
                Community Guidelines.
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={CreateStyle.lastBtns}>
        <View style={CreateStyle.lastBtnsSubView}>
          <Button
            title="Cancel"
            color={'#808080'}
            onPress={() => navigation.navigate('HomePage')}
          />
        </View>
        <View style={CreateStyle.lastBtnsSubView}>
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    </View>
  );
};


export default Create;
