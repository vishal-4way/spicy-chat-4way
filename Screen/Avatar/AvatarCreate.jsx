import {View, Button} from 'react-native';
import React, {useState} from 'react';
import AvatarModal from './AvatarModal';
import {launchImageLibrary} from 'react-native-image-picker';

const AvatarCreate = () => {
  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  function onCloseHandler() {
    setIsAvatarModalVisible(false);
  }
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setSelectedImage(imageUri);
    });
  };

  return (
    <View>
      <Button
        title="Generate Avatar"
        onPress={() => {
          setIsAvatarModalVisible(true);
        }}
      />
      <Button title="Choose File" color={'#808080'} onPress={openImagePicker} />
      <AvatarModal
        currentAvatarUrl={selectedImage}
        modalVisible={isAvatarModalVisible}
        onClose={onCloseHandler}
      />
    </View>
  );
};

export default AvatarCreate;
