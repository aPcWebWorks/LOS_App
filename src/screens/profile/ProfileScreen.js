import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';
import {
  Modal,
  Portal,
  Button,
  PaperProvider,
  Divider,
  ActivityIndicator,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {scpUserDetailsHandler} from '../../features/scp-user/scpUserThunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {userLogout} from '../../features/auth/authThunks';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  };

  useEffect(() => {
    const scpUserHandler = async () => {
      const _id = await AsyncStorage.getItem('scpId');
      await dispatch(scpUserDetailsHandler(_id));
    };

    scpUserHandler();
  }, [dispatch]);

  const {scpUser, isLoading, isError, error} = useSelector(
    state => state.scpUser,
  );

  const {
    scpNo,
    title,
    name,
    gender,
    residentialAddress,
    pinCode,
    mobile,
    alternateMobile,
    email,
    education,
    occupation,
    bcaFbc,
    bcaBankName,
    bankName,
    bankCustomerId,
    savingsAccountNum,
    settlementAccountNum,
    receivedDate,
    amount,
  } = scpUser?.scpDetail ?? {};

  const documents = scpUser?.documents ?? [];

  const capitalizeFirstLetter = str => {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  };

  const acinfo = [
    {
      key: 'Gender',
      value: capitalizeFirstLetter(gender),
    },
    {
      key: 'Address',
      value: residentialAddress,
    },
    {
      key: 'Pin Code',
      value: pinCode,
    },
    {
      key: 'Mobile',
      value: mobile,
    },
    {
      key: 'Alt. Mobile',
      value: alternateMobile,
    },
    {
      key: 'Mail',
      value: email,
    },
    {
      key: 'PAN No.',
      value: documents[2]?.docNumber,
    },
    {
      key: 'Education',
      value: education,
    },
    {
      key: 'Occupation',
      value: capitalizeFirstLetter(occupation),
    },
    {
      key: 'PVC Cert. No.',
      value: documents[4]?.docNumber,
    },
    {
      key: 'IIBF Cert. No.',
      value: documents[5]?.docNumber,
    },
    {
      key: 'DRA No.',
      value: documents[6]?.docNumber,
    },
    {
      key: 'BCA / FBA',
      value: capitalizeFirstLetter(bcaFbc),
    },
    {
      key: 'BCA Bank',
      value: bcaBankName,
    },
  ];

  const bankpayment = [
    {
      key: 'Bank Name',
      value: bankName,
    },
    {
      key: 'Cust Id / CIF No.',
      value: bankCustomerId,
    },
    {
      key: 'Saving Ac. No.',
      value: savingsAccountNum,
    },
    {
      key: 'Settlement No.',
      value: settlementAccountNum,
    },
    {
      key: 'Payment Date',
      value: receivedDate,
    },
    {
      key: 'Payment Amount',
      value: amount !== 'NA' && `${amount}/-`,
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Confirm Action',
      'Are you sure you want to proceed for logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(userLogout());
          },
        },
      ],
      {cancelable: false},
    );
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        animating={true}
        size="small"
        color="green"
        style={{flex: 1, backgroundColor: 'white'}}
      />
    );
  }

  if (isError) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 400,
        }}>
        <Text>{error?.message}</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <PaperProvider>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              dismissableBackButton={true}
              contentContainerStyle={containerStyle}>
              <Text style={{fontSize: 24, color: 'black'}}>Edit Profile</Text>
            </Modal>
          </Portal>

          <View>
            <View style={style.profileDetails}>
              <View style={style.profileSection}>
                <Image
                  source={require('../../assets/images/profile.png')}
                  style={style.profileAvatar}
                />
                <View style={style.profileInfo}>
                  <Text style={style.profileName}>
                    {title && name
                      ? `${title.toUpperCase()}.${name.toUpperCase()}`
                      : 'Unknown SCP'}
                  </Text>
                  <Text style={style.SCPNumber}>{scpNo}</Text>
                </View>

                <View style={style.groupIcon}>
                  <TouchableOpacity>
                    <Icon
                      // onPress={showModal}
                      name="edit"
                      size={20}
                      color="#000"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Icon
                      onPress={handleLogout}
                      name="logout"
                      size={20}
                      color="#000"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <Divider bold={true} />

              <View style={style.info}>
                <Text style={style.AC_Info}>Account Info</Text>
                <FlatList
                  scrollEnabled={false}
                  data={acinfo}
                  renderItem={({item}) =>
                    bcaFbc === 'yes' || item.key !== 'BCA / FBA' ? (
                      <View style={style.itemContainer}>
                        <Text style={style.label}>{item.key} :</Text>
                        <Text style={style.textValue}>
                          {item.value || 'NA'}
                        </Text>
                      </View>
                    ) : null
                  }
                  keyExtractor={(item, index) => `${item.key}-${index}`}
                />
              </View>

              <Divider bold={true} />

              <View style={style.info}>
                <Text style={[style.AC_Info]}>Bank & Payment Details</Text>

                <FlatList
                  scrollEnabled={false}
                  data={bankpayment}
                  renderItem={({item}) => (
                    <View style={style.itemContainer}>
                      <Text style={style.label}>{item.key} :</Text>
                      <Text style={style.textValue}>{item.value || 'NA'}</Text>
                    </View>
                  )}
                  keyExtractor={(item, index) => `${item.key}-${index}`}
                />
              </View>
            </View>
          </View>
        </PaperProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileSection: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileAvatar: {
    borderRadius: 100,
    width: 100,
    height: 100,
    objectFit: 'contain',
    borderColor: 'green',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 26,
    justifyContent: 'center',
  },
  profileName: {
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
  },
  SCPNumber: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
  },
  groupIcon: {
    flexDirection: 'column',
    rowGap: 14,
  },
  button: {
    borderWidth: 1,
    width: 10,
    borderColor: 'gray',
    borderRadius: 100,
    backgroundColor: '#f2f2f2',
  },
  info: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 15,
    rowGap: 10,
  },
  AC_Info: {
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 2,
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    color: 'white',
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    color: 'black',
  },
  textValue: {
    fontSize: 16,
    flex: 2,
    marginLeft: 10,
    color: 'black',
  },
});

const ProfileScreen = () => {
  return <Profile />;
};

export default ProfileScreen;
