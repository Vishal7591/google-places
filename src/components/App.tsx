import "./App.scss";
import { Provider } from "react-redux";
import { store } from "./../store/configureStore";
import { MapComponent } from "./MapComponent";

function App() {
  return (
    <Provider store={store}>
      <MapComponent />
    </Provider>
  );
}

export default App;
