import React, {useState, useEffect, Fragment} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  SafeAreaView,
  Animated,
  FlatList,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Drawer, useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CollapsibleComponent = ({
  id,
  isOpen,
  toggle,
  children,
  title,
  ...rest
}) => {
  const style = colapsedGetStyle(isOpen);
  // animations.
  const [height] = useState(new Animated.Value(isOpen ? 2000 : 0));
  const [rotation] = useState(new Animated.Value(isOpen ? 0 : 1));

  // animation handler
  const toggleCollapse = () => {
    toggle(id);
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: isOpen
          ? (id === 1 ? 134 : 0) || (id === 2 ? 48 : 0) || 100
          : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rotation, {
        toValue: isOpen ? 1 : 0,
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
    outputRange: ['0deg', '180deg'],
  });

  return (
    <SafeAreaView style={style.container} {...rest}>
      <TouchableOpacity style={style.listItem} onPress={toggleCollapse}>
        <View style={style.mainNav}>
          <Image
            source={require('../../../assets/images/financialsourcing.png')}
            style={style.avatar}
          />
          <Text style={style.listTitle}>{title}</Text>
        </View>
        <Animated.View style={{transform: [{rotate: rotateIcon}]}}>
          <Icon style={style.listDownArrowIcon} name="keyboard-arrow-down" />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={[style.toggleContent, animatedStyle]}>
        {children}
      </Animated.View>
    </SafeAreaView>
  );
};

const colapsedGetStyle = isOpen => {
  return StyleSheet.create({
    container: {
      paddingVertical: 6,
      borderRadius: 6,
      backgroundColor: 'white',
      overflow: 'hidden',
      marginVertical: 4,
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
      top: 6,
    },
  });
};

const menu = [
  {
    id: 1,
    title: 'Financial Sourcing',
    submenu: [
      {
        id: 1,
        title: 'Customer Master',
      },
      {
        id: 2,
        title: 'Loan Master',
      },
      {
        id: 3,
        title: 'Loan Status',
      },
    ],
  },
  {
    id: 2,
    title: 'Reports',
    submenu: [
      {
        id: 1,
        title: 'All Types Reports',
      },
    ],
  },
];

const Submenu = ({navigation, submenu}) => {
  const [active, setActive] = useState('');

  const handleDrawerItemClick = (id, title) => {
    // Keyboard.dismiss();
    setActive(id);
    navigation.navigate(title);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.hrLine} />
        <FlatList
          data={submenu}
          renderItem={({item}) => (
            <>
              <Drawer.Item
                style={styles.listItem}
                label={item.title}
                active={active === item.id}
                // labelStyle={{color: 'white'}}
                accessibilityLabel={item.title}
                labelMaxFontSizeMultiplier={100}
                onPress={() => {
                  handleDrawerItemClick(item.id, item.title);
                }}
              />
            </>
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    columnGap: 6,
  },

  hrLine: {
    height: '100%',
    width: 4,
    backgroundColor: '#e6e6e6',
    marginLeft: 26,
  },

  listItem: {
    width: '100%',
    marginLeft: 0,
    marginVertical: 1.5,
    backgroundColor: 'transparent',
    height: 40,
    borderRadius: 0,
  },
});

const LeftSideDrawer = ({navigation}) => {
  const theme = useTheme();
  const style = getStyle(theme);

  const [openId, setOpenId] = useState(null);

  const {scpUser} = useSelector(state => state.scpUser);
  const {title, name, scpNo} = scpUser?.scpDetail ?? {};

  const toggleCollapse = id => {
    setOpenId(openId === id ? null : id);
  };

  const capitalizeFirstLetter = str => {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  };

  return (
    <>
      <SafeAreaView style={style.container}>
        <View style={style.profileSection}>
          <Image
            source={require('../../../assets/images/profile.png')}
            style={style.profileAvatar}
          />
          <View style={style.profileInfo}>
            <Text style={style.profileName}>
              {`${capitalizeFirstLetter(title)}. ${name}`}
            </Text>
            <View style={style.profileRoleSection}>
              <Text style={style.SCPNumber}>{scpNo}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Icon name="arrow-right" size={30} color="black" />
              </TouchableOpacity>
            </View>
            {/* <Button style={style.profileViewButton} mode="contained">Profile</Button> */}
          </View>
        </View>
        <Drawer.Section
          style={style.container}
          showDivider={false}
          // titleMaxFontSizeMultiplier={100}
        >
          {/* <CollapsibleComponent
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
              accessibilityLabel="Customer Master"
              labelMaxFontSizeMultiplier={100}
              onPress={() => {
                handleDrawerItemClick('first', 'Customer Master');
              }}
            />
          }
        /> */}

          <View style={style.menuCollapse}>
            {menu?.map((item, index) => {
              return (
                <Fragment key={index}>
                  <CollapsibleComponent
                    key=""
                    title={item?.title}
                    id={item?.id}
                    isOpen={openId === item?.id}
                    toggle={toggleCollapse}
                    children={
                      <Submenu
                        submenu={
                          (item?.id === 1 && menu[0]?.submenu) ||
                          (item?.id === 2 && menu[1]?.submenu)
                        }
                        navigation={navigation}
                      />
                    }
                  />
                </Fragment>
              );
            })}
          </View>
          {/* <Drawer.Item
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
        /> */}
        </Drawer.Section>
      </SafeAreaView>
    </>
  );
};

const getStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf9ec',
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
      marginLeft: 6,
      padding: 8,
      justifyContent: 'center',
    },

    profileName: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'black',
    },
    SCPNumber: {
      color: 'black',
      fontSize: 13,
    },
    profileRoleSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    menuCollapse: {
      paddingHorizontal: 10,
    },

    listItem: {
      borderRadius: 0,
      width: '100%',
      marginLeft: 0,
      backgroundColor: 'white',
      height: 50,
      borderRadius: 6,
      paddingLeft: 5,
    },
    label: {
      color: 'black',
    },
  });
};

export default LeftSideDrawer;
