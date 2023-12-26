import React,{useState} from 'react';
import './LoginPage.css'; // You can create a separate CSS file for styling
import loginImg from '../assets/2672335.jpg'
const LoginPage = ({setLogin}) => {
const [formData, setFormData] = useState({
  password:'',
  username:''
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({ ...prevData, [name]: value }));
};

const HandleSubmit=(e)=>{
  setLogin(true);
e.preventDefault();

}
document.title="Login";

  return (
    <div className="col-5">
      <div className="content-container">
        <div className="image-container">
          <img src={loginImg} alt='login' />
        </div>
        <div className="form-container">
          <h2>Login</h2>
          <form  className='col-2'>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input className='form-control' onChange={handleChange} value={formData.username} type="text" id="username" name="username" placeholder="Enter your username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input value={formData.password} onChange={handleChange} type="password" id="password" name="password" placeholder="Enter your password" />
            </div>
            <input value={"Login"} onClick={HandleSubmit} className='btn' type="submit"/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
