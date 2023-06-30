import './App.css';
import { AuthProvider } from './Contexts/AuthContext';
import Main from './Main';
import './App.css';

function App() {
  return (
    <div className="App">
        <AuthProvider>
            <Main />
        </AuthProvider>
    </div>
  );
}

export default App;
