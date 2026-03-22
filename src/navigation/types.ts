export type RootStackParamList = {
  MainTabs: undefined;
  SOSScreen: undefined;
  Danger: undefined;
  Safety: undefined;
  Medical: undefined;
  Supplies: undefined;
  Scenarios: undefined;
  Panic: undefined;
  Settings: undefined;
  Home: undefined;
};

export type RootStackNavigationProp = import('@react-navigation/native').StackNavigationProp<RootStackParamList>;
