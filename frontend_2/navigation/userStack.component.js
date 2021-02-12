import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserSettings } from '../screens/UserSettings/userSettings.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'react-native-reanimated';

const { Navigator, Screen } = createStackNavigator();

export function UserSettingsStack(props) {

	// These are used for api calls
	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null);

	// user info
	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const [email, setEmail] = useState(null);

	useEffect(() => {
		async function getTokens() {
			// used for api calls
			let token = await AsyncStorage.getItem("@token");
			setToken(token);
	
			let id = await AsyncStorage.getItem("@id");
			setUserId(id);
	
			let firstName = await AsyncStorage.getItem('@firstName');
			setFirstName(firstName);

			let lastName = await AsyncStorage.getItem("@lastName");
			setLastName(lastName);

			let email = await AsyncStorage.getItem("@email");
			setEmail(email);
		}
	
		getTokens()

		
	}, []);

	return (
        <Navigator headerMode='none'>
            <Screen name='UserSettings'>
                {props => <UserSettings {...props}
                    firstName = {firstName}
                    lastName = {lastName}
                    email = {email}
                    setFirstName = {setFirstName}
                    setLastName = {setLastName}
                    setEmail = {setEmail}
                >
                </UserSettings>}
            </Screen>
        </Navigator>
    );
};
