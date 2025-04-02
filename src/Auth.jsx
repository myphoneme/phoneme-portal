import { SignedIn, SignedOut, SignIn, UserButton,  useClerk  } from "@clerk/clerk-react";
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import UserProfile from "./User";
import { useEffect } from "react";

function Auth() {
    const navigate = useNavigate();
    const { isLoaded, user, signOut } = useClerk();  // Access Clerk's user object and signOut function

    // Redirect after sign-in
    // const handleSignInSuccess = () => {
    //     navigate('/home'); // Redirect to /home after successful sign-in
    // };

    useEffect(() => {
        if (localStorage.getItem("clerk-sign-in")) {
            navigate("/home");
        }
    }, [navigate]);


    // Redirect after sign-out
    // const handleSignOut = () => {
    //     signOut(); // Sign the user out
    //     navigate('/'); // Redirect to the landing page after sign-out
    // };


    return (
        <div className="custom-container" >
            {/* <SignedIn>
                <div className="flex flex-col items-center gap-4">
                <h1>Welcome! Redirecting...</h1> */}
                    {/* <h1>Welcome, You are signed in!</h1> */}
                    {/* <UserButton /> */}
                    {/* <UserProfile/> */}
                    {/* {navigate('/home')} */}
                {/* </div>
            </SignedIn> */}
             <SignedIn>
                {() => {
                    localStorage.setItem("clerk-sign-in", "true"); // Store login state
                    navigate("/home"); // Redirect after sign-in
                    return <h1>Redirecting to Home...</h1>;
                }}
            </SignedIn>

            <SignedOut>
                <SignIn afterSignInUrl="/home" /> {/* ✅ Fix: Redirecting after login */}
            </SignedOut>
        </div>
    );
}

export default Auth;