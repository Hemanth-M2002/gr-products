import { BrowserRouter, Route, Routes } from "react-router-dom";
//import { Provider } from 'react-redux'; // Make sure this is imported
import Dash from './Dash';
//import store from './Store/index';

function App() {
  return (
   // <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/dash" element={<Dash />} />
        </Routes>
      </BrowserRouter>
    //</Provider>
  );
}

export default App;
