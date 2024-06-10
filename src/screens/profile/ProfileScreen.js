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
      id: 1,
      key: 'Gender',
      value: userByScpDetails?.scpDetail?.gender,
    },
    {
      id: 2,
      key: 'Address',
      value: userByScpDetails?.scpDetail?.residentialAddress,
    },
    {
      id: 3,
      key: 'Pin Code',
      value: userByScpDetails?.scpDetail?.pinCode,
    },
    {
      id: 4,
      key: 'Mobile',
      value: userByScpDetails?.scpDetail?.mobile,
    },
    {
      id: 5,
      key: 'Alt. Mobile',
      value: userByScpDetails?.scpDetail?.alternateMobile,
    },
    {
      id: 6,
      key: 'Mail',
      value: userByScpDetails?.scpDetail?.email,
    },
    {
      id: 7,
      key: 'PAN No.',
      value: userByScpDetails?.documents[2]?.docNumber,
    },
    {
      id: 8,
      key: 'Education',
      value: userByScpDetails?.scpDetail?.education,
    },
    {
      id: 9,
      key: 'Occupation',
      value: userByScpDetails?.scpDetail?.occupation,
    },
    {
      id: 9,
      key: 'PVC Cert. No.',
      value: userByScpDetails?.documents[4]?.docNumber,
    },
    {
      id: 9,
      key: 'IIBF Cert. No.',
      value: userByScpDetails?.documents[5]?.docNumber,
    },
    {
      id: 9,
      key: 'DRA No.',
      value: userByScpDetails?.documents[6]?.docNumber,
    },
    {
      id: 9,
      key: 'BCA / FBA',
      value: userByScpDetails?.scpDetail?.bcaFbc,
    },
    {
      id: 9,
      key: 'BCA Bank',
      value: userByScpDetails?.scpDetail?.bcaBankName,
    },
  ];

  const bankpayment = [
    {
      id: 9,
      key: 'BCA Bank',
      value: userByScpDetails?.scpDetail?.bcaBankName,
    },
    {
      id: 9,
      key: 'BCA Bank',
      value: userByScpDetails?.scpDetail?.bcaBankName,
    },
    {
      id: 9,
      key: 'BCA Bank',
      value: userByScpDetails?.scpDetail?.bcaBankName,
    },
    {
      id: 9,
      key: 'BCA Bank',
      value: userByScpDetails?.scpDetail?.bcaBankName,
    },
    {
      id: 9,
      key: 'BCA Bank',
      value: userByScpDetails?.scpDetail?.bcaBankName,
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
                      {/* <View style={style.infoData}>
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
                      </View> */}
                      <FlatList
                        scrollEnabled={false}
                        data={acinfo}
                        renderItem={({item}) => (
                          <View style={style.itemContainer}>
                            <Text style={style.label}>{item.key}</Text>

                            <Text style={style.textValue}>{item.value}</Text>
                          </View>
                        )}
                        keyExtractor={(item, index) => `${item.key}-${index}`}
                      />
                    </View>

                    <Divider bold={true} />

                    <View style={style.info}>
                      <Text style={[style.AC_Info]}>
                        Bank & Payment Details
                      </Text>

                      {/* <View style={style.infoData}>
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
                      </View> */}
                      <FlatList
                        scrollEnabled={false}
                        data={bankpayment}
                        renderItem={({item}) => (
                          <View style={style.itemContainer}>
                            <Text style={style.label}>{item.key}</Text>

                            <Text style={style.textValue}>{item.value}</Text>
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

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
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

// import React, {useEffect} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Alert,
//   SafeAreaView,
//   FlatList,
// } from 'react-native';
// import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';
// import {
//   Modal,
//   Portal,
//   Button,
//   Provider as PaperProvider,
//   Divider,
//   ActivityIndicator,
//   Colors,
// } from 'react-native-paper';
// import {useDispatch, useSelector} from 'react-redux';
// import {userLogout} from '../../features/auth/authThunks';
// import {scpUserDetailsHandler} from '../../features/scp-user/scpUserThunk';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Profile = ({navigation}) => {
//   const dispatch = useDispatch();
//   const [visible, setVisible] = React.useState(false);

//   const showModal = () => setVisible(true);
//   const hideModal = () => setVisible(false);
//   const containerStyle = {
//     backgroundColor: 'white',
//     padding: 20,
//     alignItems: 'center',
//   };
//   const {userByScpDetails} = useSelector(state => state.scpUser);

//   useEffect(() => {
//     const scpUserHandler = async () => {
//       const _id = await AsyncStorage.getItem('scpId');
//       await dispatch(scpUserDetailsHandler(_id));
//     };

//     scpUserHandler();
//   }, [dispatch]);

//   const handleLogout = () => {
//     Alert.alert(
//       'Confirm Action',
//       'Are you sure you want to proceed for logout?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'OK',
//           onPress: () => {
//             dispatch(userLogout());
//           },
//         },
//       ],
//       {cancelable: false},
//     );
//   };

//   const accountInfoData = [
//     {label: 'Gender:', value: userByScpDetails?.scpDetail?.gender || 'NA'},
//     {
//       label: 'Residential Address:',
//       value: userByScpDetails?.scpDetail?.residentialAddress || 'NA',
//     },
//     {label: 'Pincode:', value: userByScpDetails?.scpDetail?.pinCode || 'NA'},
//     {label: 'Mobile:', value: userByScpDetails?.scpDetail?.mobile || 'NA'},
//     {
//       label: 'Alternate Mobile:',
//       value: userByScpDetails?.scpDetail?.alternateMobile || 'NA',
//     },
//     {label: 'Email:', value: userByScpDetails?.scpDetail?.email || 'NA'},
//     {
//       label: 'PAN No.:',
//       value: userByScpDetails?.documents[2]?.docNumber || 'NA',
//     },
//     {
//       label: 'Aadhar No.:',
//       value: userByScpDetails?.documents[1]?.docNumber || 'NA',
//     },
//     {
//       label: 'Education:',
//       value: userByScpDetails?.scpDetail?.education || 'NA',
//     },
//     {
//       label: 'Occupation:',
//       value: userByScpDetails?.scpDetail?.occupation || 'NA',
//     },
//     {
//       label: 'PVC Certificate No.:',
//       value: userByScpDetails?.documents[4]?.docNumber || 'NA',
//     },
//     {
//       label: 'IIBF Certificate No.:',
//       value: userByScpDetails?.documents[5]?.docNumber || 'NA',
//     },
//     {
//       label: 'DRA Certificate No:',
//       value: userByScpDetails?.documents[6]?.docNumber || 'NA',
//     },
//     {label: 'BCA/FBC:', value: userByScpDetails?.scpDetail?.bcaFbc || 'NA'},
//     {
//       label: 'BCA Bank:',
//       value: userByScpDetails?.scpDetail?.bcaBankName || 'NA',
//     },

//   ];

//   const bankDetailsData = [
//     {label: 'Bank Name:', value: userByScpDetails?.scpDetail?.bankName || 'NA'},
//     {
//       label: 'Cust Id/CifNo:',
//       value: userByScpDetails?.scpDetail?.bankCustomerId || 'NA',
//     },
//     {
//       label: 'Savings Account No.:',
//       value: userByScpDetails?.scpDetail?.savingsAccountNum || 'NA',
//     },
//     {
//       label: 'Settlement Account No.:',
//       value: userByScpDetails?.scpDetail?.settlementAccountNum || 'NA',
//     },
//     {
//       label: 'Payment Received Date:',
//       value: userByScpDetails?.scpDetail?.receivedDate || 'NA',
//     },
//     {
//       label: 'Payment Received Amount:',
//       value: userByScpDetails?.scpDetail?.amount || 'NA',
//     },

//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       {userByScpDetails?.isLoading ? (
//         <ActivityIndicator
//           animating={true}
//           color={Colors.green800}
//           size="large"
//           style={{flex: 1, backgroundColor: 'white'}}
//         />
//       ) : (
//         <ScrollView>
//           <PaperProvider>
//             <Portal>
//               <Modal
//                 visible={visible}
//                 onDismiss={hideModal}
//                 contentContainerStyle={containerStyle}>
//                 <Text style={{fontSize: 24, color: 'black'}}>Edit Profile</Text>
//               </Modal>
//             </Portal>

//             <View style={styles.profileDetails}>
//               <View style={styles.profileSection}>
//                 <Image
//                   source={require('../../assets/images/profile.png')}
//                   style={styles.profileAvatar}
//                 />
//                 <View style={styles.profileInfo}>
//                   <Text style={styles.profileName}>
//                     {userByScpDetails?.scpDetail?.title &&
//                     userByScpDetails?.scpDetail?.name
//                       ? `${userByScpDetails?.scpDetail?.title.toUpperCase()}.${userByScpDetails?.scpDetail?.name.toUpperCase()}`
//                       : 'Unknown SCP'}
//                   </Text>
//                   <Text style={styles.profileRole}>
//                     {userByScpDetails?.scpDetail?.scpNo}
//                   </Text>
//                 </View>

//                 <View style={styles.groupIcon}>
//                   <TouchableOpacity>
//                     <Button style={styles.button} onPress={showModal}>
//                       <FontAwesome5
//                         style={styles.penIcon}
//                         name="sign-out-alt"
//                       />
//                     </Button>
//                   </TouchableOpacity>

//                   <TouchableOpacity>
//                     <Button style={styles.button} onPress={handleLogout}>
//                       <FontAwesome5
//                         style={styles.penIcon}
//                         name="sign-out-alt"
//                       />
//                     </Button>
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               <Divider />

//               {/* Render Account Info */}
//               <Text style={styles.AC_Info}>Account Information</Text>
//               <FlatList
//                 data={accountInfoData}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({item}) => (
//                   <View style={styles.info}>
//                     <Text style={styles.textLabel}>{item.label}</Text>
//                     <Text style={styles.textValue}>{item.value}</Text>
//                   </View>
//                 )}
//               />

//               <Divider />

//               {/* Render Bank Details */}
//               <Text style={styles.AC_Info}>Bank And Payment Information</Text>
//               <FlatList
//                 data={bankDetailsData}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({item}) => (
//                   <View style={styles.info}>
//                     <Text style={styles.textLabel}>{item.label}</Text>
//                     <Text style={styles.textValue}>{item.value}</Text>
//                   </View>
//                 )}
//               />
//             </View>
//           </PaperProvider>
//         </ScrollView>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   profileSection: {
//     backgroundColor: 'white',
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   profileAvatar: {
//     borderRadius: 100,
//     width: 100,
//     height: 100,
//     resizeMode: 'contain',
//     borderColor: 'green',
//   },
//   profileInfo: {
//     flex: 1,
//     marginLeft: 26,
//     justifyContent: 'center',
//   },
//   profileName: {
//     fontWeight: '500',
//     fontSize: 16,
//     color: 'black',
//   },
//   profileRole: {
//     fontSize: 14,
//     fontWeight: '300',
//     color: 'black',
//   },
//   groupIcon: {
//     flexDirection: 'column',
//     rowGap: 4,
//   },
//   button: {
//     borderWidth: 1,
//     width: 10,
//     borderColor: 'gray',
//     borderRadius: 100,
//     backgroundColor: '#f2f2f2',
//   },
//   penIcon: {
//     color: 'black',
//     fontSize: 18,
//   },
//   info: {
//     flex: 1,
//     backgroundColor: 'white',
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//     marginBottom: 10,
//     width: '100%',
//   },

//   AC_Info: {
//     fontSize: 20,
//     fontWeight: '500',
//     color: 'black',
//     letterSpacing: 2,
//     padding: 10,
//   },
//   textLabel: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: 'black',
//     letterSpacing: 2,
//   },

//   textValue: {
//     fontSize: 16,
//     color: 'grey',
//     fontWeight: '600',
//     marginTop: 4,
//   },
// });

// export default Profile;
// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Alert,
//   SafeAreaView,
//   FlatList,
// } from 'react-native';
// import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';
// import {
//   Modal,
//   Portal,
//   Button,
//   Provider as PaperProvider,
//   Divider,
//   ActivityIndicator,
//   Colors,
// } from 'react-native-paper';
// import { useDispatch, useSelector } from 'react-redux';
// import { userLogout } from '../../features/auth/authThunks';
// import { scpUserDetailsHandler } from '../../features/scp-user/scpUserThunk';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Profile = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const [visible, setVisible] = React.useState(false);

//   const showModal = () => setVisible(true);
//   const hideModal = () => setVisible(false);
//   const containerStyle = {
//     backgroundColor: 'white',
//     padding: 20,
//     alignItems: 'center',
//   };
//   const { userByScpDetails } = useSelector((state) => state.scpUser);

//   useEffect(() => {
//     const scpUserHandler = async () => {
//       const _id = await AsyncStorage.getItem('scpId');
//       await dispatch(scpUserDetailsHandler(_id));
//     };

//     scpUserHandler();
//   }, [dispatch]);

//   const handleLogout = () => {
//     Alert.alert(
//       'Confirm Action',
//       'Are you sure you want to proceed for logout?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'OK',
//           onPress: () => {
//             dispatch(userLogout());
//           },
//         },
//       ],
//       { cancelable: false }
//     );
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.info}>
//       <Text style={styles.textLabel}>{item.label}</Text>
//       <Text style={styles.textValue}>{item.value}</Text>
//     </View>
//   );

//   const accountInfoData = [
//     { label: 'Gender:', value: userByScpDetails?.scpDetail?.gender || 'NA' },
//     {
//       label: 'Residential Address:',
//       value: userByScpDetails?.scpDetail?.residentialAddress || 'NA',
//     },
//     { label: 'Pincode:', value: userByScpDetails?.scpDetail?.pinCode || 'NA' },
//     { label: 'Mobile:', value: userByScpDetails?.scpDetail?.mobile || 'NA' },
//     {
//       label: 'Alternate Mobile:',
//       value: userByScpDetails?.scpDetail?.alternateMobile || 'NA',
//     },
//     { label: 'Email:', value: userByScpDetails?.scpDetail?.email || 'NA' },
//     {
//       label: 'PAN No.:',
//       value: userByScpDetails?.documents[2]?.docNumber || 'NA',
//     },
//     {
//       label: 'Aadhar No.:',
//       value: userByScpDetails?.documents[1]?.docNumber || 'NA',
//     },
//     {
//       label: 'Education:',
//       value: userByScpDetails?.scpDetail?.education || 'NA',
//     },
//     {
//       label: 'Occupation:',
//       value: userByScpDetails?.scpDetail?.occupation || 'NA',
//     },
//     {
//       label: 'PVC Certificate No.:',
//       value: userByScpDetails?.documents[4]?.docNumber || 'NA',
//     },
//     {
//       label: 'IIBF Certificate No.:',
//       value: userByScpDetails?.documents[5]?.docNumber || 'NA',
//     },
//     {
//       label: 'DRA Certificate No:',
//       value: userByScpDetails?.documents[6]?.docNumber || 'NA',
//     },
//     { label: 'BCA/FBC:', value: userByScpDetails?.scpDetail?.bcaFbc || 'NA' },
//     {
//       label: 'BCA Bank:',
//       value: userByScpDetails?.scpDetail?.bcaBankName || 'NA',
//     },
//   ];
//     const bankDetailsData = [
//         {label: 'Bank Name:', value: userByScpDetails?.scpDetail?.bankName || 'NA'},
//         {
//           label: 'Cust Id/CifNo:',
//           value: userByScpDetails?.scpDetail?.bankCustomerId || 'NA',
//         },
//         {
//           label: 'Savings Account No.:',
//           value: userByScpDetails?.scpDetail?.savingsAccountNum || 'NA',
//         },
//         {
//           label: 'Settlement Account No.:',
//           value: userByScpDetails?.scpDetail?.settlementAccountNum || 'NA',
//         },
//         {
//           label: 'Payment Received Date:',
//           value: userByScpDetails?.scpDetail?.receivedDate || 'NA',
//         },
//         {
//           label: 'Payment Received Amount:',
//           value: userByScpDetails?.scpDetail?.amount || 'NA',
//         },

//       ];

//   return (
//     <SafeAreaView style={styles.container}>
//       {userByScpDetails?.isLoading ? (
//         <ActivityIndicator
//           animating={true}
//           color={Colors.green800}
//           size="large"
//           style={{ flex: 1, backgroundColor: 'white' }}
//         />
//       ) : (
//         <ScrollView>
//           <PaperProvider>
//             <Portal>
//               <Modal
//                 visible={visible}
//                 onDismiss={hideModal}
//                 contentContainerStyle={containerStyle}
//               >
//                 <Text style={{ fontSize: 24, color: 'black' }}>Edit Profile</Text>
//               </Modal>
//             </Portal>

//             <View style={styles.profileDetails}>
//               <View style={styles.profileSection}>
//                 <Image
//                   source={require('../../assets/images/profile.png')}
//                   style={styles.profileAvatar}
//                 />
//                 <View style={styles.profileInfo}>
//                   <Text style={styles.profileName}>
//                     {userByScpDetails?.scpDetail?.title &&
//                       userByScpDetails?.scpDetail?.name
//                       ? `${userByScpDetails?.scpDetail?.title.toUpperCase()}.${userByScpDetails?.scpDetail?.name.toUpperCase()}`
//                       : 'Unknown SCP'}
//                   </Text>
//                   <Text style={styles.profileRole}>
//                     {userByScpDetails?.scpDetail?.scpNo}
//                   </Text>
//                 </View>

//                 <View style={styles.groupIcon}>
//                   <TouchableOpacity>
//                     <Button style={styles.button} onPress={showModal}>
//                       <FontAwesome5
//                         style={styles.penIcon}
//                         name="sign-out-alt"
//                       />
//                     </Button>
//                   </TouchableOpacity>

//                   <TouchableOpacity>
//                     <Button style={styles.button} onPress={handleLogout}>
//                       <FontAwesome5
//                         style={styles.penIcon}
//                         name="sign-out-alt"
//                       />
//                     </Button>
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               <Divider />

//               {/* Render Account Info */}
//               <Text style={styles.AC_Info}>Account Information</Text>
//               <FlatList
//                 data={accountInfoData}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={renderItem}
//               />

//               <Divider />

//                {/* Render Bank Details */}
//                <Text style={styles.AC_Info}>Bank And Payment Information</Text>
//                <FlatList
//                 data={bankDetailsData}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({item}) => (
//                   <View style={styles.info}>
//                     <Text style={styles.textLabel}>{item.label}</Text>
//                     <Text style={styles.textValue}>{item.value}</Text>
//                   </View>
//                 )}
//               />
//             </View>
//           </PaperProvider>
//         </ScrollView>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   profileSection: {
//     backgroundColor: 'white',
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   profileAvatar: {
//     borderRadius: 100,
//     width: 100,
//     height: 100,
//     resizeMode: 'contain',
//     borderColor: 'green',
//   },
//   profileInfo: {
//     flex: 1,
//     marginLeft: 26,
//     justifyContent: 'center',
//   },
//   profileName: {
//     fontWeight: '500',
//     fontSize: 16,
//     color: 'black',
//   },
//   profileRole: {
//     fontSize: 14,
//     fontWeight: '300',
//     color: 'black',
//   },
//   groupIcon: {
//     flexDirection: 'column',
//     rowGap: 4,
//   },
//   button: {
//     borderWidth: 1,
//     width: 10,
//     borderColor: 'gray',
//     borderRadius: 100,
//     backgroundColor: '#f2f2f2',
//   },
//   penIcon: {
//     color: 'black',
//     fontSize: 18,
//   },
//   info: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//     marginBottom: 10,
//     width: '100%',
//     marginLeft:10,
//   },
//   AC_Info: {
//     fontSize: 20,
//     fontWeight: '500',
//     color: 'black',
//     letterSpacing: 2,
//     padding: 8,
//   },
//   textLabel: {
//     fontWeight: '400',
//     fontSize: 15,
//     color: 'black',
//     letterSpacing: 2,
//     marginLeft:15,
//   },
//   textValue: {
//     fontSize: 16,
//     color: 'grey',
//     fontWeight: '500',
//     marginLeft: 15,
//     marginRight:30,
//   },
// });

// export default Profile;
