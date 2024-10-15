import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';
import {types, isCancel, pickSingle} from 'react-native-document-picker';
import {ProgressBar, MD3Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomDocumentPicker = ({label, file, onFileChange}) => {
  const pickDocument = async () => {
    try {
      const _file = await pickSingle({
        type: [types.allFiles],
        copyTo: 'documentDirectory',
      });

      await onFileChange(_file);
    } catch (err) {
      if (isCancel(err)) {
        console.log('User cancelled the upload', err);
      } else {
        console.error('Error picking document', err);
      }
    }
  };

  const removeFile = () => {
    onFileChange(null);
  };

  return (
    <>
      <View style={style.container}>
        <Text style={[style.label]}>{label}</Text>
        <View style={style.fileGroup}>
          <TouchableOpacity style={style.fileButton} onPress={pickDocument}>
            {file ? (
              <Image
                source={{
                  uri: file.fileCopyUri,
                }}
                style={style.uploadIcon}
              />
            ) : (
              <TouchableOpacity>
                <Icon name="attach-file" size={20} color="#000" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          <View style={style.fileNameSection}>
            <Text style={style.fileName}>
              {file ? file?.name || 'Untitled file' : 'No file chosen...'}
            </Text>

            {file && (
              <View style={style.progress_icon}>
                <ProgressBar
                  style={style.progressBar}
                  progress={1.0}
                  color={MD3Colors.error50}
                  indeterminate={true}
                />
              </View>
            )}
          </View>

          {file && (
            <TouchableOpacity style={style.closeIcon} onPress={removeFile}>
              <FontAwesome5 style={style.icon} name="times" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    rowGap: 4,
  },

  label: {
    color: 'black',
    fontWeight: '500',
  },

  fileGroup: {
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 1.5,
    height: 45,
    alignItems: 'center',
    borderColor: 'gray',
    backgroundColor: 'white',
  },

  fileButton: {
    width: 50,
    height: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {color: 'black', fontSize: 20},

  fileNameSection: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
    paddingHorizontal: 6,
  },

  fileName: {
    color: 'black',
    fontWeight: '400',
  },

  progress_icon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'gray',
  },

  progressBar: {
    width: '100%',
  },

  closeIcon: {
    height: '100%',
    width: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomDocumentPicker;
