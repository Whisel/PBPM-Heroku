import React, { Component } from 'react';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { Text, Button, Select, Input, Icon, Popover, Divider, List, ListItem, Card, SelectItem } from '@ui-kitten/components';
import * as Location from 'expo-location';

const times = ["5", "10", "15", "20", "25", "30"]

class SignUpCard extends Component {

    constructor(props){
        super(props)

        this.state = {
            index: -1,
            positionNameArray: props.names,
            item: props.item,
            timeIndex: -1
        }
    }

    setIndex = (index) => {
        this.setState({
            index: index-1
        })
    }

    setTimeIndex = (index) => {
        this.setState({
            timeIndex: index-1
        })
    }

    onPress = () => {
        this.props.navigation.navigate("StationaryActivity", 
            {
                activityDetails: this.props.activityDetails, 
                time: times[this.state.timeIndex],
                position: this.props.activityDetails.markers[this.state.index]
            }
        )
    }

    render(){

        const PositionSelector = () => {

            return(
                <Select style={{width: 100}} placeholder={' '} value={this.state.positionNameArray[this.state.index]} onSelect={index => this.setIndex(index)}>
                    {this.state.positionNameArray.map((name, key) => {
                        return(
                            <SelectItem title={name} key={key}/>
                        )
                    })}
                </Select>
            );
        }

        const TimerSelector = () => {

            return(
                <Select style={{width: 100}} placeholder={' '} value={times[this.state.timeIndex]} onSelect={index => this.setTimeIndex(index)}>
                    {times.map((time, key) => {
                        return(
                            <SelectItem title={time} key={key}/>
                        )})
                    }
                </Select>
            )
        }

        return(
            <Card>
                <View>
                    <Text style={{fontSize: 18, marginBottom: 10}}>
                        Position: {'\t\t'} 
                        <PositionSelector/>
                    </Text>
                    <Text style={{fontSize: 18, marginBottom: 20}}>
                        Time Limit: {'\t'} 
                        <TimerSelector/> {'\t'}
                        mins
                    </Text>
                        
                </View>

                <Text style={{fontSize:18, marginBottom: 10}}>Time Start: {'\t'} {this.state.item.timeString}</Text>
                <Button onPress={this.onPress}>
                    Sign Up / Begin
                </Button>
            </Card>
        )
    }

}

export default SignUpCard