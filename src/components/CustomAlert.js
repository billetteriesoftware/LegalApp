import React from "react";
import { View,  Modal, StyleSheet } from "react-native";
import TextView from "./TextView";
import Colors from "../styles/Colors";
import Button from "./Button";

const CustomAlert = ({ isLoading, title, description, handleOkay }) => {
  return (
    <Modal animated={true} transparent={true} visible={isLoading}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <View style={{ backgroundColor: "transparent", position: "absolute" }}>
          <View
            style={{
              backgroundColor: Colors.White,
              padding: 30,
              borderRadius: 8,
       
            alignSelf:'center'
            }}
          >
            <TextView
              heading
              headingTextSty={{
                color: Colors["TealBlue"],
                fontSize: 16,
                lineHeight: 19,
                textAlign: "center",
              }}
            >
              {title}
            </TextView>
            <TextView textSty={{ marginVertical: 7 }}>{description}</TextView>

            <Button
              onClick={handleOkay}
              btnName={"Okay"}
              buttonColor={Colors.White}
              allButtonSty={styles.loginBtnSty}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  loginBtnSty: {
    marginHorizontal: 0,
    paddingVertical: 15,
    marginTop: 10,
    // width:'0%',
    // alignSelf:'center'
  },
});
