import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './modules/Dashboard/Dashboard';
import Login from './modules/Login/Login';
import useToken from './api/hooks/useToken';

function App() {
  const { token, setToken } = useToken();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          {token && (
            <>
              <Route path="/dashboard/*" element={<Dashboard />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;