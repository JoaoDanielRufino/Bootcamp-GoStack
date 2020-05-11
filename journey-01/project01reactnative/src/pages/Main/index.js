import React, { Component } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Form, Input, SubmitButton, List, User, Avatar, Name, Bio, ProfileButton, ProfileButtonText } from './styles';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
    loading: false
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');
    if(users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    if(prevState.users !== this.state.users) {
      AsyncStorage.setItem('users', JSON.stringify(this.state.users));
    }
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    this.setState({ loading: true });

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url
    };

    this.setState({ users: [...users, data], newUser: '', loading: false });

    Keyboard.dismiss();
  }

  handleNavigate = (user) => {
    this.props.navigation.navigate('User', { user });
  }

  render() {
    const { users, newUser, loading } = this.state;

    return (
      <Container>
        <Form>
          <Input autoCorrect={false} autoCapitalize="none" placeholder="Adicionar usuario" value={newUser} onChangeText={text => this.setState({ newUser: text })} returnKeyType="send" onSubmitEditing={this.handleAddUser} />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {
              loading ? ( <ActivityIndicator /> ) : (
                 <Icon name="add" size={20} color="#FFF" /> )
            }
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ProfileButton  onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}

Main.navigationOptions = {
  title: 'Usuarios'
}