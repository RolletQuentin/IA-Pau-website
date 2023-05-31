import React from "react";
import NavbarOffset from "../../NavbarOffset";
import SignupForm from "../Signup";

const ProfileForm = () => {
    return (
        <>
            <NavbarOffset />
            <SignupForm
                title="Profil"
                icon={true}
                buttonText="Enregistrer"
                firstAuth={false}
            />
        </>
    );
};

export default ProfileForm;
