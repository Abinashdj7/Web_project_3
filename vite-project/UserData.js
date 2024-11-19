export const usersData = (user) => {
    const dataContainer = document.createElement("div");
    dataContainer.classList.add("data-container");

    const ul = document.createElement('ul');

    const nameLi = document.createElement('li');
    nameLi.innerText = `Name: ${user.name}`;
    ul.appendChild(nameLi);

    const emailLi = document.createElement('li');
    emailLi.innerText = `Email: ${user.email}`;
    ul.appendChild(emailLi);

    const ageLi = document.createElement('li');
    ageLi.innerText = `Age: ${user.age}`;
    ul.appendChild(ageLi);

    dataContainer.appendChild(ul);

    return dataContainer;
};
