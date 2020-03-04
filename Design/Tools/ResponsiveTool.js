import {Dimensions, PixelRatio, StatusBar} from 'react-native';
import { bool } from 'prop-types';

const widthPercentage = widthPercent => {
    const screenWidth = Dimensions.get('window').width;
    // Convert string input to decimal number
    const elemWidth = parseFloat(widthPercent);
    // console.log("\nWindows Width =" + Dimensions.get("window").width);
    // console.log("\nScreen Width =" + Dimensions.get("screen").width);
    return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};
  
const heightPercentage = heightPercent => {
    const screenHeight = Dimensions.get('screen').height - (Dimensions.get('screen').height - (Dimensions.get('window').height + StatusBar.currentHeight));
    // Convert string input to decimal number
    const elemHeight = parseFloat(heightPercent);
    // console.log("\nWindows Height =" + Dimensions.get("window").height);
    // console.log("\nScreen Height =" + Dimensions.get("screen").height);
    // console.log("\nStatus Bar = " + StatusBar.currentHeight)
    return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};
  
export {
  widthPercentage,
  heightPercentage
};

  //Usage:
  //width: widthPercentage('53%')
  //height: heightPercentage('19%')