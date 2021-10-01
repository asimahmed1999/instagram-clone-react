import React from 'react'
import './Post.css';

function Post() {
    return (
        <div className = "post">
            <h3>Username</h3>
            {/* {header -> avatar + username} */}
            
            <img className= "post__image" src = "https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png"/>
            {/* {image} */}
            <h4>Username: caption</h4>
            {/* {username + caption} */}
        </div>
    )
}

export default Post
