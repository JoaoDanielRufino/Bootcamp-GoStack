import React from 'react';
import { View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../components/Background';

export default function Dashboard() {
  return (
    <Background>

    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => <Icon name="event" size={20} color={tintColor} />
};