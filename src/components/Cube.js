import React from 'react';



const Cube = (props) => {
    
    return <>
    <div class="cube">{props.value}</div>
        <style jsx>
            {`
                .cube {
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    padding: 10px;
                    margin: 10px;
                    font-size: 24px;
                    font-weight: bold;
                    border: 1px solid black;
                }
            `}
        </style>
    </>
}
export default Cube;