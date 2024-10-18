import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {types, isCancel, pickSingle} from 'react-native-document-picker';
import {ProgressBar, MD3Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DocumentPicker = ({label, file, onFileChange}) => {
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
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.fileGroup}>
        <TouchableOpacity style={styles.fileButton} onPress={pickDocument}>
          {file ? (
            <Image
              source={{
                uri: file.fileCopyUri,
              }}
              style={styles.uploadIcon}
            />
          ) : (
            <Icon name="attach-file" size={20} color="#000" />
          )}
        </TouchableOpacity>
        <View style={styles.fileNameSection}>
          <Text style={styles.fileName}>
            {file ? file?.name || 'Untitled file' : 'No file chosen...'}
          </Text>

          {file && (
            <View style={styles.progressIcon}>
              <ProgressBar
                style={styles.progressBar}
                progress={1.0}
                color={MD3Colors.error50}
                indeterminate={true}
              />
            </View>
          )}
        </View>

        {file && (
          <TouchableOpacity style={styles.closeIcon} onPress={removeFile}>
            <Icon name="close" size={20} color="#000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    maxHeight: 45,
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

  progressIcon: {
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

  uploadIcon: {
    width: 40,
    height: 40,
    borderRadius: 4,
    resizeMode: 'cover',
  },
});

export default DocumentPicker;
