import './Profile.css';

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return (
            <div className="profile-container">
                <h2 className="profile-title">Профиль</h2>
                <p style={{ textAlign: "center", color: "#777" }}>
                    Пользователь не авторизован.
                </p>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <h2 className="profile-title">Профиль пользователя</h2>
            <div className="profile-info">
                <p><strong>Имя пользователя:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
        </div>
    );
}

export default Profile;
