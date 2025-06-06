import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import Header from "../../components/Header";
import Colors from "../../styles/Colors";
import ImagePath from "../../constant/ImagePath";
import TextView from "../../components/TextView";
import FontFamily from "../../styles/FontFamily";
import NavigationString from "../../Navigations/NavigationString";

const Patent = ({ navigation }) => {
  const points = [
    "Computer programmes",
    "Artistic works",
    "Mathematical methods and other purely mental processes",
    "Games",
    "Plans, schemes, display of information",
    "Business methods",
    "Biological inventions",
    "Methods for treatment of humans and animals",
  ];

  const paytentTypes = [
    `STEP 1:- REGISTER AS A CUSTOMER (view how to)`,

    `STEP 2:- DEPOSIT FUNDS (view how to)`,

    `STEP 3:- CONDUCT PATENT SEARCH ONLINE (view how to)`,

    `STEP 4:- APPLY FOR PATENT`,
  ];
  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}

      <Header
        arrowBack
        notify
        title={"Patent"}
        rightClick={() => navigation.goBack()}
        clickNotification={() => {
          navigation.navigate(NavigationString.NotificationScreen);
        }}
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        nestedScrollEnabled={true}
      >
        <View style={styles.container}>
          <Image
            source={ImagePath.patentImg} // Replace with your image URL
            style={styles.image}
          />

          <TextView textSty={styles.description}>
            A patent is an exclusive right granted for an invention, which is a
            product or a process that provides a new way of doing something, or
            offers a new technical solution to a problem. A patent provides
            protection for the owner, which gives him/her the right to exclude
            others from making, using, exercising, disposing of the invention,
            offering to dispose, or importing the invention. The protection is
            granted for a limited period of 20 years. A patent may be granted
            for any new invention which involves an inventive step and which is
            capable of being used or applied in trade and industry or
            agriculture. These include inventions such as appliances, mechanical
            devices and so on. However, you may not protect things such as:
          </TextView>

          <View style={styles.bulletPoints}>
            {points?.map((item) => (
              <Text style={styles.bulletPoint}>
                • <Text style={styles.bold}>{item}</Text>
              </Text>
            ))}

            {/* <Text style={styles.bulletPoint}>
              • <Text style={styles.bold}>Patent Searches:</Text> Comprehensive
              searches to ensure your invention is unique and patentable.
            </Text>
            */}
          </View>
          <Text style={styles.description}>
            Please note that the above mentioned things cannot be patented as
            such.  For example, a computer programme is patentable as part of a
            technical solution, i.e. when it is used to operate a specific
            device or machine such as a winder, a crane or parking management.
            {`\n\n`}A patent can last up to 20 years, provided that it is
            renewed annually before the expiration of the third year from the
            date of filing in South Africa. It is important to pay an annual
            renewal fee to keep it in force. The patent expires after 20 years
            from the date of application.
          </Text>

          <Text style={{ ...styles.bold, marginBottom: 10 }}>
            Checklist for registration of patent:
          </Text>

          {paytentTypes?.map((item, index) => (
            <Text
              style={{
                ...styles.bold,
                marginBottom: index == paytentTypes.length - 1 ? 30 : 10,
              }}
            >
              {item}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Patent;

const styles = StyleSheet.create({
  safeView: { flex: 1, backgroundColor: Colors.bgColor },
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginHorizontal: 16,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    borderRadius: 10,
    marginVertical: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: "#323232",
    marginBottom: 16,
    fontFamily: FontFamily.Light,
    lineHeight: 22,
  },
  bulletPoints: {
    marginBottom: 16,
  },
  bulletPoint: {
    fontSize: 15,
    color: "#323232",
    marginBottom: 8,
    fontFamily: FontFamily.Regular,
    lineHeight: 22,
  },
  bold: {
    fontFamily: FontFamily.ExtraBold,
    color: Colors.Black,
    flex: 1,
  },
});
