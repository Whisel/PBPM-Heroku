// Modify code
import React, { Component } from 'react';
import { View,  ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import styles from './researchStyles.js'

import EmptyCompareBox from '../components/Compare/EmptyCompareBox.js'
import CompareBox from '../components/Compare/CompareBox.js';
import MyHeader from '../components/Headers/MyHeader.js';


class ResultsScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            index: 0,
            compareCount: this.props.compareCount
        }

        console.log(this.props.selectedProjects)

    }

    render() {
        return(
            <View style={styles.container}>

                <MyHeader myHeaderText={"Results"}/>

                <View style={{height:'35%'}}>
                    <HomeMapView location={this.state.location}/>
                </View>     
            </View>
        )
    }
}

export default ResultsScreen;