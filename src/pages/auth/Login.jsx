import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { login } from '../../services/authApi';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        try{
            await loginUser({ username, password });
            navigate('/');
            }
        catch (error) {
            console.error('Login failed:', error);
        }
     }
  return (
    <div className='min-h-screen flex items-center justify-center'>

        <form onSubmit={handleLogin} className='flex w-full max-w-sm border border-white/20 rounded-3xl shadow-2xl p-10 flex-col gap-4' >
            <h1 className='text-center font-bold text-[20px]'>Welcome to the login Page</h1>
            <div>
                <div className='mb-2 block'>
                    <label htmlFor="name">Your Name</label>
                </div>
                <TextInput type="text" id='namae' placeholder='Enter your username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required />
            </div>
            <div>
                <div className='mb-2 block'>
                    <label htmlFor="password">Your Password</label>
                </div>
                <TextInput type="password" id='password' placeholder='Enter you password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required  />
            </div>
            <div className='flex items-center gap-2'>
                <Checkbox id='remember'></Checkbox>
                <label htmlFor="remember">Remember me</label>
            </div>
            <Button type="submit">Login</Button>
            <NavLink to="/">Back to home page</NavLink>
        </form>

    </div>
  )
}
