import AsyncStorage from '@react-native-community/async-storage';

export const save = async (key, value) => {
            try {
                await AsyncStorage.setItem(key, value)
            } catch (error) {
                console.error(error)
            }
        }

export const getSaved = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            // We have data!!
            return value;
        }
        else
            return 'none';
    } catch (error) {
        // Error retrieving data
        console.error(error);
    }
}

export const deletSaved = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
