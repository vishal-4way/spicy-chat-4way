import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {useContext} from 'react';
import {avatarContext} from '../../Store/Auth_Context';

const AvatarModal = ({modalVisible, onClose, currentAvatarUrl}) => {
  const BASE_URL = 'https://ukoiv6wk37.execute-api.us-east-1.amazonaws.com';
  const {setAvatar} = useContext(avatarContext);
  const [prompt, setPrompt] = useState();
  const [imageData, setImageData] = useState(null);
  const [base64State, setBase64] = useState();
  const [generatedImage, setGeneratedImage] = useState(currentAvatarUrl);

  const ASSETS_URL = 'https://d208j7tv26ktgp.cloudfront.net/spicychat-ikdev';
  const image = useSelector(state => state?.user?.profile?.avatar_url);
  const userToken = useSelector(state => state?.user?.kindeToken?.access_token);

  useEffect(() => {
    setAvatar(currentAvatarUrl);
    setGeneratedImage(currentAvatarUrl);
  }, [currentAvatarUrl]);

  useEffect(() => {
    setAvatar(`${ASSETS_URL}/${image}`);
    setGeneratedImage(`${ASSETS_URL}/${image}`);
  }, [ASSETS_URL, image]);

  function getHeaders() {
    let headers = {};
    if (userToken) headers['Authorization'] = `Bearer ${userToken}`;
    return headers;
  }

  const base64ToBlob = (base64, type) => {
    const binary = atob(base64);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type});
  };

  const handleSave = async () => {
    const image_type = base64State.type;
    console.warn(`handleSave is pressed ${(prompt, image_type)}`);
    try {
     
      const saveResponse = await axios.post(
        `${BASE_URL}/save-image`,
        {prompt, image_type},
        {headers: getHeaders()},
      );
     
      setAvatar(saveResponse.data.key);
      if (saveResponse.data) {
        try {
          const actualResponse = await fetch(saveResponse.data.signed_url, {
            method: 'PUT',
            body: base64ToBlob(base64State.base64, base64State.type),
            headers: {
              'Content-Type': base64State.type,
            },
          });
         
          setAvatar(saveResponse.data.key);
        } catch (error) {
          
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onGenerate = useCallback(async () => {
    console.warn('onGenerate is Pressed');
    try {
      const response = await axios.post(
        `${BASE_URL}/generate-image`,
        {prompt},
        {headers: getHeaders()},
      );
      setAvatar(
        `data:${response?.data?.type};base64,${response?.data?.base64}`,
      );
      setImageData({...response.data, prompt});
      setGeneratedImage(
        `data:${response?.data?.type};base64,${response?.data?.base64}`,
      );
      setBase64({base64:response.data.base64,type:response.data.type});
    
    } catch (error) {
      
    }
  }, [prompt]);

  return (
    <View>
      <View style={styles.imageView}>
        {generatedImage && (
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{uri: generatedImage}}
          />
        )}
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <View style={styles.modalSubView}>
            <View style={styles.textView}>
              <Text style={styles.modalText}>Generate Avatar</Text>
              <TouchableOpacity onPress={onClose}>
                <Image source={require('../../assest/HomePage/cross.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalTextInputView}>
              <TextInput
                style={styles.modalTextInput}
                onChangeText={e => setPrompt(e)}
                value={prompt}
              />
            </View>
            <View style={styles.textViewAfterInputBox}>
              <Text style={{color: 'white'}}>Available Today: 30</Text>
            </View>
            <View style={styles.btnMainView}>
              <View>
                <Button title="Save" onPress={handleSave} color="#404855" />
              </View>
              <View>
                <Button title="Generate" onPress={onGenerate} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalSubView: {
    margin: 20,
    backgroundColor: '#2B323D',
    borderRadius: 10,
    height: 260,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#858586',
    display: 'flex',
  },
  textView: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 155,
  },
  modalText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '400',
    marginTop: 7,
    marginLeft: 12,
  },
  modalTextInputView: {
    height: 127,
    width: '93%',
    backgroundColor: '#858586',
    marginTop: 10,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 5,
  },
  modalTextInput: {
    color: 'white',
    fontWeight: '500',
    fontSize: 19,
  },
  textViewAfterInputBox: {
    alignSelf: 'flex-end',
    marginRight: 12,
    marginTop: 5,
  },
  btnMainView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    marginTop: 11,
    alignSelf: 'flex-end',
    marginRight: 12,
    marginBottom: 14.88,
  },
  image: {
    height: 175,
    width: 175,
    marginTop: 14,
    borderRadius: 10,
  },
  imageView: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default AvatarModal;
