
import { useUser } from "@clerk/clerk-react";

const UserProfile = () => {
    const { user } = useUser();

    if (!user) {
        return <p>Loading...</p>;
    }

    return <h2>Signed-in User ID: {user.id}</h2>;
};

export default UserProfile;