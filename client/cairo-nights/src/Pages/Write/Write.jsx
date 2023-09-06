import './write.css'
import {useState, useContext} from "react"
import {Context} from "../../Context/Context"
import axios from "axios"

export default function Write() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const {user} = useContext(Context); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            description,
        };
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.photo = fileName;
            try {
                await axios.post("http://localhost:4001/api/upload", data);
            } catch (err) {
                console.log("Error uploading");
            }
        } 
        try {
            console.log(newPost)
            const response = await axios.post("http://localhost:4001/api/posts", newPost);
            window.location.replace("/post/" + response.data._id);
        } catch (err) {
            console.log("Error writing");
        }
    };

    return (
        <div className="write">
            {file && (    
                <img 
                className="writeImg"
                src={URL.createObjectURL(file)}
                //"https://images.pexels.com/photos/4898076/pexels-photo-4898076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="" 
                />
            )}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fa-solid fa-plus"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display: 'none'}} onChange={e=>setFile(e.target.files[0])}/>
                    <input type="text" placeholder="Title" className="writeInput" autofocus={true} onChange={e=>setTitle(e.target.value)}/>
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder="Tell your story" className="writeInput writeText" onChange={e=>setDescription(e.target.value)}></textarea>
                </div>
                <button className="writeSubmit" type="submit">Publish</button>
            </form>
        </div>
    )
}
