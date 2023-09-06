import "./singlepost.css"
import {Context} from "../../Context/Context"
import { useEffect, useState, useContext } from "react";
import {useLocation} from "react-router";
import axios from "axios"
import {Link} from "react-router-dom";

export default function SinglePost() {

    const PF = "http://localhost:4001/images/"

    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);


    const {user} = useContext(Context);

    useEffect(() => {
        const getPost = async () => {
            const response = await axios.get("/posts/"+path);
            setPost(response.data);
            setTitle(response.data.title);
            setDesc(response.data.description);
        };
        getPost();
    }, [path])

    const handleDelete = async () => {
        try {
            console.log(user.username);
            await axios.delete("http://localhost:4001/api/posts/" + path, {data: {username: user.username}});
            window.location.replace("/");
        } catch (error) {
            console.log("Failed to delete");
        }
    }

    const handleUpdate = async () => {
        try{
            await axios.put(`http://localhost:4001/api/posts/${post._id}`, {
                username: user.username,
                title: title, 
                description: desc
            })
            //window.location.reload()
            setUpdateMode(false);
        }
        catch (error) {
            console.log("Failed to update")
        }
    }

    return (
        <div className="singlepost">
            <div className="singlePostWrapper">
                {post.photo && (
                    <img 
                    src= {PF + post.photo} 
                    alt="" 
                    className="singlePostImg" 
                />
                )}
                {
                    updateMode ? 
                        <input 
                            type="text" 
                            value={title} 
                            className="singlePostTitleInput" 
                            autoFocus
                            onChange={(e)=>setTitle(e.target.value)}
                        /> 
                        : (
                        <h1 className="singlePostTitle">
                            {title}
                            {post.username === user?.username && (
                            <div className="singlePostEdit">
                                <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
                                <i className="singlePostIcon fa-regular fa-trash-can" onClick={handleDelete}></i>
                            </div>
                            )}
                        </h1>
                    )
                }
                <div className="singlePostInfo">
                    <span className="singlePostAuthor"> 
                        Author:  
                        <Link to={`/?user=${post.username}`} className="link">
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate"> {new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? <textarea className="singlePostDescInput" value={desc} onChange={(e)=>setDesc(e.target.value)}></textarea> : (
                    <p className="singlePostDesc">
                        {desc}
                    </p>
                )}
                {updateMode && <button className="singlePostButton" onClick={handleUpdate}>Update</button>}
            </div>
        </div> 
    )
}
