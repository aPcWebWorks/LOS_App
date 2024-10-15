import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {customerMasterHandler} from '../../../features/customer-master/customerMasterThunk';
import NewCustomer from '../../../components/Features/financial sourcing/customer-master/NewCustomer';
import AllCustomer from '../../../components/Features/financial sourcing/customer-master/AllCustomer';

const data = [
  {label: 'Name', value: 'customerName'},
  {label: 'CustomerId', value: 'customerId'},
  {label: 'Mobile Number', value: 'mobileNumber'},
  {label: 'Email', value: 'emailId'},
];

const CustomerMasterScreen = () => {
  const dispatch = useDispatch();
  const {customer, isLoading} = useSelector(state => state.customerMaster);

  const [searchQuery, setSearchQuery] = useState('');

  const [isFocus, setIsFocus] = useState(false);
  const [dropdownQuery, setDropdownQuery] = useState('');

  const [expanded, setExpanded] = useState(false);
  const animationHeight = useRef(new Animated.Value(0)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch(customerMasterHandler());
  }, [dispatch]);

  const toggleExpand = () => {
    if (expanded) {
      Animated.parallel([
        Animated.timing(animationHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(rotateValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setExpanded(false));
    } else {
      setExpanded(true);
      Animated.parallel([
        Animated.timing(animationHeight, {
          toValue: 1180,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const handleSearch = query => {
    if (!dropdownQuery) return false;

    let filteredQuery;

    switch (dropdownQuery) {
      case 'customerName':
        filteredQuery = query.replace(/[^a-zA-Z\s]/g, '');
        break;
      case 'customerId':
      case 'mobileNumber':
        filteredQuery = query.replace(/\D/g, '');
        break;
      case 'emailId':
        filteredQuery = query.replace(/[^a-zA-Z@._]/g, '');
        break;
      default:
        console.log('Please select the right value');
        return;
    }

    setSearchQuery(filteredQuery);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="green"
          style={styles.loadingIndicator}
        />
      ) : (
        <>
          <ScrollView style={styles.scrollView}>
            <View>
              <TouchableOpacity
                onPress={toggleExpand}
                style={styles.toggleExpand}>
                <Text style={styles.title}>Add New Customer</Text>
                <Animated.View
                  style={{transform: [{rotate: rotateInterpolate}]}}>
                  <Icon name="keyboard-arrow-down" size={20} color="#fff" />
                </Animated.View>
              </TouchableOpacity>
              <Animated.View
                style={[styles.content, {height: animationHeight}]}>
                {expanded && <NewCustomer />}
              </Animated.View>
            </View>

            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'black'}]}
              data={data}
              mode="default"
              labelField="label"
              valueField="value"
              selectedTextStyle={{color: 'white', fontWeight: 'bold'}}
              placeholder={
                <Text style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
                  Select
                </Text>
              }
              onFocus={() => setIsFocus(true)}
              onChange={item => {
                setDropdownQuery(item.value);
                setIsFocus(false);
              }}
              iconColor="white"
            />

            <Searchbar
              style={styles.search}
              placeholder="Search Customer"
              onChangeText={item => handleSearch(item)}
              value={searchQuery}
              mode="bar"
              inputStyle={{color: 'white'}}
              // rippleColor='green'
              searchAccessibilityLabel="Search Customer"
              icon={() => (
                <TouchableOpacity>
                  <Icon name="search" size={20} color="#fff" />
                </TouchableOpacity>
              )}
              clearIcon={() => (
                <TouchableOpacity>
                  <Icon name="close" size={20} color="#fff" />
                </TouchableOpacity>
              )}
              placeholderTextColor="white"
              fontWeight="bold"
            />

            <AllCustomer customer={customer?.customers} query={searchQuery} />
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    padding: 10,
  },
  toggleExpand: {
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 55,
  },
  title: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  dropdown: {
    marginTop: 8,
    height: 55,
    backgroundColor: 'green',
    paddingHorizontal: 10,
  },
  search: {
    flex: 1,
    borderRadius: 0,
    marginTop: 8,
    backgroundColor: 'green',
    height: 55,
  },
  loadingIndicator: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default CustomerMasterScreen;
