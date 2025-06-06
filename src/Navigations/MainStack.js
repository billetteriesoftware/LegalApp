import React from 'react';
import * as Screens from '../screens/Index';
import navigationString from './NavigationString';
import DrawerNavigation from './DrawerNavigation';
import DashboardScreen from '../screens/allScreens/DashboardScreen';

export default function (Stack, isFirstTime) {
  return (
    <>
      {isFirstTime && (
        <Stack.Screen
          name={navigationString.SplashScreen}
          component={Screens.Splash}
          options={{headerShown: false}}
        />
      )}

      <Stack.Screen
        name={navigationString.HomeScreen}
        component={DrawerNavigation}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationString.NotificationScreen}
        component={Screens.Notification}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationString.PublicationDetailsScreen}
        component={Screens.PublicationDetails}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationString.ApplicationFormScreen}
        component={Screens.ApplicationForm}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationString.ApplicationStep1Screen}
        component={Screens.ApplicationStep1}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationString.ApplicationFormDetailsScreen}
        component={Screens.ApplicationFormDetails}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationString.NiceClassesDescriptionScreen}
        component={Screens.NiceClassesDescription}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationString.ApplicationImgUploadScreen}
        component={Screens.ApplicationImgUpload}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationString.TermsandConditionsScreen}
        component={Screens.TermsandConditions}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationString.PaymentScreen}
        component={Screens.Payment}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationString.ApplicationSuccessScreen}
        component={Screens.ApplicationSuccess}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationString.AccountInfoScreen}
        component={Screens.AccountInfo}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationString.ChangePasswordProfileScreen}
        component={Screens.ChangePasswordProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationString.IssueReportScreen}
        component={Screens.IssueReport}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationString.FAQScreen}
        component={Screens.FAQ}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationString.TicketSubmittedScreen}
        component={Screens.TicketSubmitted}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationString.MyTicketsScreen}
        component={Screens.MyTickets}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationString.TicketDetailsScreen}
        component={Screens.TicketDetails}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationString.AboutUsScreen}
        component={Screens.AboutUs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationString.PrivacyPolicyScreen}
        component={Screens.PrivacyPolicy}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationString.TermsConditionsScreen}
        component={Screens.TermsConditions}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationString.ApplicationdetailScreen}
        component={Screens.Applicationdetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationString.PreviewScreens}
        component={Screens.PreviewScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationString.MyTrademarksScreen}
        component={Screens.MyTrademarks}
        options={{headerShown: false}}
      />
    </>
  );
}
