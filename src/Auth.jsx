import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import './Auth.css';
import UserProfile from "./User";

function Auth() {
    return (
        <div className="custom-container" >
            <SignedIn>
                <div className="flex flex-col items-center gap-4">
                    <h1>Welcome, You are signed in!</h1>
                    <UserButton />
                    <UserProfile/>
                </div>
            </SignedIn>

            <SignedOut>
                <SignIn />
            </SignedOut>
        </div>
    );
}

export default Auth;