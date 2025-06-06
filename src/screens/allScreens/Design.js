import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Colors from '../../styles/Colors';
import ImagePath from '../../constant/ImagePath';
import TextView from '../../components/TextView';
import FontFamily from '../../styles/FontFamily';
import NavigationString from '../../Navigations/NavigationString';

const Design = ({navigation}) => {

  const paytentTypes = [
    `STEP 1:- REGISTER AS A CUSTOMER (view how to)`,

    `STEP 2:- DEPOSIT FUNDS (view how to)`,

    `STEP 3:- CONDUCT PATENT SEARCH ONLINE (view how to)`,

    `STEP 4:- APPLY FOR PATENT`,
  ]

  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}

      <Header
        arrowBack
        notify
        title={'Design'}
        rightClick={() => navigation.goBack()}
        clickNotification={() => {
        navigation.navigate(NavigationString.NotificationScreen)
        }}
      />

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}>
        <View style={styles.container}>
          <Image
            source={ImagePath.designImg} // Replace with your image URL
            style={styles.image}
          />

          <TextView textSty={styles.description}>
          A Design is about shape and features that appeal to the eye.{`\n\n`}
Some designs are necessitated by function and others are aesthetic. Design is about the shape, form, pattern, ornamentation and configuration of a product or article.{`\n\n`}
There are 2 types of designs that one can register:{`\n`}
An aesthetic design {`\n`}
Has to be new and original{`\n\n`}
Beauty is in its shape, configuration or ornamentation{`\n\n`}
Must be able to be produced by an industrial process{`\n\n`}
A functional design {`\n\n`}
Has to be new and not commonplace{`\n\n`}
Where the shape or configuration is necessitated by the function{`\n\n`}
Must be able to be produced by an industrial process{`\n\n`}
The process for applying for registration of your design involves a number of steps. You need to make sure you understand and complete each step so that your application can be processed quickly and easily.{`\n\n`}
Protection is afforded to aesthetic designs for one period of 15 years, and to functional designs for one period 10 years.{`\n\n`}
Registered designs have to be renewed annually before the expiration of the third year, as from the date of lodgment.{`\n`}
          </TextView>

          <View style={styles.bulletPoints}>
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
            {/* <Text style={styles.bulletPoint}>
              • <Text style={styles.bold}>Infringement Support:</Text>{' '}
              Protecting your rights in case of unauthorized use by competitors.
            </Text>
            <Text style={styles.bulletPoint}>
              • <Text style={styles.bold}>Global Protection:</Text> Ensuring
              your designs are protected across multiple jurisdictions. By
              securing your designs, we enable you to maintain your competitive
              edge and enhance your brand value.
            </Text> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Design;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
    marginVertical: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: '#323232',
    marginBottom: 16,
    fontFamily: FontFamily.Light,
    lineHeight: 22,
  },
  bulletPoints: {
    marginBottom: 16,
  },
  bulletPoint: {
    fontSize: 15,
    color: '#323232',
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
