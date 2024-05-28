import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileCard } from "./components/profileCard";
import { ProfileEditForm } from "./components/profileForm";
import cls from "./Profile.module.css";


export const Profile = () => {
    const [readonly, setReadonly] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/');
        }
    }, []);

    if (readonly) {
        return (
            <>
                <h1>Profile</h1>  
                <div className={cls.pageWrapper}>
                    <ProfileCard setReadonly={setReadonly}/> 
                </div>
            </>
        );
    }

    return (
        <>
            <h1>Editing profile</h1>  
            <div className={cls.pageWrapper}>
                <ProfileEditForm setReadonly={setReadonly}/> 
            </div>
        </>
    );
};