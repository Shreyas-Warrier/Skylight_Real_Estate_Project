import { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import shareVideo from '../assets/share.mp4'

const Register = () =>
{
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange  = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    }

    const handleSubmit  =async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                navigate('/login');
            } else {
                console.error('Registration Failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center relative">
      <video
            src={shareVideo}  
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className='absolute inset-0 w-full h-full object-cover z-0'
          />
      <div className="absolute inset-0 bg-black bg-opacity-75"></div>
      <div className="relative z-10 w-full max-w-md p-6 bg-white bg-opacity-90 rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-4">

            <h2 className='text-2xl font-bold mt-2'>Register</h2>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
            />
          </div>
          <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Name</label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='name'
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder='Name'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='email'
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='Email'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>Password</label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  id='password'
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder='Password'
                />
              </div>
          <div className="mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link
            to="/login"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
      );
}

export default Register