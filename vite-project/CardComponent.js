import { CardImage } from "./CardImage";
import { usersData } from "./UserData";
import { usersActions } from "./UserActions";

export const CardComponent = (user, refreshUserList) => {
    const card = document.createElement("article");
    card.classList.add("card");

    card.appendChild(CardImage()); 
    card.classList.add("card-image");

  
    card.appendChild(usersData(user));

    card.appendChild(usersActions(user.id, refreshUserList));

    return card;
};
