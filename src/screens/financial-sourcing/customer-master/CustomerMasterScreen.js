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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {customerMasterHandler} from '../../../features/customer-master/customerMasterThunk';
import NewCustomer from '../../../components/Features/financial sourcing/customer-master/NewCustomer';
import AllCustomer from '../../../components/Features/financial sourcing/customer-master/AllCustomer';

const data = [
  {label: 'Name', value: 'customername'},
  {label: 'CustomerId', value: 'customerid'},
  {label: 'Mobile Number', value: 'mobile number'},
  {label: 'Email', value: 'emailid'},
];

const CustomerMasterScreen = () => {
  const dispatch = useDispatch();
  const {customer, isLoading} = useSelector(state => state.customerMaster);

  const [searchQuery, setSearchQuery] = useState('');

  const [expanded, setExpanded] = useState(false);
  const animationHeight = useRef(new Animated.Value(0)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;

  const [isFocus, setIsFocus] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState(
    'customerName',
    'mobilenumber',
    'email',
    'customerid',
  );

  useEffect(() => {
    dispatch(customerMasterHandler());
  }, [dispatch]);

   useEffect(() => {
   console.log('Customer data:', customer);
 }, [customer]);

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
          toValue: 1180, // adjust this value to the height of your content
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

  // const handleDropdownChange = selectedValue => {
  //   onChangeText(selectedValue);
  // };

  const handleFilterChange = filter => {
    setSelectedFilter(filter);
    setSearchQuery('');
  };

  const handleSearch = query => {
    let filteredQuery = query;

    switch (selectedFilter) {
      case 'customerName':
        filteredQuery = query.replace(/[^a-zA-Z\s]/g, '');
        break;
      case 'customerid':
        filteredQuery = query.replace(/\D/g, '');
        break;
      case 'mobilenumber':
        filteredQuery = query.replace(/\D/g, '');
        break;
      case 'email':
        filteredQuery = query.replace(/[^a-zA-Z@._]/g, '');
        break;
      default:
        filteredQuery = query;
        break;
    }

    setSearchQuery(filteredQuery);
  };

  // const handleDelete = customer => {
  //   console.log('Delete customer:', customer);
  // };

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
                  <FontAwesome5 size={20} color="white" name="angle-down" />
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
              placeholder={
                <Text style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
                  Select
                </Text>
              }
              // value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={handleFilterChange}
              iconColor="white"
            />

            <Searchbar
              style={styles.search}
              placeholder="Search Customer"
              onChangeText={item => handleSearch(item)}
              value={searchQuery}
              mode="bar"
              // inputStyle={{color: 'white'}}
              // rippleColor='red'
              // searchAccessibilityLabel="Search Customer"
              iconColor="white"
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
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
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
