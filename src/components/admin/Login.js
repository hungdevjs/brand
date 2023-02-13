import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

import useAdmin from '@/hooks/useAdmin';

const Login = () => {
  const { login } = useAdmin();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const changeLoginData = (values) => setLoginData({ ...loginData, ...values });

  return (
    <Box p={2} display="flex" flexDirection="column" gap={2}>
      <TextField
        variant="outlined"
        label="Email"
        value={loginData.email}
        onChange={(e) => changeLoginData({ email: e.target.value })}
      />
      <TextField
        type="password"
        variant="outlined"
        label="Password"
        value={loginData.password}
        onChange={(e) => changeLoginData({ password: e.target.value })}
      />
      <Button onClick={() => login(loginData)}>Login</Button>
    </Box>
  );
};

export default Login;
