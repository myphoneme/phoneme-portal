// import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
// import './Auth.css';

// function Auth() {
//     return (
//         <div className="custom-container" >
//             <SignedIn>
//                 <div className="flex flex-col items-center gap-4">
//                     <h1>Welcome, You are signed in!</h1>
//                     <UserButton />
//                 </div>
//             </SignedIn>

//             <SignedOut>
//                 <SignIn />
//             </SignedOut>
//         </div>
//     );
// }

// export default Auth;


import { SignedIn, SignedOut, SignIn, SignUp, UserButton, useUser } from "@clerk/clerk-react";
import './Auth.css';
import UserProfile from './User';

function Auth() {
    const { user } = useUser();

    return (
        <div className="custom-container">
            <SignedIn>
                <div className="flex flex-col items-center gap-4">
                    <h1>Welcome, You are signed in!</h1>
                    <p>Your User ID: {user?.id}</p>
                    <UserButton />
                </div>
            </SignedIn>

            <SignedOut>
                <UserProfile />
                <div className="flex flex-col items-center gap-4">
                    <SignIn routing="path" path="/sign-in" />
                    <SignUp routing="path" path="/sign-up" />
                </div>
            </SignedOut>
        </div>
    );
}

export default Auth;