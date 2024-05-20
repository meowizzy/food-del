import { useContext } from "react";
import { StoreContext } from "../../../../Context/StoreContext";
import { useForm } from "react-hook-form";
import { ButtonUI, ButtonUITheme } from "../../../../components/ui/ButtonUI";
import cls from "./ProfileForm.module.css";

export const ProfileEditForm = ({ setReadonly }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { profileData: { data, isLoading }, updateProfileData } = useContext(StoreContext);

    const onSubmit = (data) => {
        updateProfileData(data);
    };

    const onCancel = () => {
        setReadonly(true);
    };

    return (
        <>
            <ButtonUI   
                text="Go back"
                className={cls.cancelBtn}
                theme={ButtonUITheme.SECONDARY}
                onClick={onCancel}
            />
            <div className={cls.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={cls.formField}>
                        <label>
                            <span className={cls.formFieldLabel}>Name</span>
                            <input 
                                defaultValue={data?.name}
                                {...register("name", { required: true })} 
                            />
                            { errors.name && <span className={cls.error}>This field is required</span> }
                        </label>
                    </div>
                    <div className={cls.formField}>
                        <label>
                            <span className={cls.formFieldLabel}>Email</span>
                            <input 
                                defaultValue={data?.email}
                                {...register("email", { required: true })}
                            />
                            { errors.email && <span className={cls.error}>This field is required</span> }
                        </label>
                    </div>
                    <div className={cls.formField}>
                        <label>
                            <span className={cls.formFieldLabel}>Phone</span>
                            <input 
                                defaultValue={data?.phone}
                                {...register("phone")} 
                            />
                        </label>
                    </div>
                    <div className={cls.formField}>
                        <label>
                            <span className={cls.formFieldLabel}>Street</span>
                            <input 
                                defaultValue={data?.street}
                                {...register("street")} 
                            />
                        </label>
                    </div>
                    <div className={cls.formField}>
                        <label>
                            <span className={cls.formFieldLabel}>City</span>
                            <input 
                                defaultValue={data?.city}
                                {...register("city")} 
                            />
                        </label>
                    </div>
                    <div className={cls.formField}>
                        <label>
                            <span className={cls.formFieldLabel}>State</span>
                            <input 
                                defaultValue={data?.state}
                                {...register("state")} 
                            />
                        </label>
                    </div>
                    <div className={cls.formField}>
                        <label>
                            <span className={cls.formFieldLabel}>Country</span>
                            <input 
                                defaultValue={data?.country}
                                {...register("country")} 
                            />
                        </label>
                    </div>
                    <div className={cls.formField}>
                        <label>
                            <span className={cls.formFieldLabel}>ZIP Code</span>
                            <input 
                                defaultValue={data?.zipCode}
                                {...register("zipCode")} 
                            />
                        </label>
                    </div>
                    <ButtonUI   
                        text="Submit"
                        className={cls.submitBtn}
                        theme={ButtonUITheme.PRIMARY}
                        isLoading={isLoading}
                    />
                </form>
            </div>
        </>
    );
};