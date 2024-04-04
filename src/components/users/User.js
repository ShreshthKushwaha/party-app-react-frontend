import React from 'react';


const User = ({ user }) => {
    return (
        <div className="user-card">
            <h2>{user.fname} {user.lname}</h2>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Major:</strong> {user.major}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>About:</strong> {user.about}</p>
            <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
            <p><strong>Zip:</strong> {user.zip}</p>
        </div>
    );
};

export default User;