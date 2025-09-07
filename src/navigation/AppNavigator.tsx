// src/navigation/AppNavigator.tsx

import { useState, useCallback } from "@lynx-js/react";

import HomeScreen from "../screens/HomeScreen";
import ReviewDetailScreen from "../screens/ReviewDetailScreen";

export type NavParams = { slug: string };
export type ScreenName = "Home" | "ReviewDetail";

export type NavigateFunction = (screen: ScreenName, params?: NavParams) => void;
export type GoBackFunction = () => void;

export default function AppNavigator() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>("Home");
  const [navParams, setNavParams] = useState<NavParams | null>(null);

  const navigate = useCallback<NavigateFunction>((screen, params) => {
    setCurrentScreen(screen);
    setNavParams(params || null);
  }, []);

  const goBack = useCallback<GoBackFunction>(() => {
    setCurrentScreen("Home");
    setNavParams(null);
  }, []);

  switch (currentScreen) {
    case "ReviewDetail":
      return (
        <ReviewDetailScreen
          navigation={{ navigate, goBack }}
          route={{ params: navParams }}
        />
      );
    case "Home":
    default:
      return <HomeScreen navigation={{ navigate }} />;
  }
}
