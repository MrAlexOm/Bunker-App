export type RootStackParamList = {
  Home: undefined;
  SOSScreen: undefined;
  Danger: undefined;
  Safety: undefined;
  Medical: undefined;
  Inventory: undefined;
  Scenarios: undefined;
  Panic: undefined;
  Settings: undefined;
};

export type RootStackNavigationProp = import('@react-navigation/native').StackNavigationProp<RootStackParamList>;
