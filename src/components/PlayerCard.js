import React from 'react';
import LifeBar from './LifeBar'


const PlayerCard = (props) => {
    const {title, health, place, pic, name} = props;
    
    return <>
        <div className="col1" ><p className={`title ${place}`}>{title}</p>
                <LifeBar health={health} place={place} />
                {pic &&  <img className="pic" width="80px" height="80px"  
                src={pic} alt={title} 
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src="https://placeimg.com/80/80/animals";
                  }} /> }
                <p>{name && name}</p>
            </div>


        <style jsx>
            {`
                .col1{
                    width: 300px;
                  }
                p.title {
                    font-size:20px;
                    font-weight:bold;
                  }
                  p.title.left {
                    text-align: left;
                }  
                p.title.right {
                    text-align: right;
                }

            `}
        </style>
    </>
}
export default PlayerCard;