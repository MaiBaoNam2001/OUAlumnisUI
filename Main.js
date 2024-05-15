import { MD3DarkTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import App from "./App";

const theme = {
    ...DefaultTheme,
};

const Main = () => {
    return (
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
    );
}

export default Main;