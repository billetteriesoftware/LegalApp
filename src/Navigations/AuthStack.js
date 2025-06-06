import React from "react";
import * as Screens from "../screens/Index";
import navigationString from "./NavigationString";

export default function (Stack, isFirstTime) {
  return (
    <>
      {!isFirstTime && (
        <>
          <Stack.Screen
            name={navigationString.SplashScreen}
            component={Screens.Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={navigationString.IntroScreen}
            component={Screens.IntroPages}
            options={{ headerShown: false }}
          />
        </>
      )}
      <Stack.Screen
        name={navigationString.LoginScreen}
        component={Screens.Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationString.ForgotScreen}
        component={Screens.Forgot}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationString.OTPScreen}
        component={Screens.OTP}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationString.ResetPasswordScreen}
        component={Screens.ResetPassword}
        options={{ headerShown: false }}
      />
    </>
  );
}
