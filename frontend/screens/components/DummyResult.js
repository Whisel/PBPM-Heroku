import React, { Component } from 'react';
import { View,  Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, CheckBox, Button, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import styles from './dummyResultStyles.js';

class DummyResult extends Component {

    constructor(props) {
		super(props);

        this.state = {
            checked: false,
            added: false,
        }
	}
	
	async onResultsPress() {
		await this.props.setProjectIndex(this.props.projectIndex);
		await this.props.setProjectIndex(this.props.projectIndex);
		await this.props.navigation.navigate("ResultsScreen");
	}

    async onCheckBoxPress() {
        await this.setState({
            checked: !this.state.checked
        })

        if (this.state.checked)
        {
            await this.props.compareIncrement();
            await this.props.addProject(this.props.projectArea)

            await this.setState({
                added: !this.state.added
            })
        }
        else
        {
            await this.props.compareDecrement();
            await this.props.removeProject(this.props.projectArea)

            await this.setState({
                added: !this.state.added
            })
        }
    }
    
    async componentDidUpdate() {

        if (!this.props.inList(this.props.projectArea) && this.state.added && this.state.checked){

            await  this.setState({
                checked: false,
                added: false
            })
        }

    }

    render(){

        const CompareCheckBox = () => {

            if (this.props.compare)
            {
                return(
                    <CheckBox checked={this.state.checked} onChange={() => this.onCheckBoxPress()} status={'control'} style={styles.resultBoxCheckBox}/>
                );
            }
            else
            {
                return null;
            }
        }

        return(
            <View style={styles.result}>

                <View style={styles.resultTab}>
                    <CompareCheckBox/>
                </View>
                
				{/* Button should show result screen*/}
				<Button 
					style={styles.resultBox} 
					appearance={"outline"} 
					status={"basic"}
					onPress={() => this.onResultsPress()}
				>
					<Text category={'s1'} style={styles.resultBoxText}>
						{this.props.projectArea}
					</Text>
					{'\n'}
					<Text category={'s2'} style={styles.resultBoxComment}>
						{this.props.projectComment}
					</Text>
                </Button>

            </View>
        );
    }
}

export default DummyResult;