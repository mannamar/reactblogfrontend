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
    let response = await fetch(`https://amarblogapi.azurewebsites.net/User/UserByUsername/${username}`);
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

function checkToken() {
    let result = false;
    let lsData = localStorage.getItem('Token');
    if (lsData != null) {
        result = true;
    }
    return result;
}

function loggedInData() {
    return userData;
}

async function addBlogItem(blogItem) {
    const response = await fetch('https://amarblogapi.azurewebsites.net/blog/addblogitem', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogItem)
    });

    if(!response.ok) {
        const message = `An error has occured ${response.status}`;
        throw new Error(message);
    }

    let data = await response.json();
    console.log(data);
    return data;
}

async function getBlogItemsByUserId(userId) {
    let res = await fetch(`https://amarblogapi.azurewebsites.net/Blog/GetItemsByUserId/${userId}`);
    let data = res.json();
    return data;
}

async function updateBlogItem(blogItem) {
    const response = await fetch('https://amarblogapi.azurewebsites.net/blog/UpdateBlogItem', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogItem)
    });

    if(!response.ok) {
        const message = `An error has occured ${response.status}`;
        throw new Error(message);
    }

    let data = await response.json();
    console.log(data);
    return data;
}

export { createAccount, login, getLoggedInUserData, getPublishedBlogItems, checkToken, loggedInData, addBlogItem, getBlogItemsByUserId, updateBlogItem };