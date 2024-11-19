import { CardComponent } from "./CardComponent";
import "./style.css";


const apiUrl = "http://localhost:3000/users"; 


const app = document.getElementById("app");


const fetchAndRenderUsers = async () => {
    try {
        
        const response = await fetch(apiUrl);

       
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        
        const users = await response.json();

        
        app.innerHTML = '';

        
        users.forEach((user) => {
            const userCard = CardComponent(user, fetchAndRenderUsers);  
            app.appendChild(userCard); 
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};


fetchAndRenderUsers();
