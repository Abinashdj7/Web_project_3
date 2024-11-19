import "./userActions.css";
import { actionButton } from "./actionButton";
import edit from "./edit-512.jpg";
import trash from "./1214428.png";


export const usersActions = (userId, refreshUserList) => {
    const actionsContainer = document.createElement("div");
    actionsContainer.classList.add("actions-container");

    
    const editUser = async () => {
        const newName = prompt("Enter new name:");
        const newEmail = prompt("Enter new email:");
        const newAge = prompt("Enter new age:");

        if (newName && newEmail && newAge) {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: newName,
                        email: newEmail,
                        age: newAge
                    }),
                });
                const data = await response.json();
                if (response.ok) {
                    console.log("User updated successfully:", data);
                    refreshUserList(); 
                } else {
                    console.error("Failed to edit user:", data);
                }
            } catch (error) {
                console.error("Error editing user:", error);
            }
        }
    };

  
    const deleteUser = async () => {
        const confirmDelete = confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}`, {
                    method: 'DELETE',
                });
                const data = await response.json();
                if (response.ok) {
                    console.log("User deleted successfully:", data);
                    refreshUserList();
                } else {
                    console.error("Failed to delete user:", data);
                }
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };


    const buttonOne = actionButton(
        "https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png",
        "warning-btn",
        editUser
    );
    const buttonTwo = actionButton(
        "https://cdn-icons-png.flaticon.com/512/1214/1214428.png",
        "danger-btn",
        deleteUser
    );

    actionsContainer.appendChild(buttonOne);
    actionsContainer.appendChild(buttonTwo);

    return actionsContainer;
};
