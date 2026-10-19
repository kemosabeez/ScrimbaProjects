
import { useState } from "react";
import { useEffect } from "react";

export default function Main() {

    const [meme, setMeme] = useState({
        topText: "", bottomText: "", imageUrl: null 
    });
    const [allMemes, setAllMemes] = useState([])

    useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
    .then(res=>res.json())
    .then(data=>setAllMemes(data.data.memes))
    },[])


    function handleChange(event){
        const {value, name} = event.currentTarget
        setMeme(prevMeme => ({
            ...prevMeme,
           [name]: value
        }))
    }
    function handleClick() {
        const randomMeme = allMemes[Math.floor(Math.random() * allMemes.length)];
        setMeme(prevMeme => ({
            ...prevMeme,
            imageUrl: randomMeme.url
        }));
    }

    return (
        <main>
        <div className="meme">
           <div className="form">
                <label >Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange = {handleChange}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange = {handleChange}
                    />
                </label>
                <button onClick={handleClick}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} alt="Generated meme" />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </div>
        </main>
    )
}