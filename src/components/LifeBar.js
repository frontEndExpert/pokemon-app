import React from 'react';



const LifeBar = (props) => {
    
    return <>
    <div className="life-bar">
            <div className="bar" >&nbsp;</div>
    </div>
    <p className={props.player1 ? 'bar-text-left' : 'bar-text-right'}>{props.health}/100</p>
      <style jsx>{`
        .life-bar {
            display: block;
            width: 300px;
            height: 34px;
            background-color: white;
            border: 1px solid black;
            z-index: 5;
        }

        .bar-text-left{
            margin: 5px;
            font-size: 14px;
            font-weight: bold;
            text-align: left;
        }
        .bar-text-right{
            margin: 5px;
            font-size: 14px;
            font-weight: bold;
            text-align: right;
        }

        .bar {
            text-align: left;
            background-color:  ${props.health<=0 ? 'red' : 'green'};
            width: ${props.health<=0 ? 1 : props.health}%;
            height: 100%;
            z-index: 10;
            transition: width 2s, transform 2s;

        }

        `}
    </style>
    </>
}
export default LifeBar;