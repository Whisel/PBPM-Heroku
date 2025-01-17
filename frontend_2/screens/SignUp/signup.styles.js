import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    
    background:{
        flex: 1,
        backgroundColor:'#006FD6'
    },
    
    container: {
        flexGrow : 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },

    title: {
        alignSelf: 'center'
    },

    inputText: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        color: '#FFFFFF'
    },

    inputRow: {
        flexDirection: "row"
    },

    inputBox: {
        width: 300
    },

    signUpButton: {
        marginTop: 30,
        width: 300,
        backgroundColor: '#DEBD07'
    },

    signUpText: {
        color: '#091C7A',
        fontSize: 20,
        fontWeight: '600',
    },

    backButton: {
        marginTop: 15,
    },

    backText: {
        color: '#f44336',
        fontSize: 20
    },

    backTextPressed: {
        color: '#FFFFFF',
        fontSize: 20
    },

    forgotText: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center'
    },

    forgotTextPressed: {
        color: '#000000',
        fontSize: 18,
        textAlign: 'center'
    },

    modalBackgroundStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    invalidText: {
        color: '#FF3D71',
        fontSize: 20,
        marginBottom: 10
    },
    
    errorMsg:{
        color: '#FF3D71'
    }
});

export default styles;