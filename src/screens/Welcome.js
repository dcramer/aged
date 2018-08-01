import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

import { logInFailure, logInSuccess, logOut } from '../actions/auth';
import { colors, layout, margins } from '../styles';

class Welcome extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Icon style={styles.icon} name="ios-beer" size={160} color="white" />
        <Text style={styles.label}>Peated</Text>
        <View style={styles.loginContainer}>
          <LoginButton
            onLoginFinished={(error, result) => {
              if (error) {
                this.props.logInFailure(error, result);
              } else if (result.isCancelled) {
                // nothing to do here
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  console.log(data);
                  this.props.logInSuccess(data);
                  // alert(data.accessToken.toString());
                });
              }
            }}
            onLogoutFinished={() => this.props.logOut}
          />
        </View>
        {__DEV__ && (
          <TouchableOpacity onPress={() => this.props.logInSuccess({})}>
            <Text style={styles.debugAction}>Debug: Bypass Auth</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: layout.statusBarHeight + margins.half,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  loginContainer: {
    padding: margins.quarter,
    margin: margins.full * 2,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#4267b2',
  },
  label: {
    color: '#fff',
    fontFamily: 'Rubik',
    fontSize: 34,
    fontWeight: 'bold',
  },
  debugAction: {
    color: '#fff',
    alignSelf: 'flex-end',
  },
});

export default connect(
  ({ auth }) => ({}),
  { logInSuccess, logInFailure, logOut }
)(Welcome);
