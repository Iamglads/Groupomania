import React, {useContext, useState} from 'react';
import { View, Text, TouchableOpacity, Image, Platform, StyleSheet, ScrollView } from 'react-native';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
//import {AuthContext} from '../navigation/AuthProvider';

const LoginScreen = ({navigation}) => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

  //const {login, googleLogin, fbLogin} = useContext(AuthContext);

  return (
    <View style={styles.container}>
		<View style={styles.header}>
			<Image
				source={require('../assets/logo.png')}
				style={styles.logo}
			/>
		</View>
		<View style={styles.textContainer}>
			<Text style={styles.title}>Connectez-vous!</Text>
		</View>
		<View style={styles.form}>
			<FormInput
			labelValue={email}
			onChangeText={(userEmail) => setEmail(userEmail)}
			placeholderText="E-mail"
			iconType="user"
			keyboardType="email-address"
			autoCapitalize="none"
			autoCorrect={false}
			/>

			<FormInput
			labelValue={password}
			onChangeText={(userPassword) => setPassword(userPassword)}
			placeholderText="Mot de passe"
			iconType="lock"
			secureTextEntry={true}
			/>

			<FormButton
			buttonTitle="Connexion"
			onPress={() => login(email, password)}
			/>

			{Platform.OS === 'android' ? (
			<View style={styles.socialButtonContainer}>
				<SocialButton
				buttonTitle="Connexion avec Facebook"
				btnType="facebook"
				color="#4867aa"
				backgroundColor="#e6eaf4"
				onPress={() => fbLogin()}
				/>

				<SocialButton
				buttonTitle="Connexion avec Google"
				btnType="google"
				color="#de4d41"
				backgroundColor="#f5e7ea"
				onPress={() => googleLogin()}
				/>
			</View>
			) : null}

			<TouchableOpacity
			style={styles.forgotButton}
			onPress={() => navigation.navigate('Signup')}>
				<Text style={styles.navButtonText}>
					Vous n'avez pas de compte? Créez un compte!
				</Text>
			</TouchableOpacity>
		</View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
   	backgroundColor: '#d8d8d8',
	height: '100%'
  },

  header: {
	padding: 10,
    width: '100%',
	height: 100,
    backgroundColor: 'rgb(10, 32, 66)',
	justifyContent: 'center',
	alignItems: 'center'
  },

  logo: {
    height: 60,
    width: '70%',
    resizeMode: 'cover',
  },

  textContainer: {
	  height: 60,
	  justifyContent: 'center',
	  alignItems: 'flex-start',
	  padding: 10
  },

  title: {
	fontSize: 24,
	color: '#0a2042',
	fontWeight: 'bold',
  },

  form: {
	padding: 10
  },

  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 20,
    color: '#051d5f',
	justifyContent: 'flex-start'
  },

  socialButtonContainer: {
	marginTop: 30
  },

  navButton: {
    marginTop: 15,
  },

  forgotButton: {
    marginVertical: 35,
  },

  navButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
});