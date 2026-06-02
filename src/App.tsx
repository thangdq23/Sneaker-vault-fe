import { Provider } from "react-redux";
import { store } from "./store";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </Provider>
  );
}

export default App;
