import React, {Component} from 'react';
import HomeScreen from '../screens/Home/HomeScreen.js';
import CompareScreen from '../screens/CompareResults/CompareScreen.js';
import ResultsScreen from '../screens/ResearchResults/ResultsScreen.js';
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();

class HomeScreenStack extends Component {

    constructor(props){
		super(props);
		
		// Dummy results used to test home screen
		dummy1 = {
			title: "Lake Lillian",
			description: "Pavillion at Lake Lilian",
			area: 0,
			subareas: [],
			activities: [],
		};

		dummy2 = {
			title: "Lake Eola",
			description: "East side of Lake Eola",
			area: 0,
			subareas: [],
			activities: [],
		};

		dummy3 = {
			title: "J. Blanchard Park",
			description: "First mile of trails",
			area: 0,
			subareas: [],
			activities: [],
		};

        this.state = {
			selectedProjects: [],
			allProjects: [dummy1, dummy2, dummy3],
			selectedProjectIndex: -1
        }

        this.getSelectedProjects = this.getSelectedProjects.bind(this)
        this.removeFromSelectedProjects = this.removeFromSelectedProjects.bind(this)
    }

    async getSelectedProjects(projects) {

        await this.setState({
            selectedProjects: projects
        })
    }

    async removeFromSelectedProjects(name) {

        var selectedProjectsArray = this.state.selectedProjects

        var index = selectedProjectsArray.indexOf(name)

        selectedProjectsArray.splice(index, 1)

        console.log("Array: " + JSON.stringify(selectedProjectsArray))

        await this.setState({
            selectedProjects: selectedProjectsArray
        })
	}
	
	setResultProjectIndex = async(index) => {
		this.setState({selectedProjectIndex: index})
	}

    render() {
        return(
            <HomeStack.Navigator>

                <HomeStack.Screen
                    name="HomeScreen"
                    options={{headerShown: false}}
                >
                    {props => <HomeScreen {...props}
                                selectedProjects = {this.state.selectedProjects}
                                setProjects = {this.getSelectedProjects}
                                navigation = {this.props.navigation}
								location = {this.props.location}
								allProjects = {this.state.allProjects}
                                removeFromSelectedProjects = {this.removeFromSelectedProjects}
								setResultProjectIndex = {this.setResultProjectIndex}>
                                </HomeScreen>}
                </HomeStack.Screen>

				<HomeStack.Screen
                    name="ResultsScreen"
                    options={{headerShown: false}}
                >
                    {props => <ResultsScreen {...props} 
                                project = {this.state.allProjects[this.state.selectedProjectIndex]}>
                                </ResultsScreen>}
                </HomeStack.Screen>
                
                <HomeStack.Screen
                    name="CompareScreen"
                    options={{headerShown: false}}
                >
                    {props => <CompareScreen {...props} 
                                removeFromSelectedProjects={this.removeFromSelectedProjects}
                                selectedProjects={this.state.selectedProjects}
                                navigation={this.props.navigation}
                                compareCount={this.state.selectedProjects.length}>
                                </CompareScreen>}
                </HomeStack.Screen>

            </HomeStack.Navigator>
        )
    }
}

export default HomeScreenStack;