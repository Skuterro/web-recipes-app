import './App.css';
import { Routing } from "./router/Routing";
import { AuthProvider } from './providers/AuthProvider';
function App() {
  return (
    <AuthProvider>
      <Routing/>
    </AuthProvider>
  );
}

export default App;
