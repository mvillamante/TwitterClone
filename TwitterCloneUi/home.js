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
        await updateFollowingCount();
        await getFollowing();
        await loadFollowerCount();
        checkProfileMainDisplay();
    }
    else if (this === navlist[0]) { 
        timelineSection.style.display = 'block';
        await displayUserAndFollowingPosts();
        await getFollowing();
        await loadFollowerCount();
        checkProfileMainDisplay();
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

// Interactive button container
let viewpost = document.querySelector('.btn-container.viewpost');

viewpost.addEventListener('click', function(event) {
    viewpost.classList.toggle('active');

    if (!event.target.classList.contains('fa-heart')) {
        if (viewpost.classList.contains('active')) {
            viewpost.style.pointerEvents = 'none';
        } else {
            viewpost.style.pointerEvents = 'auto'; 
        }
    }
});


// For Trends
// script when icon down/up is clicked
const moreIcon = document.querySelectorAll('.fas.fa-caret-down');
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

// If user not interested
const notIntbtn = document.querySelectorAll('.down');
notIntbtn.forEach(button => {
    button.addEventListener('click', function() {
        const btnEvent = this.closest('.btnEvent');
        btnEvent.style.display = 'none';
    });
});

// If user clicks "ekis" button
const ekisBtn = document.querySelectorAll('.ekis');
ekisBtn.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        // Show the popup
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = 'Thank you for your feedback';
        document.body.appendChild(popup);
        
        // Hides the btnEvent
        const btnEvent = this.closest('.btnEvent');
        btnEvent.style.display = 'none';

        // Hides pop up
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 1500);
    });
});

function registerButtonEventListeners() {
    const buttons = document.querySelectorAll('.btn-container.viewpost .btn');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            // Toggle the active state of the clicked button
            button.dataset.active = button.dataset.active === 'false' ? 'true' : 'false';
            button.classList.toggle('active');
        });
    });
}

  


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
var following = [];
var followingCount = 0;
var follower = [];
var followerCount = 0;

/* -------------Likes Portion------------- */
async function ToggleLikePost(ID, Likers) {
    console.log("ToggleLikePost was called");
    try {
        // Assuming currentUser is the username of the logged-in user
        let isLiked = Likers.includes(currentUser);

        const response = await fetch(`http://localhost:3000/api/v1/posts/${ID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentToken}`,
            },
            body: JSON.stringify({ action: isLiked ? 'unlike' : 'like' }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error ${isLiked ? 'unliking' : 'liking'} post: ${errorData.message}`);
            return;
        }

        console.log(`Post ${isLiked ? 'unliked' : 'liked'} successfully!`);


        await displayUserAndFollowingPosts();
        await displayUserPosts();

    } catch (error) {
        console.error(`Error ${isLiked ? 'unliking' : 'liking'} post:`, error);
    }
}

/* -------------Display Users in Follow------------- */
async function displayUsers() {
    const usersContainer = document.querySelector('.tofollow-user');
    usersContainer.innerHTML = ""; // Clear previous content
    console.log("I was called")
    try {
        // Fetch JSON data asynchronously
        const res = await fetch("http://localhost:3000/api/allUsers");
        const allUsernames = await res.json();
        console.log("Full Response:", allUsernames); // for debugging

        // Iterate over each user in the dictionary
        for (const username in allUsernames) {
            if (allUsernames.hasOwnProperty(username)) {
                const user = allUsernames[username];
                usersContainer.innerHTML += `
                <div class="user-container">
                    <img src="img/user-icon-black.png" id="user-img" class="user-follow-pfp">
                    <div class="user-name">${user.username}</div>
                    <div class="buttons-container">
                        <button class="follow-button" onclick="followUser('${user.username}')">Follow</button>
                        <button class="unfollow-button" onclick="unfollowUser('${user.username}')">Unfollow</button>
                    </div>
                </div>
                `;
            };
        };
            
    } catch (error) {
        console.error('Error fetching or parsing JSON data:', error);
    }
}


/* -------------Following Section------------- */
async function followUser(toFollow) {
    if (following.includes(toFollow)){
        console.log("Already Following or cannot be followed");
    }else{
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
            followingCount++;
            await getFollowing();
            await displayUserAndFollowingPosts();
            
            } else {
            const errorMessage = await res.text();
            console.error(`Error following user: ${errorMessage}`);
            }
    
        } catch (error) {
            console.error('Error following user:', error);
        }
    }

}
//unfollows other users
async function unfollowUser(toUnfollow) {
    if (!following.includes(toUnfollow)){
        console.log("Already unFollowed");
    }else{
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
            followingCount--;
            await getFollowing();
            await displayUserAndFollowingPosts();
            
            } else {
            const errorMessage = await res.text();
            console.error(`Error unfollowing user: ${errorMessage}`);
            }
    
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }       
    }

}
//gets following array
async function getFollowing() {
    console.log("Getting Following");
    try {
        const response = await fetch(`http://localhost:3000/api/v1/users/${currentUser}/following`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentToken}`
            }
        });

        if (response.ok) {
            const fetchedFollowing = await response.json();
            following = fetchedFollowing;
            console.log("This was following: ", following);
            localStorage.setItem('followingCount', following.length)
            updateFollowingCount();
        } else {
            console.error('Error fetching following:', response.statusText);
        }
    } catch (error) {
        console.error('Error in getting following:', error);
    }
    return following;
}

