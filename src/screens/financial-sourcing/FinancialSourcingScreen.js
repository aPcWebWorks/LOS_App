import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Animated,
  Image,
} from 'react-native';
import CustomerMaster from '../../components/Features/financial sourcing/customer-master/customer-master-form/CustomerMaster.jsx';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LoanMaster from '../../components/Features/financial sourcing/loan-master/LoanMaster.js';
import CustomerTable from '../../components/Features/financial sourcing/customer-master/customer-master-table/CustomerTable.jsx';

const CollapsibleComponent = ({id, isOpen, toggle, children, title, image}) => {
  const style = getStyle(isOpen);
  // animations.
  const [height] = useState(new Animated.Value(isOpen ? 45 : 0));
  const [rotation] = useState(new Animated.Value(isOpen ? 0 : 1)); // Initial rotation state

  // console.log('Custom Height', height);
  // animation handler
  const toggleCollapse = () => {
    toggle(id);
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: isOpen
          ? (id === 1 ? 1280 : 0) || (id === 2 ? 830 : 0) || 40
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
    <ScrollView>
      <LinearGradient
        style={style.gradients}
        colors={['#006600', '#009900']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View style={style.container}>
          <TouchableOpacity style={style.listItem} onPress={toggleCollapse}>
            <View style={style.listSection}>
              {image}
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
      </LinearGradient>
    </ScrollView>
  );
};

const getStyle = isOpen => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: 'green',
      borderBottomWidth: isOpen ? 4 : 0,
      borderRadius: 6,
    },
    gradients: {
      borderRadius: 6,
    },

    listSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 40,
      paddingHorizontal: 20,
    },

    listTitle: {
      color: 'white',
      fontSize: 20,
      fontWeight: '500',
      marginLeft: 10,
    },

    listDownArrowIcon: {
      fontSize: 20,
      fontWeight: '900',
      color: 'white',
    },

    toggleContent: {
      // flex: 1,
      position: 'relative',
      top: 16,
    },
  });
};

const FinancialSourcingScreen = () => {
  const [openId, setOpenId] = useState(null);

  const toggleCollapse = id => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <CollapsibleComponent
            title="Customer Master"
            id={1}
            isOpen={openId === 1}
            toggle={toggleCollapse}
            children={<CustomerMaster />}
            image={
              <Image
                source={require('../../assets/images/customermaster.png')}
                style={{
                  width: 45,
                  height: 45,
                  resizeMode: 'contain',
                  borderRadius: 5,
                }}
              />
            }
          />
          <CollapsibleComponent
            title="Loan Master"
            id={2}
            isOpen={openId === 2}
            toggle={toggleCollapse}
            children={<LoanMaster />}
            image={
              <Image
                source={require('../../assets/images/loanleadstatus.png')}
                style={{
                  width: 45,
                  height: 45,
                  resizeMode: 'contain',
                  borderRadius: 5,
                }}
              />
            }
          />
          <CollapsibleComponent
            title="Loan Status"
            id={3}
            isOpen={openId === 3}
            toggle={toggleCollapse}
            children={<Text>Reports</Text>}
            image={
              <Image
                source={require('../../assets/images/loanleadgenerate.png')}
                style={{
                  width: 45,
                  height: 45,
                  resizeMode: 'contain',
                  borderRadius: 5,
                }}
              />
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    paddingVertical: 10,
    // paddingBottom: 20,
  },
  content: {
    rowGap: 10,
  },
});

export default FinancialSourcingScreen;
