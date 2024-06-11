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
import {userLogout} from '../../features/auth/authThunks';
import {scpUserDetailsHandler} from '../../features/scp-user/scpUserThunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const {userByScpDetails, isLoading} = useSelector(state => state.scpUser);

  const title = userByScpDetails?.scpDetail?.title;
  const name = userByScpDetails?.scpDetail?.name;

  useEffect(() => {
    const scpUserHandler = async () => {
      const _id = await AsyncStorage.getItem('scpId');
      await dispatch(scpUserDetailsHandler(_id));
      return;
    };

    scpUserHandler();
  }, [dispatch]);

  const acinfo = [
    {
      key: 'Gender',
      value: userByScpDetails?.scpDetail?.gender,
    },
    {
      key: 'Address',
      value: userByScpDetails?.scpDetail?.residentialAddress,
    },
    {
      key: 'Pin Code',
      value: userByScpDetails?.scpDetail?.pinCode,
    },
    {
      key: 'Mobile',
      value: userByScpDetails?.scpDetail?.mobile,
    },
    {
      key: 'Alt. Mobile',
      value: userByScpDetails?.scpDetail?.alternateMobile,
    },
    {
      key: 'Mail',
      value: userByScpDetails?.scpDetail?.email,
    },
    {
      key: 'PAN No.',
      value: userByScpDetails?.documents[2]?.docNumber,
    },
    {
      key: 'Education',
      value: userByScpDetails?.scpDetail?.education,
    },
    {
      key: 'Occupation',
      value: userByScpDetails?.scpDetail?.occupation,
    },
    {
      key: 'PVC Cert. No.',
      value: userByScpDetails?.documents[4]?.docNumber,
    },
    {
      key: 'IIBF Cert. No.',
      value: userByScpDetails?.documents[5]?.docNumber,
    },
    {
      key: 'DRA No.',
      value: userByScpDetails?.documents[6]?.docNumber,
    },
    {
      key: 'BCA / FBA',
      value: userByScpDetails?.scpDetail?.bcaFbc,
    },
    {
      key: 'BCA Bank',
      value: userByScpDetails?.scpDetail?.bcaBankName,
    },
  ];

  const bankpayment = [
    {
      key: 'Bank Name',
      value: userByScpDetails?.scpDetail?.bankName,
    },
    {
      key: 'Cust Id / CIF No.',
      value: userByScpDetails?.scpDetail?.bankCustomerId,
    },
    {
      key: 'Saving Ac. No.',
      value: userByScpDetails?.scpDetail?.savingsAccountNum,
    },
    {
      key: 'Settlement No.',
      value: userByScpDetails?.scpDetail?.settlementAccountNum,
    },
    {
      key: 'Payment Date',
      value: userByScpDetails?.scpDetail?.receivedDate,
    },
    {
      key: 'Payment Amount',
      value: userByScpDetails?.scpDetail?.amount
        ? `${userByScpDetails?.scpDetail?.amount}/-`
        : 'NA',
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
    return;
  };
  return (
    <>
      <SafeAreaView style={style.container}>
        {isLoading ? (
          <>
            <ActivityIndicator
              animating={true}
              size="large"
              style={{flex: 1, backgroundColor: 'white'}}
              color="green"
            />
          </>
        ) : (
          <>
            <ScrollView>
              <PaperProvider>
                <Portal>
                  <Modal
                    visible={visible}
                    onDismiss={hideModal}
                    dismissableBackButton={true}
                    contentContainerStyle={containerStyle}>
                    <Text style={{fontSize: 24, color: 'black'}}>
                      Edit Profile
                    </Text>
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
                        <Text style={style.profileRole}>
                          {userByScpDetails?.scpDetail?.scpNo}
                        </Text>
                      </View>

                      <View style={style.groupIcon}>
                        <TouchableOpacity>
                          <Button style={style.button} onPress={showModal}>
                            <FontAwesome5
                              style={style.penIcon}
                              name="sign-out-alt"
                            />
                          </Button>
                        </TouchableOpacity>

                        <TouchableOpacity>
                          <Button style={style.button} onPress={handleLogout}>
                            <FontAwesome5
                              style={style.penIcon}
                              name="sign-out-alt"
                            />
                          </Button>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <Divider bold={true} />

                    <View style={style.info}>
                      <Text style={style.AC_Info}>Account Info</Text>
                      {/* {userByScpDetails?.scpDetail?.bcaFbc === 'yes' && (
                          <View style={style.rowTopMargin}>
                            <Text style={style.lebel}>BCA Bank </Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.scpDetail?.bcaBankName || 'NA'}
                            </Text>
                          </View>
                        )} */}
                      <FlatList
                        scrollEnabled={false}
                        data={acinfo}
                        renderItem={({item}) =>
                          // <View style={style.itemContainer}>
                          //   <Text style={style.label}>{item.key} :</Text>
                          //   <Text style={style.textValue}>
                          //     {item.value || 'NA'}
                          //   </Text>
                          // </View>
                          userByScpDetails?.scpDetail?.bcaFbc === 'yes' ||
                          item.key !== 'BCA / FBA' ? (
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
                      <Text style={[style.AC_Info]}>
                        Bank & Payment Details
                      </Text>

                      <FlatList
                        scrollEnabled={false}
                        data={bankpayment}
                        renderItem={({item}) => (
                          <View style={style.itemContainer}>
                            <Text style={style.label}>{item.key} :</Text>
                            <Text style={style.textValue}>
                              {item.value || 'NA'}
                            </Text>
                          </View>
                        )}
                        keyExtractor={(item, index) => `${item.key}-${index}`}
                      />
                    </View>
                  </View>
                </View>
              </PaperProvider>
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    </>
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

  profileRole: {
    fontSize: 14,
    fontWeight: '300',
    color: 'black',
  },

  groupIcon: {flexDirection: 'column', rowGap: 4},

  button: {
    borderWidth: 1,
    width: 10,
    borderColor: 'gray',
    borderRadius: 100,
    backgroundColor: '#f2f2f2',
  },

  penIcon: {
    color: 'black',
    fontSize: 18,
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
    // backgroundColor: '#ecf9ec',
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
