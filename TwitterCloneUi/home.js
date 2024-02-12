let navlist = document.querySelectorAll('.navlist');
let profileSection = document.querySelector('.profile-main');
let timelineSection = document.querySelector('.timeline-main');

async function activeLink() {
    for (let j = 0; j < navlist.length; j++) {
        navlist[j].classList.remove('active');
    }
    this.classList.add('active');

    // Hide both sections by default
    profileSection.style.display = 'none';
    timelineSection.style.display = 'none';

    // Determine which section to display based on the clicked icon
    if (this === navlist[1]) { 
        profileSection.style.display = 'block';
        await displayUserPosts();
    }
    else if (this === navlist[0]) { 
        timelineSection.style.display = 'block';
        await displayUserAndFollowingPosts();
    }
}

navlist.forEach((item) =>
    item.addEventListener('click', activeLink));



//navigation bar: user-popup
let navUser = document.querySelector('.nav-user');
let userPopup = document.querySelector('.user-popup');
let showTriangle = document.querySelector('.triangle');

navUser.onclick = function(){
    userPopup.classList.toggle('active')
    showTriangle.classList.toggle('active')
}

//interactive button container
let viewpost = document.querySelector('.btn-container.viewpost');

viewpost.addEventListener('click', function() {
    viewpost.classList.toggle('active');
    if (viewpost.classList.contains('active')) {
        viewpost.style.pointerEvents = 'none';
    } else {
        viewpost.style.pointerEvents = 'auto'; 
    }
});

// script when icon down/up is clicked
const moreIcon = document.querySelectorAll('.fa-solid.fa-caret-down');
moreIcon.forEach(icon => {
    icon.addEventListener('click', function() {
        // changes the icon
        if (this.classList.contains('fa-caret-down')) {
            this.classList.remove('fa-caret-down');
            this.classList.add('fa-caret-up');
        } else {
            this.classList.remove('fa-caret-up');
            this.classList.add('fa-caret-down');
        }
        
        // shows and/or hides elements
        const moreElement = this.parentElement.nextElementSibling;
        moreElement.classList.toggle('show');
    });
});


const buttons = document.querySelectorAll('.btn-container.viewpost .btn');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.active === 'false') {
      button.dataset.active = 'true';
      button.classList.add('active');
    } else {
      button.dataset.active = 'false';
      button.classList.remove('active');
    }
  });
});


//check input
function checkInput() {
    var textarea = document.getElementById('userPost');
    var postButton = document.getElementById('postbtn');
    var counter = document.getElementById('counter');

    var remainCharacters = 255 - textarea.value.length;
    counter.textContent = remainCharacters;


    if (remainCharacters < 0) {
        counter.style.color ='#c1121f';
        postButton.disabled = true;
    } else if (textarea.value.length === 0 || textarea.value.length > 255) {
        postButton.disabled = true;
    } else {
        counter.style.color = '';
        postButton.disabled = false;
    }
}

var textarea = document.getElementById('userPost');
textarea.addEventListener('input', checkInput);

var currentToken = localStorage.getItem('token');
var currentUser = localStorage.getItem('currentUser');

async function displayUsers() {
    const jsonFilePath = '../TEMP/USERS.json'; 
    try {
        // Fetch JSON data asynchronously
        const response = await fetch(jsonFilePath);
        const jsonData = await response.json();

        console.log(jsonData);
        const usersContainer = document.querySelector('.tofollow-user');
        usersContainer.innerHTML = ""; // Clear previous content

        // Loop through each user in the JSON data
        for (const username in jsonData) {
            if (jsonData.hasOwnProperty(username)) {
                const user = jsonData[username];

                // Create HTML elements for each user
                usersContainer.innerHTML += `
                    <div class="user-container">
                    <img src="img/user-icon-black.png"id="user-img" class="user-post-pfp"> 
                        <div class="user-name">${user.username}</div>
                        <div class="buttons-container">
                            <button class="follow-button" onclick="followUser('${user.username}')">Follow</button>
                            <button class="unfollow-button" onclick="unfollowUser('${user.username}')">Unfollow</button>
                        </div>
                    </div>
                `;
            }
        }
    } catch (error) {
        console.error('Error fetching or parsing JSON data:', error);
    }
}

async function followUser(toFollow) {
    try {
        const res = await fetch(`http://localhost:3000/api/v1/users/${currentUser}/following/${toFollow}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentToken}`
        }
        });

        if (res.ok) {
        console.log(`Now following: ${toFollow}`);
        } else {
        const errorMessage = await res.text();
        console.error(`Error following user: ${errorMessage}`);
        }

    } catch (error) {
        console.error('Error following user:', error);
    }
}

async function unfollowUser(toUnfollow) {
    try {
        const res = await fetch(`http://localhost:3000/api/v1/users/${currentUser}/following/${toUnfollow}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentToken}`
        }
    });

        if (res.ok) {
        console.log(`Unfollowed: ${toUnfollow}`);
        } else {
        const errorMessage = await res.text();
        console.error(`Error unfollowing user: ${errorMessage}`);
        }

    } catch (error) {
        console.error('Error unfollowing user:', error);
    }
}

