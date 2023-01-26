const usersDiv = document.querySelector("#users");
console.log("This is js");
let url = "http://localhost:3000/users";
// fetch(url)
//     .then((res) => {
//         return res.json();
//     })
//     .then((data) => {
//         console.log(data);
//     });

const getUsers = async () => {
    const res = await fetch(url);
    const users = await res.json();
    console.log(users);
    for (let i = 0; i < users.length; i++) {
        usersDiv.innerHTML += `  <div>
        id : ${users[i].id} <br/>
        name : ${users[i].name}
      </div>`;
    }
};
getUsers();

const user = async (name1) => {
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(name1),
    });
    const status = await response.json();
    console.log(response);
};

const submit = () => {
    const name = document.querySelector("#name");
    const name1 = { name: name.value };
    user(name1);
};
