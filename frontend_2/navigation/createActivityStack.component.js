import React, { useState, useEffect, useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IndexPath } from '@ui-kitten/components';
import { IntialForm } from '../screens/Collaborate/CreateActivityForm/intialInformation.component';
import { SelectLocation } from '../screens/Collaborate/CreateActivityForm/setLocation.component';
import { CreateStandingPoints } from '../screens/Collaborate/CreateActivityForm/createStandingPoints.component';
import { CreateTimeSlots } from '../screens/Collaborate/CreateActivityForm/createTimeSlots.component';

const { Navigator, Screen } = createStackNavigator();

export function CreateActivityStack(props) {

  // List of activity types
  const activityTypes = [...props.activityTypes];
  // these are the activites that require standing points to be defined
  const activitesRequirePoints = ['Stationary Map', 'People Moving'];

  // This is the unique name the user gives the Activity
  const [activityName, setActivityName] = useState('');

  // This is the index of the selected Activity from the lsit of activityTypes
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(new IndexPath(0));

  // Only use the Day from this value, this is the date the user selects for the Activity to take place
  const [date, setDate] = useState(new Date());

  // This is a list of all of the Time Slot Cards for the activity day
  const [timeSlots, setTimeSlots] = useState([]);

  // This is the list of points, the user can set to reccomend where a researcher stands
  const [standingPoints, setStandingPoints] = useState([]);
  // This boolean identitifies whether or not standing points are required for this type of activity
  const [pointsRequired, setPointsRequired] = useState(true);

  // This is the selected sub area
  const [area, setArea] = useState(props.project.subareas[0].area);
  // This boolean is used to determine if there's more than 1 sub area for the user to choose from
  // if there's only 1 sub area, then they don't need to select a sub location
  const selectArea = (props.project.subareas.length > 1);

  const create = () => {
    // some error checking if they don't fill everything out
    let name = activityName;
    let row = selectedActivityIndex.row;
    if(row == undefined) {
      row = 0;
    }
    if(activityName.length <= 0) {
      name = activityTypes[row];
    }

    // the activity info
    let temp = {
      title: name,
      date: date,
      activity: activityTypes[row],
      timeSlots: timeSlots,
      standingPoints: standingPoints,
      area: area,
    };
    // TODO: POST the activity

    // update activites list
    props.setActivities(activites => [...activites,temp]);

    // Navigate back to Project page
    props.navigation.navigate('ProjectPage')
  };

  const setSelectedActivity = (index) => {
    setSelectedActivityIndex(index);
    let tempName = activityTypes[index.row];

    if(activitesRequirePoints.includes(tempName)){
      setPointsRequired(true);
    } else {
      setPointsRequired(false);
    }
  };

  return (
    <Navigator headerMode='none'>
      <Screen name='IntialForm'>
        {props =>
          <IntialForm
            {...props}
            activityName={activityName}
            setActivityName={setActivityName}
            selectedActivityIndex={selectedActivityIndex}
            setSelectedActivity={setSelectedActivity}
            date={date}
            setDate={setDate}
            activityTypes={activityTypes}
            selectArea={selectArea}
            pointsRequired={pointsRequired}
          />
        }
      </Screen>
      <Screen name='SelectLocation'>
        {props =>
          <SelectLocation
            {...props}
            area={area}
            setArea={setArea}
            pointsRequired={pointsRequired}
          />
        }
      </Screen>
      <Screen name='CreateStandingPoints'>
        {props =>
          <CreateStandingPoints
            {...props}
            area={area}
            standingPoints={standingPoints}
            setStandingPoints={setStandingPoints}
          />
        }
      </Screen>
      <Screen name='CreateTimeSlots'>
        {props =>
          <CreateTimeSlots
            {...props}
            timeSlots={timeSlots}
            setTimeSlots={setTimeSlots}
            standingPoints={standingPoints}
            create={create}
          />
        }
      </Screen>
    </Navigator>
  );
};