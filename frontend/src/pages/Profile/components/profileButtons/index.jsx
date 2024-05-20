import { useContext } from "react";
import { StoreContext } from "../../../../Context/StoreContext";
import cls from "./ProfileButtons.module.css";
import { useNavigate } from "react-router-dom";
import { ButtonUI, ButtonUITheme } from "../../../../components/ui/ButtonUI";


export const ProfileButtons = (props) => {
    const {
        setReadonly
    } = props;
    const { setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate('/')
    }

    return (
        <div className={cls.buttonsWrapper}>
            <ButtonUI 
                text="Logout"
                className={cls.logoutBtn}
                theme={ButtonUITheme.SECONDARY}
                onClick={logout}
            />
            <ButtonUI 
                text="Edit Profile"
                theme={ButtonUITheme.PRIMARY}
                className={cls.editProfileBtn}
                onClick={() => setReadonly(false)}
            />
        </div>  
    )
};