//loads following count
async function loadFollowingCount() {
    const storedFollowingCount = localStorage.getItem('followingCount');
    if (storedFollowingCount) {
        followingCount = parseInt(storedFollowingCount);
    }
}
//concurrently updates the following count
async function updateFollowingCount() {
    document.getElementById('followingCountPlaceholder').innerText = following.length;
    localStorage.setItem('followingCount', following.length);
}
loadFollowingCount();

//loads and updates follower count
async function loadFollowerCount(){
    follower = [];
    const res = await fetch("http://localhost:3000/api/allUsers");
    const allUsernames = await res.json();

    for (const username in allUsernames){
        if(allUsernames.hasOwnProperty(username)){
            const user = allUsernames[username];
            if(user.following.includes(currentUser)){
                console.log(currentUser, "is followed by", user.username);
                follower.push(user.username);
            }
        }
    }
    console.log("Follower Length",follower.length);
    document.getElementById('followerCountPlaceholder').innerText = follower.length;
}


/* -------------Display Post Section------------- */
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

        console.log("Awaiting newpost response: ", await res.text());
        // After posting, refresh the posts
        await displayUserAndFollowingPosts();
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
            <textarea name="user-post" id="userPost" maxlength="256" placeholder="What's on your mind?" cols="30" rows="5"  oninput="checkInput()"></textarea>
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

        // for debugging
        // posts.forEach(post => {
        //     console.log("Post ID:", post.postId);
        //     console.log("Posted By:", post.postedBy);
        //     console.log("Content:", post.content);
        //     console.log("Date Time Posted:", post.dateTimePosted);
        //     console.log("Likes:", post.likes);
        //     console.log("--------------");
        //   });

        posts.sort((a, b) => new Date(b.dateTimePosted) - new Date(a.dateTimePosted));
        postsContainer.innerHTML += posts.map(post => `
            <div class="post-container">
                <div class="content-post">
                    <div class="post-header">
                        <img src="img/user-icon-black.png" id="userphoto-img">
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
                    <button class="btn" data-active="false">
                        <i class="fa fa-heart" aria-hidden="true" onclick="ToggleLikePost('${post.postId}', '${post.likes}')"> ${post.likes.length}</i>
                    </button>
                    <button class="btn" data-active="false"><i class="fa fa-share-alt" aria-hidden="true"></i></button>
                    <button class="btn" data-active="false"></button>
                </div>
            </div>
        `).join('');
        console.log("Display Post was successful");

        registerButtonEventListeners();
        await displayUsers();
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

//hides or unhides the post button on navbar 
function checkProfileMainDisplay() {
    const navPostButton = document.getElementById('navPost');
    const userPostContainer = document.querySelector('.profile-main');
    if (userPostContainer.style.display !== 'none') {
        navPostButton.style.display = 'none';
    } else {
        navPostButton.style.display = 'block';
    }
}

async function displayUserPosts() {
    const userPostContainer = document.querySelector('.profile-main');
    userPostContainer.innerHTML = `
        <div class="header-pic">
            <img src="img/default-header.jpg">
        </div>
        <div class="profile-container">
            <img src="img/user-icon-black.png">
            <h4>${currentUser}</h4>
            <p>Exploring the mysteries of Vespera 🌌 | Dreaming of new horizons ✨| Seeking new discoveries and forging 
                unforgettable memories 🚀</p>
                <h5><i class="fa fa-calendar"></i> Joined 2024</h5>
            <div class="profile-follows">
                <h5 id="followingCountPlaceholder"></h5>
                <h5>Following</h5> 
                <h5 id="followerCountPlaceholder"></h5>
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

        //for debugging the weird json files
        // posts.forEach(post => {
        //     console.log("Post ID:", post.postId);
        //     console.log("Posted By:", post.postedBy);
        //     console.log("Content:", post.content);
        //     console.log("Date Time Posted:", post.dateTimePosted);
        //     console.log("Likes:", post.likes);
        //     console.log("--------------");
        //   });

        posts.sort((a, b) => new Date(b.dateTimePosted) - new Date(a.dateTimePosted));
        // Display the fetched posts in the userPostContainer
        userPostContainer.innerHTML += posts.map(post => `
        <div class="post-container">
            <div class="content-post">
                <div class="post-header">
                    <img src="img/user-icon-black.png" id="userphoto-img">
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
                <button class="btn" data-active="false">
                    <i class="fa fa-heart" aria-hidden="true" onclick="ToggleLikePost('${post.postId}', '${post.likes}')"> ${post.likes.length}</i>
                    
                </button>
                <button class="btn" data-active="false"><i class="fa fa-share-alt" aria-hidden="true"></i></button>
                <button class="btn" data-active="false"></button>
            </div>
        </div>
        `).join('');

        registerButtonEventListeners();
        await displayUsers();

    } catch (error) {
        console.error('Error fetching all following posts:', error);
    }
}

if (window.location.href.includes("home.html")) {
    // Call the function when the home page is loaded
    displayUserAndFollowingPosts();
  }