import * as React from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Back from '@mui/icons-material/ArrowBackRounded';
import { Link, Navigate } from 'react-router-dom';

import './routes.css';
import { response } from 'express';

function NewUser(){
    // to access fname lname...etc values.fname, do not access show(Confirm)Password
    const [values, setValues] = React.useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // Handles visibility toggle for password fields
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickShowConPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //declaring reg vars
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    //registering user function
    const submitNewUser = async e => {
        if (password !== confirmPassword) {
            return;
        }

        //default location since registering on the app requires this should be added to avoid conflict
        let defaultLocation = {
            "latitude": 28.602413253152307,
            "longitude": -81.20019937739713,
        };

        const user = { email, password };
        if(firstname !== '') user.firstname = firstname;
        if(lastname !== '') user.lastname = lastname;

        //trying to register the user
        try{
            const response = await fetch('https://measuringplacesd.herokuapp.com/api/users', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Constent-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            const res = await response.json();
            console.log('OK: ' + response.ok, 'Signup response: ' + JSON.stringify(res));

            //augmented from mobile app with localStorage rather than AsyncStorage
            if(response.ok){
                localStorage.setItem('@token', response.token);
                localStorage.setItem('@id', response.user._id);
                localStorage.setItem("@isVerified", JSON.stringify(res.user.is_verified))
                localStorage.setItem("@email", res.user.email)
                localStorage.setItem("@firstName", res.user.firstname)
                localStorage.setItem("@lastName", res.user.lastname)
                localStorage.setItem("@teams", JSON.stringify(res.user.teams))
                localStorage.setItem("@invites", JSON.stringify(res.user.invites))
                localStorage.setItem("@mapConfig", "satellite")

                let { status } = await Location.requestForegroundPermissionsAsync();

                if( status !== 'granted' ) {
                    console.log('Permission to access location was denied');
                }
                <Navigate to='/home'/>
            }
        } catch(error) {
            console.log(error);
        }
    }

    return(
        <div id='newUser'>
            <div className='pageTemplate'>
                <Link className='backButton' to='/'><Back className='iconShadow' /></Link>
                {/* tagBox - sizing for form card, on Title.js as well */}
                <div className='tagBox'>
                    <Card id='pageCard'>
                        <Card.Body>
                            <h3>Create an account</h3>
                            <br/>
                            <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <TextField  
                                    className='nonFCInput' 
                                    id='outlined-search' 
                                    label='First Name' 
                                    type='text' 
                                    value={ firstname } 
                                    onChange={ ({target}) => setFirstname(target.value) }
                                />
                                <TextField 
                                    className='nonFCInput' 
                                    id='outlined-search' 
                                    label='Last Name' 
                                    type='text' 
                                    value={ lastname } 
                                    onChange={ ({target}) => setLastname(target.value) }
                                />
                                <TextField 
                                    className='nonFCInput' 
                                    id='outlined-search' 
                                    label='Email' 
                                    type='email' 
                                    value={ email } 
                                    onChange={ ({target}) => setEmail(target.value) }
                                />
                                <FormControl sx={{ m: 1}} variant='outlined'>
                                    <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                                    <OutlinedInput
                                        id='outlined-adornment-password'
                                        type={values.showPassword ? 'text' : 'password' }
                                        value={ password }
                                        onChange={ ({target}) => setPassword(target.value) }
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    aria-label='visibility toggle'
                                                    onClick={ handleClickShowPassword }
                                                    onMouseDown={ handleMouseDownPassword }
                                                    edge='end'
                                                >
                                                    { values.showPassword ? <VisibilityOff /> : <Visibility /> }
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label='Password'
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1 }} variant='outlined'>
                                    <InputLabel htmlFor='outlined-adornment-password'>
                                        Confirm Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id='outlined-adornment-password'
                                        type={ values.showConfirmPassword ? 'text' : 'password' }
                                        value={ confirmPassword }
                                        onChange={ ({target}) => setConfirmPassword(target.value) }
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    aria-label='visibility toggle'
                                                    onClick={ handleClickShowConPassword }
                                                    onMouseDown={ handleMouseDownPassword }
                                                    edge='end'
                                                >
                                                    {
                                                        values.showConfirmPassword ? 
                                                        <VisibilityOff /> : <Visibility />
                                                    }
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label='Confirm Password'
                                    />
                                </FormControl>
                                <br/>
                                <Button 
                                    className='scheme' 
                                    type='submit' 
                                    size='lg' 
                                    id='newUserButton' 
                                    onClick={ submitNewUser }
                                >
                                    Create
                                </Button>
                            </Box>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default NewUser;