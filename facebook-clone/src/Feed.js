import React, { useEffect, useState } from 'react'
import './Feed.css';
import StoryReel from './StoryReel';
import MessageSender from './MessageSender.js'
import Post from './Post';
import db from "./firebase";
import { UseStateValue } from './StateProvider';
function Feed() {

    const [posts, setPosts] = useState([]);
    const [{ image, username, user }, dispatch] = UseStateValue();

    useEffect(() => {
        db.collection("posts").orderBy("timestamp","desc").onSnapshot((snapshot) => (
            setPosts(snapshot.docs.map((doc) => ({
                id: doc.id,
                data:doc.data()
            })))
        ))
    }, []);
    

    return (
        <div className="feed">
            {/* StoryReel*/}
            <StoryReel />
            {/* MessageSender*/}
            <MessageSender />
            {posts.map((post) => (
                <Post
                    key={post.data.id}
                    postId={post.id}
                    usercomment={username}
                    userimage={image}
                    profilePic={post.data.profilePic}
                    timestamp={post.data.timestamp}
                    message={post.data.message}
                    username1={post.data.username}
                    imageURL={post.data.image}
                />
            ))}
        </div>
    );
}

export default Feed
