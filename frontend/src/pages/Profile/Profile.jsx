import { useEffect, useState } from "react";
import { ProfileCard } from "./components/profileCard";
import { ProfileEditForm } from "./components/profileForm";
import cls from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

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