
import Login from './LoginPage/login';
import { HashRouter as Main,Route,Routes } from 'react-router-dom';
import Controls from './Components/Controls';
import { useEffect } from 'react';


function App() {
  useEffect(() => {
    document.title = 'DigitalExcel'; // Set the desired title
  }, []);
  return (
    <div>
    <Main>
        <Routes>
            <Route exact path="/" element={ <Login/>} />
            <Route exact path="/ControlsPage" element={<Controls/>} />

        </Routes>
    </Main>
    </div>
  );
}

export default App;
