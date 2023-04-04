let userData = {};

async function createAccount(createdUser) {
    const response = await fetch('https://amarblogapi.azurewebsites.net/User/AddUser', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createdUser)
    });

    // Check if no error for duplicate account
    if(!response.ok) {
        const message = `An error has occured ${response.status}`;
        throw new Error(message);
    }

    let data = await response.json();
    console.log(data);
    // POST so no return needed (not getting anything)
}

async function login(loginUser) {
    const response = await fetch('https://amarblogapi.azurewebsites.net/User/Login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginUser)
    });

    // Check if no error for duplicate account
    if(!response.ok) {
        const message = `An error has occured ${response.status}`;
        throw new Error(message);
    }

    let data = await response.json();
    console.log(data);
    return data;
    // POST so no return needed (not getting anything)
}

async function getLoggedInUserData(username) {
    let response = await fetch(`https://amarblogapi.azurewebsites.net/User/GetUserByUsername/${username}`);
    let data = await response.json();
    userData = data;
    console.log(userData);
}

// Gets all published items
async function getPublishedBlogItems() {
    let res = await fetch('https://amarblogapi.azurewebsites.net/Blog/GetPublishedItems');
    let data = res.json();
    return data;
}

export { createAccount, login, getLoggedInUserData, getPublishedBlogItems };