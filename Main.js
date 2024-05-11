import { MD3DarkTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import App from "./App";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import UserInfoScreen from "./screens/UserInfoScreen/UserInfoScreen";
import AlumniRegisterScreen from "./screens/Auth/AlumniRegisterScreen/AlumniRegisterScreen";
import MenuScreen from "./screens/MenuScreen/MenuScreen";
import CoverImageChangeScreen from "./screens/CoverImageChangeScreen/CoverImageChangeScreen";

const theme = {
    ...DefaultTheme,
};

const Main = () => {
    return (
        <PaperProvider theme={theme}>
            <App />
            {/* <CoverImageChangeScreen /> */}
        </PaperProvider>
    );
}

export default Main;