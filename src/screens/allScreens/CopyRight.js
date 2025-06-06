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

const CopyRight = ({ navigation }) => {
  const copyRight = [
    "Literary works e.g. books and written composition novels",
    "Musical works e.g. songs",
    "Artistic works e.g. paintings and drawings",
    "Cinematograph films e.g. programme-carrying signal that has been transmitted by satellite",
    "Sound recordings",
    "Broadcasts e.g. broadcasting of films or music",
    "Programme-carrying signals e.g. signals embodying a programme",
    "Published editions e.g. first print by whatever process and ",
    "Computer programs.",
  ];
  const step = [
    "STEP 1:- REGISTER AS A CUSTOMER (view how to)",
    "STEP 2:- DEPOSIT FUNDS (view how to)",
    "STEP 3:- APPLY FOR COPYRIGHT (only cinematographic films)",
  ];
  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}

      <Header
        arrowBack
        notify
        title={"Copy Right"}
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
            source={ImagePath.copyrightImg} // Replace with your image URL
            style={styles.image}
          />

          <TextView textSty={styles.description}>
            A copyright is an exclusive right granted by law for a limited
            period to an author, designer, etc. for his/her original work. Only
            cinematographic films can be registered with CIPC for copyright
            purposes. Other materials are copyright-protected automatically upon
            creation. Copyright is created by putting the words “copyright” or
            “copyright reserved” or “copyright Smith 2011” (i.e. copyright,
            followed by name and the year), or the copyright symbol, name and
            year e.g. © Meati 2011.{`\n\n`}The following works are eligible for
            copyright protection under Copyright Act:
          </TextView>

          <View style={styles.bulletPoints}>
            {copyRight?.map((item, index) => (
              <Text style={styles.bulletPoint}>
                • <Text style={styles.bold}>{item}</Text>
              </Text>
            ))}
          </View>
          <TextView textSty={styles.description}>
            For a work to be eligible for copyright protection, it must be
            original and be reduced to material form. You can obtain copyright
            protection if you are a citizen of South Africa or if your work was
            produced in South Africa. For non-citizens, you can obtain copyright
            protection in South Africa only if the country for which you are a
            citizen is part of the Berne Convention. The Berne Convention is an
            international agreement on copyright by which member countries grant
            each other copyright protection.
          </TextView>
          <View style={styles.bulletPoints}>
            {step?.map((item, index) => (
              <Text
                style={{
                  ...styles.bold,
                  marginBottom: index == step.length - 1 ? 30 : 10,
                }}
              >
                {item}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CopyRight;

const styles = StyleSheet.create({
  safeView: { flex: 1, backgroundColor: Colors.bgColor },
  container: {
    flex: 1,
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
