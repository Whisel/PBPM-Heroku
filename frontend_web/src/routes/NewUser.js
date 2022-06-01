import * as React from 'react';
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
import { Link } from 'react-router-dom';

import './routes.css';

function NewUser(){
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

    const submitNewUser = async () => {
        var bp = require('./Path.js');
        let success = false;
        let res = null;

        try        
        {            
            const response = await fetch(bp.buildPath('api/adduser'),            
                {method:'POST',
                header: {
                    Accept: 'application/json',
                        'Content-Type': 'application/json',
                },
                body: {
                    email: values.email,
                    password: values.password
                }
            });
            res = JSON.parse(await response.text());
            success = res.success;           
        }
        catch (error) {
            console.log("ERROR: ", error);
            success = false;
        }
    };

    return(
        <div id='newUser'>
            <div id='pageTemplate'>
                <Link className='backButton' to='/'><Back className='iconShadow' /></Link>
                <div className='tagBox'>
                    <Card id='pageCard'>
                        <Card.Body>
                            <h3>Create an account</h3>
                            <br/>
                            <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <TextField  className='nonFCInput' id='outlined-search' label='First Name' type='text' value={values.fname} onChange={handleChange('fname')}/>
                                <TextField className='nonFCInput' id='outlined-search' label='Last Name' type='text' value={values.lname} onChange={handleChange('lname')}/>
                                <TextField className='nonFCInput' id='outlined-search' label='Email' type='email' value={values.email} onChange={handleChange('email')}/>
                                <FormControl sx={{ m: 1}} variant='outlined'>
                                    <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                                    <OutlinedInput
                                        id='outlined-adornment-password'
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    aria-label='visibility toggle'
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge='end'
                                                >
                                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label='Password'
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1 }} variant='outlined'>
                                    <InputLabel htmlFor='outlined-adornment-password'> Confirm Password</InputLabel>
                                    <OutlinedInput
                                        id='outlined-adornment-password'
                                        type={values.showConfirmPassword ? 'text' : 'password'}
                                        value={values.confirmPassword}
                                        onChange={handleChange('confirmPassword')}
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    aria-label='visibility toggle'
                                                    onClick={handleClickShowConPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge='end'
                                                >
                                                    {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label='Confirm Password'
                                    />
                                </FormControl>
                                <br/>
                                <Button className='scheme' type='submit' size='lg' id='newUserButton' onClick={submitNewUser}>
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