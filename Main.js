import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3DarkTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import App from "./App";

const theme = {
    ...DefaultTheme,
};

const Main = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider theme={theme}>
                <BottomSheetModalProvider>
                    <App />
                </BottomSheetModalProvider>
            </PaperProvider>
        </GestureHandlerRootView>
    );
}

export default Main;