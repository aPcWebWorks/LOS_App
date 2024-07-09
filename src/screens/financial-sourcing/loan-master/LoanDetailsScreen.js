import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import {loanDetailsHandler} from '../../../features/loan-master/loanMasterThunk';
import LoanDetails from '../../../components/Features/financial sourcing/loan-master/LoanDetails';

const LoanDetailsScreen = ({route}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const {loginId} = user.data || {};

  const {loanDetails, isLoading} = useSelector(state => state.loanDetails);
  const {customer} = useSelector(state => state.getCustomerById);
  const {bank} = useSelector(state => state.bankMaster);

  const {id} = route.params;

  useEffect(() => {
    dispatch(loanDetailsHandler(id));
  }, [dispatch]);

  const singalLoanDetails = {
    ScpNo: loginId,
    CustomerId: customer?.externalCustomerId,
    Name: `${customer?.title}. ${customer?.customerName}`,
    Gender: customer?.gender,
    Address: customer?.residentialAddress,
    Pincode: customer?.pinCode,
    MobileNumber: customer?.mobileNumber,
    PanCardNumber: customer?.panCardNumber,
    AadharCardNumber: customer?.aadhaarNumber,
    BankId: loanDetails?.bankId,
    BankName: bank?.bankName,
    BranchName: bank?.branchName,
    LoanTypeId: loanDetails?.loanTypeId,
    LoanAmount: loanDetails?.loanAmount,
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="green"
            style={styles.loadingIndicator}
          />
        ) : (
          <>
            <LoanDetails singalLoanDetails={singalLoanDetails} />
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexGrow: 1,
    padding: 10,
  },
  loadingIndicator: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});
export default LoanDetailsScreen;
