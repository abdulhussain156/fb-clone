import { Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './post.css';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import NearMeIcon from '@material-ui/icons/NearMe';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import db from "./firebase";
import { UseStateValue } from './StateProvider';
import firebase from "firebase";

function Post({ postId, usercomment, userimage, profilePic, imageURL, username1, timestamp, message }) {
    
    const [{ image,username, user }, dispatch] = UseStateValue('');
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [total, setTotal] = useState('');
    const [liked, setLiked] = useState(false);
    const [like, setLike] = useState([]);
    const [openComment, setOpencomment] =
        useState(true);
    const [check, setCheck] = useState(false);
    
    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                    setTotal(snapshot.size);
                });
        }
        return () => {
            unsubscribe();
        };
    }, [postId]);

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("like")
                .onSnapshot((snapshot) => {
                    setLike(snapshot.docs.map((doc) => doc.data()));
                    //setLike(snapshot.size)
                });
        }
        
        return () => {
            unsubscribe();
        };
        
    }, [postId]);

    useEffect(() => {
        for (let i = 0; i < like.length; i++) {
            if (like[i].user === username) {
                console.log(like[i].user);
                setLiked(true);
            }
        }
    },[username,like]);
 

    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: usercomment,
            image:userimage,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

    const postlike = (event) => {
        //event.preventDefault();
        if (liked===false) {
            db.collection("posts").doc(postId).collection("like").add({
                Status: "liked",
                user: usercomment,
                
            });
        } else {
            var deletelike = db.collection('posts').doc(postId).collection("like").where('user','==',usercomment);
                deletelike.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    doc.ref.delete();
                });
                });
            setLiked(!liked);
            }
        }
    

    const twoFunction = () => {
        setLiked(!liked);
        postlike()
    }

    
    var btnStyle = {
		fill: 'currentColor'
    }

    var likeclr={
        color:'gray'
    }
    
    if (liked === true) {
		btnStyle = {
			fill: '#2e81f4'
        }
        likeclr={
            color:'#2e81f4'
        }
	}

   
    
    return (
        <div className="post">
                <div className="post__top">
                    <Avatar className="post__avatar"
                        src={profilePic} />
                    <div className="post__topInfo">
                        <h3>{username1}</h3>
                        <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
                    </div>
                
                </div>

                <div className="post__bottom">
                    <p>{message}</p>
                </div>

                <div className="post__image">
                    <img src={imageURL} alt=""/>
                </div>

                <div className="post__options">
                <div className="post__option" onClick={twoFunction}
                >
                    <ThumbUpIcon 
                        style={btnStyle} />
                        <p style={likeclr}>Like</p>
                    </div>
                    <div className="post__option" onClick={()=>setOpencomment(!openComment)}>
                        <ChatBubbleOutlineIcon />
                        <p>Comment</p>
                    </div>
                    <div className="post__option">
                        <NearMeIcon />
                        <p>Share</p>
                    </div>
                    <div className="post__option">
                        <AccountCircleIcon />
                        <ExpandMoreIcon />
                    </div>
                </div>
            <div className="total__comments" onClick={()=>setOpencomment(!openComment)}>
                <p className="like__total">{like?.length} Likes</p>
                <p className="comments__total">{total} comments</p>
            </div>
            
                <form className="post__commentBox">
                    <input
                        className="post__input"
                        type="text"
                        placeholder="Add comments..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    
                    <button
                        className="post__button"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                    >
                        post
                    </button>
                
            </form>

            {openComment ?  
                    
                    <div className="post__comments">
                        {comments.map((comment) => (
                            <div className="comments">
                                <Avatar src={comment.image} />
                                <div className="comment_info">
                                <p>
                                <strong className="comment__user">{comment.username}:</strong>
                                </p>
                                    <p className="comment"> {comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div> :
                ""}
           
        </div>
    )
}

export default Post
