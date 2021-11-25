import React, { useEffect, useState } from 'react';
import igScrap from 'ig-scrap'

const InstagramCard = (props) => {
    const [user, setUser] = useState();
    const [media, setMedia] = useState();

    useEffect(() => {
        _fetchData()
    }, [])
    
    const _fetchData = () => {
        igScrap.user(`https://www.instagram.com/${props.username}`, function (err, result) {
            const { user, media } = result
            setUser(user)
            setMedia(media[0])
            // console.log(media[0])
        })
    }

    return (
        <div className="instagram-card">
            {media &&
                <>
                    <div className="media">
                        <img src={media.thumbnail_resources[1].src} alt="Instagram post"/>
                    </div>
                    <div className="media-body">
                        <div className="title">{user.full_name}</div>
                        <p>{media.caption}</p>
                        <a href={`https://www.instagram.com/${props.username}`}>⟶ @{props.username}</a>
                    </div>
                </>
            }
        </div>
    );
};

export default InstagramCard;