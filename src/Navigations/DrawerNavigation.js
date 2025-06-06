// code with switch functionality
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Image, Platform, StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import NavigationString from './NavigationString';
import BottomTabs from './BottomTabs';

import Colors from '../styles/Colors';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';

import CustomDrawer from './CutomDrawer';
import {RouteNameProvider} from '../context/RouteNameContext';

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({navigation, children}) => {
  return (
    <RouteNameProvider>
      <Drawer.Navigator
        screenOptions={{
          gestureEnabled: false, // Disable gesture slide for opening the drawer
          headerShown: false, // Hide header for all screens
          drawerType: 'front',
          drawerStyle: {
            backgroundColor: '#fff',
            width: responsiveScreenWidth(80),
          },
        }}
        drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen
          name={NavigationString.HomeScreen}
          component={BottomTabs}
        />
      </Drawer.Navigator>
    </RouteNameProvider>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Colors.TintsBlue,
    paddingVertical: 25,
  },
  nameSty: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.white,
  },
  typeSty: {
    color: Colors.green,
    fontSize: 11,
    lineHeight: 15.4,
  },
  itemTextSty: {
    fontFamily: 'Rubik-Light',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'bold',
    color: Colors.Cyprus,
    marginLeft: 10,
  },
  rightArrowIcon: {
    width: 5,
    height: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// code without switch functionality
// import React, { Children, useCallback, useEffect, useState } from "react";
// import { Alert, Image, Platform, StyleSheet, Text, View } from "react-native";
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItem,
//   useDrawerStatus,
// } from "@react-navigation/drawer";
// import * as Screens from "../Screens/Index";
// import { useNavigation } from "@react-navigation/native";

// import NavigationString from "./NavigationString";
// import BottomTabs from "./BottomTabs";
// import {
//   AddPropertyIcon,
//   AssignedPropertyIconSvg,
//   Calender,
//   ChatIcon,
//   DownIcon,
//   ElectricityIcon,
//   FavouriteIcon,
//   HomeIcon,
//   InspectionIcon,
//   LandlordIcon,
//   LeaseIcon,
//   LocationIcon,
//   LogoutIcon,
//   MaintenanceIcon,
//   MaintenanceIconReqIconSvg,
//   MyListingIcon,
//   MyPropertiesIconSvg,
//   MyRenterIconReqIconSvg,
//   ProfileIcon,
//   PropertyManagerIcon,
//   PropertyManagerIconSvg,
//   ReferEarnIconSvg,
//   RentApplicationIcon,
//   RentTransactionIconSvg,
//   RightArrow,
//   SupportIcon,
//   SwitchToRenterIcon,
//   TransactionHistoryIcon,
//   UpIcon,
//   WalletIcon,
// } from "../Assets/svgIcons";
// import ImagePath from "../Constant/ImagePath";
// import TextView from "../Component/TextView";
// import Colors from "../Styles/Colors";
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from "react-native-responsive-dimensions";
// import landLordHomeStack from "./landlordNavigation/landLordHomeStack";
// import { useDispatch, useSelector } from "react-redux";
// import HomeStack from "./HomeNavigation/Home";
// import {
//   RouteNameProvider,
//   useRouteNameContext,
// } from "../context/RouteNameContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { authStatus, userLogout, userRole } from "../Redux/reducer/auth";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { LoginManager } from "react-native-fbsdk-next";
// import propertyManagerHomeStack from "./propertyManagerNavigation/propertyManagerHomeStack";
// import ModalScreen from "../Component/ModalScreen";
// import AllString from "../Constant/AllString";
// import { useFocusEffect, useIsFocused } from "@react-navigation/native";

// // Renter Side drawer item name
// const DrawerItemName = [
//   {
//     id: 1,
//     name: "Profile",
//     image: <ProfileIcon />,
//     nav: NavigationString.ProfileScreen,
//   },
//   {
//     id: 2,
//     name: "Rented Properties",
//     image: <HomeIcon />,
//     nav: NavigationString.rentedPropertiesScreen,
//   },
//   {
//     id: 3,
//     name: "My Inspection",
//     image: <InspectionIcon />,
//     nav: NavigationString.myInspection,
//   },
//   {
//     id: 4,
//     name: "Transaction History",
//     image: <TransactionHistoryIcon />,
//     nav: NavigationString.transactionHistoryScreen,
//   },
//   {
//     id: 5,
//     name: "Chat",
//     image: <ChatIcon />,
//     nav: NavigationString.ChatListScreen,
//   },
//   {
//     id: 6,
//     name: "My Wallet",
//     image: <WalletIcon />,
//     nav: NavigationString.WalletScreen,
//   },
//   {
//     id: 7,
//     name: "My Rent Application",
//     image: <RentApplicationIcon />,
//     nav: NavigationString.RentApplicationsWithdrawScreen,
//   },
//   {
//     id: 8,
//     name: "Favourites",
//     image: <FavouriteIcon />,
//     nav: NavigationString.FavouritesScreen,
//   },
//   {
//     id: 9,
//     name: "Lease Agreement",
//     image: <LeaseIcon />,
//     nav: NavigationString.LeaseAgreementScreen,
//   },
//   {
//     id: 10,
//     name: "Maintenance Requests",
//     image: <MaintenanceIcon />,
//     nav: NavigationString.maintenanceRequestListScreen,
//   },
//   {
//     id: 11,
//     name: "Electricity Recharge",
//     image: <ElectricityIcon />,
//     nav: NavigationString.rentedPropertiesScreen,
//   },
//   {
//     id: 12,
//     name: "Switch to Landlord",
//     image: <LandlordIcon />,
//     nav: NavigationString.rentedPropertiesScreen,
//   },
//   {
//     id: 13,
//     name: "Switch to Property Manager",
//     image: <PropertyManagerIcon />,
//     nav: NavigationString.rentedPropertiesScreen,
//   },
//   {
//     id: 14,
//     name: "Support",
//     image: <SupportIcon />,
//     nav: NavigationString.rentedPropertiesScreen,
//   },
//   {
//     id: 15,
//     name: "Logout",
//     image: <LogoutIcon />,
//     nav: NavigationString.rentedPropertiesScreen,
//   },
// ];

// let landlordDrawerItemName = [
//   {
//     id: 1,
//     name: "Profile",
//     image: <ProfileIcon />,
//     nav: NavigationString.ProfileScreen,
//   },
//   {
//     id: 2,
//     name: "My Listing",
//     image: <MyListingIcon />,
//     isSubMenuOpened: false,
//     children: [
//       {
//         id: 5,
//         name: "Assigned Properties",
//         image: <AssignedPropertyIconSvg />,
//         nav: NavigationString.landlordMyPropertiesscreen,
//       },
//       {
//         id: 6,
//         name: "My Transactions",
//         image: <Calender />,
//         nav: NavigationString.landlordMyPropertiesscreen,
//       },
//       {
//         id: 1,
//         name: "My Properties",
//         image: <MyPropertiesIconSvg />,
//         nav: NavigationString.landlordMyPropertiesscreen,
//       },
//       {
//         id: 2,
//         name: "Inspection Requests",
//         image: <LocationIcon />,
//         nav: NavigationString.inspectionRequestsScreen,
//       },
//       {
//         id: 3,
//         name: "Manage Calendar",
//         image: <Calender />,
//         nav: NavigationString.bookInspectionScreen,
//       },
//       {
//         id: 4,
//         name: "Add Property",
//         image: <AddPropertyIcon />,
//         nav: NavigationString.landLordAddPropertyScreen,
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Manage Property",
//     image: <MyPropertiesIconSvg />,
//     nav: NavigationString.rentedPropertiesScreen,
//     isSubMenuOpened: false,
//     children: [
//       {
//         id: 1,
//         name: "My Renters",
//         image: <MyRenterIconReqIconSvg />,
//         nav: NavigationString.MyRentersScreen,
//       },
//       {
//         id: 2,
//         name: "Rent Transactions",
//         image: <RentTransactionIconSvg />,
//         nav: NavigationString.RentTransactionsScreen,
//       },
//       {
//         id: 3,
//         name: "Chat",
//         image: <ChatIcon />,
//         nav: NavigationString.ChatListScreen,
//       },
//       {
//         id: 4,
//         name: "Maintenance Requests",
//         image: <MaintenanceIconReqIconSvg />,
//         nav: NavigationString.landlordMaintenanceRequestScr,
//       },
//       {
//         id: 5,
//         name: "Refer & Earn",
//         image: <ReferEarnIconSvg />,
//         nav: NavigationString.landLordAddPropertyScreen,
//       },
//     ],
//   },
//   {
//     id: 4,
//     name: "My Wallet",
//     image: <WalletIcon />,
//     nav: NavigationString.WalletScreen,
//   },

//   {
//     id: 5,
//     name: "Lease Agreement",
//     image: <LeaseIcon />,
//     nav: NavigationString.LeaseAgreementScreen,
//   },
//   {
//     id: 6,
//     name: "Property Managers",
//     image: <PropertyManagerIconSvg />,
//     nav: NavigationString.LandLordPropertyManagerListScreen,
//   },
//   {
//     id: 7,
//     name: "Rent Applications",
//     image: <RentApplicationIcon />,
//     nav: NavigationString.landlordApplicationReqScreen,
//   },

//   {
//     id: 8,
//     name: "Switch to Renter",
//     image: <SwitchToRenterIcon />,
//     nav: NavigationString.rentedPropertiesScreen,
//   },
//   {
//     id: 9,
//     name: "Switch to Property Manager",
//     image: <PropertyManagerIcon />,
//     nav: NavigationString.rentedPropertiesScreen,
//   },
//   {
//     id: 10,
//     name: "Logout",
//     image: <LogoutIcon />,
//     nav: NavigationString.rentedPropertiesScreen,
//   },
// ];

// const Drawer = createDrawerNavigator();

// // Custom drawer content component
// const CustomDrawerContent = (props) => {
//   const { name, role, picUrl } = props;
//   // console.log(name, role, "CustomDrawerContent---", props);
//   const { setCurrentRouteName } = useRouteNameContext();
//   const [visible, setVisible] = useState(false);
//   const dispatch = useDispatch();
//   const handleLogout = async () => {
//     console.log("Logout function called");
//     try {
//       LoginManager.logOut();
//       await AsyncStorage.removeItem("userData");
//       console.log("AsyncStorage cleared successfully.");
//       dispatch(authStatus(false));
//       dispatch(userLogout("Logout"));
//     } catch (error) {
//       console.error("Error clearing AsyncStorage:", error);
//     }
//   };

//   return (
//     <DrawerContentScrollView
//       {...props}
//       showsVerticalScrollIndicator={false}
//       style={{ marginTop: -4 }}>
//       {/* =========== Header design ======== */}
//       <View style={styles.drawerHeader}>
//         <Image
//           source={picUrl !== "" ? { uri: picUrl } : ImagePath.profileImage}
//           style={{
//             width: responsiveWidth(22),
//             height: responsiveWidth(22),
//             borderRadius: responsiveWidth(11),
//           }}
//           // resizeMode="contain"
//         />
//         <View style={{ marginLeft: 10 }}>
//           <TextView heading headingTextSty={styles.nameSty}>
//             {name}
//           </TextView>
//           <TextView heading headingTextSty={styles.typeSty}>
//             {role}
//           </TextView>
//         </View>

//         <ModalScreen
//           logOutImage
//           visible={visible}
//           modalheading={"Are you Leaving"}
//           modalText={"Are you sure you want to log out?"}
//           btnName="Cancel"
//           btnName1="Logout"
//           modalButton1={() => {
//             handleLogout();
//             setVisible(false);
//           }}
//           modalButton={async () => {
//             setVisible(false);
//           }}
//         />
//       </View>
//       {/* =========== All item design ======== */}
//       {DrawerItemName?.map((item, Index) => (
//         <DrawerItem
//           label={(color, size) => (
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 width: responsiveWidth(65),
//               }}>
//               <View style={{ flexDirection: "row", alignItems: "center" }}>
//                 {item?.image}
//                 <TextView textSty={styles.itemTextSty}>{item?.name}</TextView>
//               </View>
//               <View style={styles.rightArrowIcon}>
//                 <RightArrow height={11} width={11} color={Colors.black} />
//               </View>
//             </View>
//           )}
//           onPress={() => {
//             item.name === "Logout"
//               ? setVisible(true)
//               : // handleLogout()

//               item.name === "Profile" ||
//                 item.name === "My Wallet" ||
//                 item.name === "Favourites"
//               ? props.navigation.navigate(item.nav)
//               : (props.navigation.navigate(item.nav),
//                 setCurrentRouteName(NavigationString.transactionHistoryScreen));
//           }}
//         />
//       ))}
//     </DrawerContentScrollView>
//   );
// };
// // =====*****************========

// // -----landloder custom drawer
// const LandloderCustomDrawerContent = (props) => {
//   const { setSubSidebarToggle, subSidebarToggle, name, role, picUrl } = props;
//   const [visible, setVisible] = useState(false);
//   // console.log(
//   //   setSubSidebarToggle,
//   //   subSidebarToggle,
//   //   "----CustomDrawerContent---",
//   //   props
//   // );
//   const dispatch = useDispatch();

//   const handleLogout = async () => {
//     console.log("Logout function called");
//     try {
//       LoginManager.logOut();
//       await AsyncStorage.removeItem("userData");
//       console.log("AsyncStorage cleared successfully.");
//       dispatch(userLogout("Logout"));
//       dispatch(authStatus(false));
//     } catch (error) {
//       console.error("Error clearing AsyncStorage:", error);
//     }
//   };

//   return (
//     <DrawerContentScrollView
//       {...props}
//       showsVerticalScrollIndicator={false}
//       style={{ marginTop: -4 }}>
//       {/* =========== Header design ======== */}
//       <View style={styles.drawerHeader}>
//         {/* =========== user profile pic ======== */}
//         <Image
//           source={picUrl !== "" ? { uri: picUrl } : ImagePath.profileImage}
//           // resizeMode="contain"
//           style={{
//             width: responsiveWidth(22),
//             height: responsiveWidth(22),
//             borderRadius: responsiveWidth(11),
//           }}
//         />
//         {/* =========== user role and name  ======== */}
//         <View style={{ marginLeft: 10 }}>
//           <TextView heading headingTextSty={styles.nameSty}>
//             {name}
//           </TextView>
//           <TextView heading headingTextSty={styles.typeSty}>
//             {role}
//           </TextView>
//         </View>
//         <ModalScreen
//           logOutImage
//           visible={visible}
//           modalheading={"Are you Leaving"}
//           modalText={"Are you sure you want to log out?"}
//           btnName="Cancel"
//           btnName1="Logout"
//           modalButton1={() => {
//             handleLogout();
//             setVisible(false);
//           }}
//           modalButton={async () => {
//             setVisible(false);
//           }}
//         />
//       </View>
//       {/* =========== landlord list of  All item  ======== */}
//       {landlordDrawerItemName?.map((item, index) => {
//         const filteredItems = item?.children?.filter((item) => {
//           // Check if the item should be shown based on the user's role
//           if (role === "Property Manager") {
//             // For Property Manager, show all items including "Assigned Properties" and their children
//             return item.name !== "My Properties";
//           } else {
//             // For other roles, hide "Assigned Properties"
//             return (
//               item.name !== "Assigned Properties" &&
//               item.name !== "My Transactions"
//             );
//           }
//         });
//         return (
//           <>
//             <DrawerItem
//               label={(color, size) => (
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     width:
//                       Platform.OS === "ios"
//                         ? responsiveWidth(62)
//                         : responsiveWidth(55),
//                   }}>
//                   <View style={{ flexDirection: "row", alignItems: "center" }}>
//                     {item?.image}
//                     <TextView textSty={styles.itemTextSty}>
//                       {item?.name}
//                     </TextView>
//                   </View>
//                   {item?.children?.length > 0 ? (
//                     subSidebarToggle[index] ? (
//                       <DownIcon height={10} width={10} />
//                     ) : (
//                       <UpIcon height={10} width={10} />
//                     )
//                   ) : (
//                     <View style={styles.rightArrowIcon}>
//                       <RightArrow height={10} width={10} color={Colors.black} />
//                     </View>
//                   )}
//                 </View>
//               )}
//               onPress={() => {
//                 if (
//                   item?.children?.length > 0 &&
//                   item.isSubMenuOpened !== undefined
//                 ) {
//                   setSubSidebarToggle((prevState) => ({
//                     ...prevState,
//                     [index]: !prevState[index],
//                   }));
//                 }

//                 item.name === "Logout"
//                   ? setVisible(true)
//                   : item.isSubMenuOpened === undefined &&
//                     props.navigation.navigate(item.nav);
//               }}
//             />
//             {item?.children?.length > 0 &&
//               subSidebarToggle[index] &&
//               filteredItems?.map((subItem, index) => {
//                 return (
//                   <TouchableOpacity
//                     onPress={() =>
//                       subItem?.name === "Manage Calendar"
//                         ? props.navigation.navigate(subItem.nav, {
//                             key: "Manage Calendar",
//                           })
//                         : props.navigation.navigate(subItem.nav)
//                     }
//                     key={index}
//                     style={{
//                       // flex: 1,
//                       flexDirection: "row",
//                       alignItems: "center",
//                       // marginTop: 20,
//                       paddingVertical: 10,
//                       justifyContent: "space-between",
//                       marginLeft: 45,
//                       // width: responsiveWidth(50),
//                     }}>
//                     <View
//                       style={{ flexDirection: "row", alignItems: "center" }}>
//                       {subItem.image}
//                       <View
//                         style={{
//                           flexDirection: "row",
//                           alignItems: "center",
//                           justifyContent: "space-between",
//                           // backgroundColor: "red",
//                           flex: 1,
//                         }}>
//                         <TextView textSty={styles.itemTextSty}>
//                           {subItem.name}
//                         </TextView>
//                         <View style={{ ...styles.rightArrowIcon, right: 30 }}>
//                           <RightArrow
//                             height={10}
//                             width={10}
//                             color={Colors.black}
//                           />
//                         </View>
//                       </View>
//                     </View>
//                   </TouchableOpacity>
//                 );
//               })}
//           </>
//         );
//       })}
//     </DrawerContentScrollView>
//   );
// };

// const DrawerNavigation = ({ navigation }) => {
//   const [subSidebarToggle, setSubSidebarToggle] = useState({});
//   const { role } = useSelector((state) => state.auth);
//   const isLogin = useSelector((state) => state.auth.isLogin);

//   const [allUserData, setAllUserData] = React.useState();

//   useEffect(() => {
//     getToken();
//   }, []);

//   const getToken = async () => {
//     const accessGlobalData = await AsyncStorage.getItem("userData");
//     const jsonValue = JSON.parse(accessGlobalData);
//     setAllUserData(jsonValue);
//   };

//   // show drawer menu accouding to the role
//   const renderScreens = () => {
//     switch (role) {
//       case "Landlord":
//         return (
//           <Drawer.Screen
//             name={NavigationString.LandLordHomeScreen}
//             component={landLordHomeStack}
//           />
//         );
//       case "Property Manager":
//         return (
//           <Drawer.Screen
//             name={NavigationString.propertyManagerHomeScreen}
//             component={propertyManagerHomeStack}
//           />
//         );
//       case "Renter":
//         return (
//           <Drawer.Screen
//             name={NavigationString.HomeScreen}
//             // component={HomeStack}
//             component={BottomTabs}
//           />
//         );
//       default:
//         return (
//           <Drawer.Screen
//             name={NavigationString.HomeScreen}
//             // component={HomeStack}
//             component={BottomTabs}
//           />
//         );
//     }
//   };

//   return (
//     <RouteNameProvider>
//       <Drawer.Navigator
//         screenOptions={{
//           gestureEnabled: false, // Disable gesture slide for opening the drawer
//           headerShown: false, // Hide header for all screens
//           drawerType: "front",
//         }}
//         drawerContent={(props) =>
//           role === "Renter" ? (
//             <CustomDrawerContent
//               name={allUserData?.data?.fullName}
//               picUrl={allUserData?.data?.picture}
//               role={role}
//               {...props}
//             />
//           ) : (
//             <LandloderCustomDrawerContent
//               name={allUserData?.data?.fullName}
//               role={role}
//               picUrl={allUserData?.data?.picture}
//               setSubSidebarToggle={setSubSidebarToggle}
//               subSidebarToggle={subSidebarToggle}
//               {...props}
//             />
//           )
//         }
//         // Add the event listener here
//       >
//         {renderScreens()}
//       </Drawer.Navigator>
//     </RouteNameProvider>
//   );
// };

// export default DrawerNavigation;

// const styles = StyleSheet.create({
//   drawerHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     backgroundColor: Colors.TintsBlue,
//     paddingVertical: 25,
//   },
//   nameSty: {
//     fontSize: 16,
//     lineHeight: 22,
//     color: Colors.white,
//   },
//   typeSty: {
//     color: Colors.green,
//     fontSize: 11,
//     lineHeight: 15.4,
//   },
//   itemTextSty: {
//     fontFamily: "Rubik-Light",
//     fontSize: 14,
//     lineHeight: 20,
//     fontWeight: "bold",
//     color: Colors.Cyprus,
//     marginLeft: 10,
//   },
//   rightArrowIcon: {
//     width: 5,
//     height: 5,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
