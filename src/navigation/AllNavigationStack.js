import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigationString from './NavigationString';
import * as Screens from '../screens/Index';

const Stack = createNativeStackNavigator();

const AllNavigationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={NavigationString.HomeScreen}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={NavigationString.HomeScreen}
        component={Screens.Dashboard}
      />
      <Stack.Screen
        name={NavigationString.NotificationScreen}
        component={Screens.Notification}
      />
      {/* {AllStack(Stack)} */}
      {/* <Stack.Screen
        name={NavigationString.HomeScreen}
        component={Screens.Home}
        // options={{tabBarStyle: {display: 'none'}}}
      />
      <Stack.Screen
        name={NavigationString.FilterScreen}
        component={Screens.Filters}
      />
      <Stack.Screen
        name={NavigationString.PropertiesDemandDetails}
        component={Screens.PropertiesDemandDetails}
      />
      <Stack.Screen
        name={NavigationString.PropertiesNearYouScreen}
        component={Screens.PropertiesNearYou}
      />
      <Stack.Screen
        name={NavigationString.propertyDetailsScreen}
        component={Screens.PropertyDetails}
      />
      <Stack.Screen
        name={NavigationString.SearchBarScreen}
        component={Screens.SearchBar}
      />
      <Stack.Screen
        name={NavigationString.rentedPropertiesScreen}
        component={Screens.RentedProperties}
      />
      <Stack.Screen
        name={NavigationString.rentFormScreen}
        component={Screens.RentForm}
      />
      <Stack.Screen
        name={NavigationString.bookInspectionScreen}
        component={Screens.BookInspection}
      />
      <Stack.Screen
        name={NavigationString.PaymentBreakdownScreen}
        component={Screens.PaymentBreakdown}
      />

      <Stack.Screen
        name={NavigationString.notificationsScreen}
        component={Screens.Notifications}
      />

      <Stack.Screen
        name={NavigationString.rentInsurancePolicy}
        component={Screens.RenInsurancePolicy}
      />

      <Stack.Screen
        name={NavigationString.NotificationDetailsScreen}
        component={Screens.NotificationDetails}
      />
      <Stack.Screen
        name={NavigationString.myInspection}
        component={Screens.MyInspection}
      />
      <Stack.Screen
        name={NavigationString.transactionHistoryScreen}
        component={Screens.TransactionHistory}
      />
      <Stack.Screen
        name={NavigationString.transactionDetailScreen}
        component={Screens.TransactionDetail}
      />
      <Stack.Screen
        name={NavigationString.RaiseMaintenanceReqScreen}
        component={Screens.RaiseMaintenanceRequest}
      />
      <Stack.Screen
        name={NavigationString.maintenanceRequestListScreen}
        component={Screens.MaintenanceRequestList}
      />
      <Stack.Screen
        name={NavigationString.LeaseAgreementScreen}
        component={Screens.LeaseAgreement}
      />

      <Stack.Screen
        name={NavigationString.RentApplicationsWithdrawScreen}
        component={Screens.RentApplicationsWithdraw}
      />

      <Stack.Screen
        name={NavigationString.ProfileScreen}
        component={Screens.Profile}
      />

      <Stack.Screen
        name={NavigationString.ChatListScreen}
        component={Screens.ChatList}
      />
      <Stack.Screen
        name={NavigationString.AllMessagesScreen}
        component={Screens.AllMessages}
      />
      <Stack.Screen
        name={NavigationString.ContactUserListScreen}
        component={Screens.ContactUserList}
      />
      <Stack.Screen
        name={NavigationString.LandLordReferEarnScreen}
        component={Screens.LandLordReferEarn}
      />

      <Stack.Screen
        name={NavigationString.BankAccountsScreen}
        component={Screens.BankAccounts}
      />

      <Stack.Screen
        name={NavigationString.AddCardScreen}
        component={Screens.AddCard}
      />

      <Stack.Screen
        name={NavigationString.SupportScreen}
        component={Screens.Support}
      />

      <Stack.Screen name={NavigationString.FaqScreen} component={Screens.Faq} />
      <Stack.Screen
        name={NavigationString.ChatwithSupportScreen}
        component={Screens.ChatwithSupport}
      />

      <Stack.Screen
        name={NavigationString.CreditScoreScreen}
        component={Screens.CreditScore}
      />

      <Stack.Screen
        name={NavigationString.ElectricityRechargeScreen}
        component={Screens.ElectricityRecharge}
      /> */}
    </Stack.Navigator>
  );
};

export default AllNavigationStack;
