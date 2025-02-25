import React, { useState} from 'react'

export const Sexto = () => {
    const [data, setData] = useState(null);

    
        const apiKey = "1w0FJkjhMngUVKpFSchygyrySBeKWR7V";
        const peticion = fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&offset=0&rating=r&bundle=messaging_non_clips`);
        peticion
            .then(resp => resp.json())
            .then(data => {
                console.log(data.data[0].embed_url);
                setData(data.data[0].embed_url);
            })
            .catch(console.warn);
    

    return (
        <iframe src={data}></iframe>
    )
}
