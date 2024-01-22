import { Pressable, TextInput, View, Text } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/userSlice';
import { registrateUser } from '../store/slices/userSlice';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let ifLogedIn = true

    const dispatch = useDispatch()
    const user = useSelector(store => store.userReducer)

    return (
        <View>
            <TextInput
                placeholder='email'
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                placeholder='password'
                onChangeText={setPassword}
                value={password}
            />
            <Pressable onPress={() => {
                console.log('here', email, password)
                if (email == '') {
                    ifLogedIn = false
                    return
                }
                if (password == '') {
                    ifLogedIn = false
                    return
                }
                dispatch(loginUser({ email: email, password: password }))
                    .then(() => {
                        if (!user.auth) {
                            ifLogedIn = false
                            return
                        }
                        ifLogedIn = true
                        console.log('here2')
                        //navigation.goBack()
                    })
            }}>
                {ifLogedIn ? <Text></Text> : <Text>Email or password is wrong</Text>}
                <Text>Login</Text>
            </Pressable>

            <Pressable onPress={() => {
                console.log('registrate', email, password)
                if (email == '') {
                    ifLogedIn = false
                    return
                }
                if (password == '') {
                    ifLogedIn = false
                    return
                }
                dispatch(registrateUser({ email: email, password: password }))
                    .then(() => {
                        if (!user.auth) {
                            ifLogedIn = false
                            return
                        }
                        ifLogedIn = true
                        console.log('here2 registrate')
                        //navigation.goBack()
                    })
            }}>
                {ifLogedIn ? <Text></Text> : <Text>Email or password is wrong</Text>}
                <Text>Registrate</Text>
            </Pressable>
        </View>
    );
}

export default LoginScreen;