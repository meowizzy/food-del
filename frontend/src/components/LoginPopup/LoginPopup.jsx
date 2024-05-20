import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { baseUrl } from '../../api/constants'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { usePasswordReset } from '../../hooks/usePasswordReset'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import Countdown from 'react-countdown';


const authVariations = {
    LOGIN: "Login",
    REGISTER: "Sign Up",
    RESET_PASSWORD: "Reset password",
    NEW_PASSWORD: "Set new password",
    RESET_PASSWORD_SUCCESS: "A link to reset your password has been sent to your email."
}


const LoginPopup = ({ setShowLogin }) => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const { setToken, url, loadCartData } = useContext(StoreContext)
    const [currState, setCurrState] = useState(authVariations.LOGIN);
    let resetPasswordToken = location.pathname.trim().split("/")[2];
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        password1: ""
    });

    usePasswordReset(() => {
        setCurrState(authVariations.NEW_PASSWORD);
    });

    useEffect(() => {
        setData({
            name: "",
            email: "",
            password: "",
            password1: ""
        });
    }, [currState])

    const submitButtonLabel = () => {
        switch(currState) {
            case authVariations.LOGIN:
                return authVariations.LOGIN;
            case authVariations.REGISTER:
                return "Create an account";
            case authVariations.RESET_PASSWORD:
                return "Submit";
            case authVariations.RESET_PASSWORD_SUCCESS:
                return "Okay!";
            default: return "Submit";
        }
    };

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()
        
        setIsLoading(true);

        let new_url = baseUrl;
        if (currState === authVariations.LOGIN) {
            new_url += "/api/user/login";
        } else if (currState === authVariations.REGISTER) {
            new_url += "/api/user/register"
        } else if (currState === authVariations.NEW_PASSWORD) {
            new_url += "/api/user/resetPassword"
        } else {
            new_url += "/api/user/forgotPassword"
        }

        let response;

        switch(currState) {
            case authVariations.RESET_PASSWORD:
                response = await axios.post(new_url, { email: data.email });
                break;
            case authVariations.NEW_PASSWORD:
                if (data.password !== data.password1) return;
                if (!resetPasswordToken) {
                    toast.error("No token");
                    return;
                }
                response = await axios.post(new_url, { password: data.password, token: resetPasswordToken });
                break;
            case authVariations.LOGIN:
                response = await axios.post(new_url, { email: data.email, password: data.password });
            default:
                response = await axios.post(new_url, data);
        }

        if (response.data.success) {
            if (currState !== authVariations.RESET_PASSWORD && currState !== authVariations.NEW_PASSWORD) {
                setShowLogin(false);
                setToken(response.data.token)
                localStorage.setItem("token", response.data.token)
                loadCartData({ token:response.data.token })
            } else {
                setCurrState(authVariations.RESET_PASSWORD_SUCCESS);
                if (currState === authVariations.NEW_PASSWORD) {
                    navigate("/");
                    setCurrState(authVariations.LOGIN);
                    setShowLogin(true);
                }
            }

            setData({});
            setIsLoading(false);
            toast(response.data.message);
        } else {
            toast.error(response.data.message);
            setIsLoading(false);
        }
    }

    const renderer = useCallback(({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span style={{color: "red"}}>Time to change password has expired!</span>;
        } else {
            return <span>{minutes}:{seconds}</span>;
        }
    }, []);

    const countDown = useMemo(() => {
        return <Countdown date={Date.now() + 100 * 60 * 100} renderer={renderer}/>;
    }, [])

    if (currState === authVariations.RESET_PASSWORD_SUCCESS) {
        return (
            <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div>
                    {currState}
                </div>
                <button onClick={() => setShowLogin(false)} className={isLoading ? "submitBtn isLoading" : "submitBtn"}>{submitButtonLabel()}</button>
            </form>
        </div>    
        )
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
            { currState === authVariations.NEW_PASSWORD ? data.password !== data.password1 && <span style={{color: "red"}}>The entered passwords do not match</span> : "" }
                <div className="login-popup-title">
                    <h2>{currState}</h2> <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === authVariations.NEW_PASSWORD ? countDown : ""}
                    {currState === authVariations.REGISTER ? <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> : <></>}
                    {currState === authVariations.RESET_PASSWORD && <p>Please enter your email. <br/>You will receive a message with a link to change your password to your email.</p>}
                    {
                        currState !== authVariations.NEW_PASSWORD 
                        ? <input 
                            name='email' 
                            onChange={onChangeHandler} 
                            value={data.email} 
                            type="email" 
                            placeholder='Your email' 
                        /> : ""
                    }
                    {
                        currState !== authVariations.RESET_PASSWORD
                        ? <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required /> : ""
                    }
                    {
                        currState === authVariations.NEW_PASSWORD 
                        ? (
                            <>
                                <input name="password1" placeholder='Confirm password' type="password" required onChange={onChangeHandler} value={data.password1} />
                            </>
                        ) : "" 
                    }
                </div>
                <button disabled={currState === authVariations.NEW_PASSWORD && data.password !== data.password1} className={isLoading ? "submitBtn isLoading" : "submitBtn"}>{submitButtonLabel()}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required/>
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? (
                        <>
                            <p>Forgot your password? <span onClick={() => setCurrState('Reset password')}>Reset password</span></p>
                            <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                        </>
                    )
                    : currState !== authVariations.NEW_PASSWORD && currState !== authVariations.RESET_PASSWORD 
                        && <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
