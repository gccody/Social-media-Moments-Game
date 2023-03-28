import AsyncStorage from "@react-native-async-storage/async-storage";

const setItem = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {}
}
const getItem = async (key: string) => {
  try {
    const item: string | null = await AsyncStorage.getItem(key);

    return item ? JSON.parse(item) : undefined;
  } catch (error) {}
}
const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {}
}
const updateItem = async (key: string, value: any) => {
  try {
    const item = await AsyncStorage.getItem(key);
    if (!item) return;
    const result = {...JSON.parse(item), ...value};

    await AsyncStorage.setItem(key, JSON.stringify(result));
  } catch (error) {}
}

export {setItem, getItem, removeItem, updateItem};