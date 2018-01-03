import React, { Component } from 'react';


const renderButtons = (tags, handleStyles)=>{
    return tags.map((tag)=>{
        return (<input key={tag}
                       type='button' 
                       onClick={()=>handleStyles(tag)} 
                       value={`<${tag}>`}/>)
    })
}

const StyleTag = ({ tags, handleStyles }) => {
    return (
        renderButtons(tags, handleStyles)
    )
}

export default StyleTag;