async function NewPost() {
    var getNewPost = document.getElementById('userPost').value;
    try {
        const res = await fetch("http://localhost:3000/api/v1/posts", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${currentToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: getNewPost
            })
        });

        console.log(await res.text());
        // After posting, refresh the posts
        await displayUserAndFollowingPosts(); // add as well another function for displaying all following posts
    } catch (error) {
        console.error('Error posting:', error);
    }
}

async function displayUserAndFollowingPosts() {
    console.log("Display Posts was called")
    const postsContainer = document.querySelector('.feed-container');
    // Clear previous posts
    postsContainer.innerHTML = `
    <div class="post-container" id="top-post-container">
        <div class="content-post">
            <img src="img/user-icon-black.png"id="user-img"><span id="username">${currentUser}</span>
            <textarea name="user-post" id="userPost" placeholder="What's on your mind?" cols="30" rows="5"  oninput="checkInput()"></textarea>
            </div>
            <div class="btn-container">
            <button><i class="fa fa-image"></i></button> 
            <button><i class="fa fa-giphy" id="gif">GIF</i></button>
            <button><i class="fa fa-bar-chart"></i></button>
            <button><i class="fa fa-smile-o"></i></button>
            <button><i class="fa fa-calendar"></i></button>
            <button><i class="fa fa-map-marker"></i></button>
            <span id="counter">255</span>
            <div id="boxPost" class="outer-btn">
                <div class="inner-btn"></div>
                <button class="post-btn" id="postbtn" onclick="NewPost()" disabled>
                <i class="fa fa-pencil" aria-hidden="true"></i>
                <span class="bold-text">Post</span>
                </button>
            </div>
        </div>
    </div>
    `;

    try {
        const res = await fetch("http://localhost:3000/api/v1/posts", {
            headers: {
                'Authorization': `Bearer ${currentToken}`
            }
        });

        if (!res.ok) {
            console.error(`Error fetching posts: ${res.status} ${res.statusText}`);
            // Handle the error here, for example, display an error message to the user.
            return;
        }
        const posts = await res.json();

        console.log(posts);
        console.log(posts.id);
        postsContainer.innerHTML += posts.map(post => `
            <div class="post-container">
                <div class="content-post">
                    <div class="post-header">
                        <img src="img/userphoto1.jpg" id="userphoto-img">
                        <span id="username">${post.postedBy}</span>
                        <span id="timePosted">${post.dateTimePosted}</span>
                    </div>
                    <div class="post-text">
                        ${post.content}
                    </div>
                </div>
                <div class="btn-container viewpost">
                    <button class="btn" data-active="false"><i class="fa fa-comment" aria-hidden="true"></i></button>
                    <button class="btn" data-active="false"><i class="fa fa-retweet" aria-hidden="true"></i></button>
                    <button class="btn" data-active="false"><i class="fa fa-heart" aria-hidden="true"></i></button>
                    <button class="btn" data-active="false"><i class="fa fa-share-alt" aria-hidden="true"></i></button>
                    <button class="btn" data-active="false"></button>
                </div>
            </div>
        `).join('');
        console.log("Display Post was successful");
        await displayUsers();
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

async function displayUserPosts() {
    const userPostContainer = document.querySelector('.profile-main');
    userPostContainer.innerHTML = `
        <div class="header-pic">
            <img src="img/vespera-header2.jpg">
        </div>
        <div class="profile-container">
            <img src="img/user-icon-black.png">
            <h4>${currentUser}</h4>
            <p>Exploring the mysteries of Vespera 🌌 | Dreaming of new horizons ✨| Seeking new discoveries and forging 
                unforgettable memories 🚀</p>
                <h5><i class="fa fa-calendar"></i> Joined 2024</h5>
            <div class="profile-follows">
                <h5>596</h5>
                <h5>Following</h5>
                <h5>709</h5>
                <h5>Followers</h5>
            </div>
        </div>
    `; // Clear previous posts

    try {
        const res = await fetch(`http://localhost:3000/api/v1/posts?username=${currentUser}`, {
            headers: {
                'Authorization': `Bearer ${currentToken}`
            }
        });

        if (!res.ok) {
            console.error(`Error fetching all following posts: ${res.status} ${res.statusText}`);
            // Handle the error here, for example, display an error message to the user.
            return;
        }

        const posts = await res.json();

        console.log(posts);
        userPostContainer.innerHTML += posts.map(post => `
            <div class="post-container">
                <div class="content-post">
                    <div class="post-header">
                        <img src="img/userphoto1.jpg" id="userphoto-img">
                        <span id="username">${post.postedBy}</span>
                        <span class="post-time">${post.dateTimePosted}</span>
                    </div>
                    <div class="post-text">
                        ${post.content}
                    </div>
                </div>
                <div class="btn-container viewpost">
                    <button class="btn" data-active="false"><i class="fa fa-comment" aria-hidden="true"></i></button>
                    <button class="btn" data-active="false"><i class="fa fa-retweet" aria-hidden="true"></i></button>
                    <button class="btn" data-active="false"><i class="fa fa-heart" aria-hidden="true"></i></button>
                    <button class="btn" data-active="false"><i class="fa fa-share-alt" aria-hidden="true"></i></button>
                    <button class="btn" data-active="false"></button>
                </div>
            </div>
        `).join('');
        await displayUsers();
    } catch (error) {
        console.error('Error fetching all following posts:', error);
    }
}