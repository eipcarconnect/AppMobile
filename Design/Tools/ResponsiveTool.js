import {Dimensions, PixelRatio} from 'react-native';

const widthPercentage = widthPercent => {
    const screenWidth = Dimensions.get('window').width;
    // Convert string input to decimal number
    const elemWidth = parseFloat(widthPercent);
  
    return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};
  
const heightPercentage = heightPercent => {
    const screenHeight = Dimensions.get('window').height;
    // Convert string input to decimal number
    const elemHeight = parseFloat(heightPercent);

    return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};
  
  export {
    widthPercentage,
    heightPercentage
  };