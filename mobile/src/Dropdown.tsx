// import React, { Props } from 'react';
// import {
//   Button,
//   Text,
//   TextInput,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   TouchableWithoutFeedback,
//   View,
// } from 'react-native';
// import RNPickerSelect from "react-native-picker-select";
// import defaultStyles from 'react-native-picker-select';
// // import RNPickerSelect, { defaultStyles } from './debug';

// interface AppState {
//     numbers: {
//         lable: string,
//         value: number,
//         color: string,
//     }
// }

// interface AppProps {
//     label: string;
//     value: number;
//     color: string;
// }


// export default class App extends React.Component<AppProps, AppState> {
//   constructor(props: AppState) {
//     super(props);

//     this.state = {
//       numbers : [
//         {
//           label: '1',
//           value: 1,
//           color: 'orange',
//         },
//         {
//           label: '2',
//           value: 2,
//           color: 'green',
//         },
//       ],
//       favSport0: undefined,
//       favSport1: undefined,
//       favSport2: undefined,
//       favSport3: undefined,
//       favSport4: 'baseball',
//       previousFavSport5: undefined,
//       favSport5: null,
//       favNumber: undefined,
//     };

//     this.InputAccessoryView = this.InputAccessoryView.bind(this);
//   }

//   InputAccessoryView() {
//     return (
//       <View style={defaultStyles.modalViewMiddle}>
//         <Text>Teste</Text>
        
//       </View>
//     );
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <ScrollView
//           style={styles.scrollContainer}
//           contentContainerStyle={styles.scrollContentContainer}>
        
    
//           <Text>custom icon using your own css</Text>
//           {/* and placeholder style changes, showing colors on items, useNativeAndroidPickerStyle={false} */}
//           <RNPickerSelect
//             placeholder={{
//               label: 'Select a number or add another...',
//               value: null,
//               color: 'red',
//             }}
//             items={this.state.numbers}
//             onValueChange={value => {
//               this.setState({
//                 favNumber: value,
//               });
//             }}
//             style={{
//               ...pickerSelectStyles,
//               iconContainer: {
//                 top: 20,
//                 right: 10,
//               },
//               placeholder: {
//                 color: 'purple',
//                 fontSize: 12,
//                 fontWeight: 'bold',
//               },
//             }}
//             value={this.state.favNumber}
//             Icon={() => {
//               return (
//                 <View
//                   style={{
//                     backgroundColor: 'transparent',
//                     borderTopWidth: 10,
//                     borderTopColor: 'gray',
//                     borderRightWidth: 10,
//                     borderRightColor: 'transparent',
//                     borderLeftWidth: 10,
//                     borderLeftColor: 'transparent',
//                     width: 0,
//                     height: 0,
//                   }}
//                 />
//               );
//             }}
//           />
//           <Button
//             title="+1 number to the above list"
//             onPress={() => {
//               const { numbers } = this.state;
//               const value = numbers.length + 1;
//               numbers.push({
//                 label: `${value}`,
//                 value,
//                 color: 'dodgerblue',
//               });
//               this.setState({
//                 numbers,
//               });
//             }}
//           />

//         </ScrollView>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flex: 1,
//     paddingHorizontal: 15,
//   },
//   scrollContentContainer: {
//     paddingTop: 40,
//     paddingBottom: 10,
//   },
// });

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 4,
//     color: 'black',
//     paddingRight: 30, // to ensure the text is never behind the icon
//   },
//   inputAndroid: {
//     fontSize: 16,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderWidth: 0.5,
//     borderColor: 'purple',
//     borderRadius: 8,
//     color: 'black',
//     paddingRight: 30, // to ensure the text is never behind the icon
//   },
// });
