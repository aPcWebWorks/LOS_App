import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, Alert, SafeAreaView} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';
import {
  Modal,
  Portal,
  Button,
  PaperProvider,
  Divider,
  ActivityIndicator,
  MD2Colors,
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
  const {userByScpDetails} = useSelector(state => state.scpUser);

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
        {userByScpDetails?.isLoading ? (
          <>
            <ActivityIndicator
              animating={true}
              color={MD2Colors.green800}
              size="large"
              style={{flex: 1, backgroundColor: 'white'}}
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
                        <Text
                          style={
                            style.profileName
                          }>{`${title?.toUpperCase()}. ${name?.toUpperCase()}`}</Text>
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

                      <View style={style.infoData}>
                        <View style={style.row}>
                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>Gender</Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.scpDetail?.gender || 'NA'}
                            </Text>
                          </View>

                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>Residential Address</Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.scpDetail
                                ?.residentialAddress || 'NA'}
                            </Text>
                          </View>
                        </View>

                        <View style={[style.row, style.rowTopMargin]}>
                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>Pincode</Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.scpDetail?.pinCode || 'NA'}
                            </Text>
                          </View>

                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>Mobile</Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.scpDetail?.mobile || 'NA'}
                            </Text>
                          </View>
                        </View>

                        <View style={[style.row, style.rowTopMargin]}>
                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>Alternate Mobile</Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.scpDetail?.alternateMobile ||
                                'NA'}
                            </Text>
                          </View>

                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>Email</Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.scpDetail?.email || 'NA'}
                            </Text>
                          </View>
                        </View>

                        <View style={[style.row, style.rowTopMargin]}>
                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>PAN No.</Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.documents[2]?.docNumber ||
                                'NA'}
                            </Text>
                          </View>

                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>Aadhar No.</Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.documents[1]?.docNumber ||
                                'NA'}
                            </Text>
                          </View>
                        </View>

                        <View style={[style.row, style.rowTopMargin]}>
                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>Education</Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.scpDetail?.education || 'NA'}
                            </Text>
                          </View>

                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>Occupation</Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.scpDetail?.occupation || 'NA'}
                            </Text>
                          </View>
                        </View>

                        <View style={[style.row, style.rowTopMargin]}>
                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>PVC Certificate No.</Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.documents[4]?.docNumber ||
                                'NA'}
                            </Text>
                          </View>

                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>
                              IIBF Certificate No.
                            </Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.documents[5]?.docNumber ||
                                'NA'}
                            </Text>
                          </View>
                        </View>

                        <View style={[style.row, style.rowTopMargin]}>
                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>DRA Certificate No</Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.documents[6]?.docNumber ||
                                'NA'}
                            </Text>
                          </View>

                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>BCA/FBC</Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.scpDetail?.bcaFbc || 'NA'}
                            </Text>
                          </View>
                        </View>

                        {userByScpDetails?.scpDetail?.bcaFbc === 'yes' && (
                          <View style={style.rowTopMargin}>
                            <Text style={style.lebel}>BCA Bank </Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.scpDetail?.bcaBankName || 'NA'}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>

                    <Divider bold={true} />

                    <View style={style.info}>
                      <Text style={[style.AC_Info]}>
                        Bank & Payment Details
                      </Text>

                      <View style={style.infoData}>
                        <View style={[style.row]}>
                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>Bank Name </Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.scpDetail?.bankName || 'NA'}
                            </Text>
                          </View>

                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>Cust Id/CifNo</Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.scpDetail?.bankCustomerId ||
                                'NA'}
                            </Text>
                          </View>
                        </View>

                        <View style={[style.row, style.rowTopMargin]}>
                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>Saving Acc No.</Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.scpDetail?.savingsAccountNum ||
                                'NA'}
                            </Text>
                          </View>

                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>Settlement Ac. No.</Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.scpDetail
                                ?.settlementAccountNum || 'NA'}
                            </Text>
                          </View>
                        </View>

                        <View style={[style.row, style.rowTopMargin]}>
                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>
                              Payment Received Date
                            </Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.scpDetail?.receivedDate ||
                                'NA'}
                            </Text>
                          </View>

                          <View style={style.widthFifty}>
                            <Text style={style.lebel}>
                              Payment Received Amount
                            </Text>
                            <Text style={style.textValue}>
                              {userByScpDetails?.scpDetail?.amount || 'NA'}
                            </Text>
                          </View>
                        </View>
                      </View>
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
    // flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 15,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 15,
    rowGap: 10,
  },

  AC_Info: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    letterSpacing: 2,
  },

  row: {
    flexDirection: 'row',
    // alignItems: 'center',
  },

  infoData: {
    paddingHorizontal: 12,
    marginTop: 10,
  },

  rowTopMargin: {
    marginTop: 20,
  },

  lebel: {
    fontWeight: '400',
    fontSize: 13,
    letterSpacing: 0.8,
    color: 'black',
  },

  textValue: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    // marginLeft: 4,
    marginTop: 4,
  },

  widthFifty: {
    width: '50%',
  },
});

const ProfileScreen = () => {
  return <Profile />;
};

export default ProfileScreen;
