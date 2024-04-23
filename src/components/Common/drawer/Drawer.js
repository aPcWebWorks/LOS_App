import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Animated,
  Divider,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {Drawer, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';

const CollapsibleComponent = ({id, isOpen, toggle, children, title}) => {
  const style = colapsedGetStyle(isOpen);
  // animations.
  const [height] = useState(new Animated.Value(isOpen ? 2000 : 0));
  const [rotation] = useState(new Animated.Value(isOpen ? 0 : 1)); // Initial rotation state

  // animation handler
  const toggleCollapse = () => {
    toggle(id);
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: isOpen ? (id === 1 ? 50 : 0) || 100 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rotation, {
        toValue: isOpen ? 1 : 0, // Toggle between 0 and 1 for rotation
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isOpen]);

  const animatedStyle = {
    height: height,
    overflow: 'hidden',
  };

  const rotateIcon = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'], // Rotate from 0 to 180 degrees
  });

  return (
    <View style={style.container}>
      <TouchableOpacity style={style.listItem} onPress={toggleCollapse}>
        <View style={style.mainNav}>
          <Image
            source={require('../../../assets/images/businesspartner.png')}
            style={style.avatar}
          />
          <Text style={style.listTitle}>{title}</Text>
        </View>
        <Animated.View style={{transform: [{rotate: rotateIcon}]}}>
          <FontAwesome5 style={style.listDownArrowIcon} name="angle-down" />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={[style.toggleContent, animatedStyle]}>
        {children}
      </Animated.View>
    </View>
  );
};

const colapsedGetStyle = isOpen => {
  return StyleSheet.create({
    container: {
      paddingVertical: 6,
      borderRadius: 6,
      backgroundColor: 'white',
      overflow: 'hidden',
    },
    gradients: {
      borderRadius: 6,
    },
    mainNav: {flexDirection: 'row', alignItems: 'center', columnGap: 6},
    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 40,
      paddingHorizontal: 10,
    },
    avatar: {
      width: 35,
      height: 35,
      borderRadius: 15,
      backgroundColor: 'rgba(52 ,52, 52, 0)',
    },

    listTitle: {
      color: 'black',
      fontSize: 16,
      fontWeight: '400',
    },
    listDownArrowIcon: {
      fontSize: 20,
      fontWeight: '900',
      color: 'black',
    },

    toggleContent: {
      position: 'relative',
      // top: 16,
    },
  });
};

const LeftSideDrawer = ({navigation}) => {
  const [active, setActive] = useState('');
  const theme = useTheme();
  const style = getStyle(theme);
  const {userByScpNumber} = useSelector(state => state.scpUser);
  const handleDrawerItemClick = (active, screen) => {
    // Keyboard.dismiss();
    setActive(active);
    navigation.navigate(screen);
  };

  const [openId, setOpenId] = useState(null);

  const toggleCollapse = id => {
    setOpenId(openId === id ? null : id);
  };
  return (
    <>
      <View style={style.profileSection}>
        {/* <View style={style.profile}> */}
        <Image
          source={require('../../../assets/images/profile.png')}
          style={style.profileAvatar}
        />
        {/* </View> */}
        <View style={style.profileInfo}>
          <Text style={style.profileName}>{userByScpNumber?.scpDetail?.name}</Text>
          <View style={style.profileRoleSection}>
            <Text style={style.profileRole}>
              {userByScpNumber?.scpDetail?.scpNo}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              {/* <FontAwesome5
                style={style.profileArrowIcon}
                name="long-arrow-alt-right"
              /> */}
              <Icon name="facebook" size={30} color="#900" />
            </TouchableOpacity>
          </View>
          {/* <Button style={style.profileViewButton} mode="contained">Press me</Button> */}
        </View>
      </View>
      <Drawer.Section
        style={style.container}
        showDivider={false}
        // titleMaxFontSizeMultiplier={100}
      >
        <CollapsibleComponent
          title="Business Partner"
          id={1}
          isOpen={openId === 1}
          toggle={toggleCollapse}
          children={
            <Drawer.Item
              style={style.listItem}
              icon={({color, size}) => (
                <Image
                  source={require('../../../assets/images/businesspartner.png')}
                  style={style.avatar}
                />
              )}
              active={active === 'first'}
              label="SCP(ATBC) Profile"
              labelStyle={{color: 'white'}}
              accessibilityLabel="Business Partner"
              labelMaxFontSizeMultiplier={100}
              onPress={() => {
                handleDrawerItemClick('first', 'business partner');
              }}
            />
          }
        />
        <Drawer.Item
          style={style.listItem}
          icon={({color, size}) => (
            <Image
              source={require('../../../assets/images/financialsourcing.png')}
              style={style.avatar}
            />
          )}
          label="Financial Sourcing"
          active={active === 'second'}
          onPress={() => {
            handleDrawerItemClick('second', 'Financial Sourcing');
          }}
        />

        <Drawer.Item
          style={style.listItem}
          icon={({color, size}) => (
            <Image
              source={require('../../../assets/images/reports.png')}
              style={style.avatar}
            />
          )}
          label="Reports"
          active={active === 'third'}
          onPress={() => {
            handleDrawerItemClick('third', 'Reports');
          }}
        />
      </Drawer.Section>
    </>
  );
};

const getStyle = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: '#ecf9ec',
      paddingVertical: 20,
      paddingHorizontal: 10,
      rowGap: 8,
    },

    profileSection: {
      backgroundColor: 'white',
      padding: 15,
      alignItems: 'center',
      flexDirection: 'row',
    },

    profileAvatar: {
      borderRadius: 100,
      width: 60,
      height: 60,
      objectFit: 'contain',
      borderWidth: 1,
      borderColor: 'green',
    },

    profileInfo: {
      flex: 1,
      // backgroundColor: 'red',
      marginLeft: 6,
      padding: 8,
      justifyContent: 'center',
    },

    profileName: {
      fontWeight: 'bold',
      fontSize: 22,
      color: 'black',
    },

    profileRole: {
      fontSize: 14,
      fontWeight: '300',
      color: 'black',
    },

    profileRoleSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    profileArrowIcon: {
      fontSize: 22,
      color: 'black',
    },

    avatar: {
      width: 35,
      height: 35,
      borderRadius: 15,
      backgroundColor: 'rgba(52 ,52, 52, 0)',
    },

    listItem: {
      borderRadius: 0,
      width: '100%',
      marginLeft: 0,
      backgroundColor: 'white',
      height: 50,
      borderRadius: 6,
      // justifyContent: 'center',
      paddingLeft: 5,
    },
    label: {
      color: 'black',
    },

    drawerItem: {
      background: 'transparent',
    },
    bgGradient: {
      flex: 1,
      borderRadius: 5,
    },
  });
};

export default LeftSideDrawer;
