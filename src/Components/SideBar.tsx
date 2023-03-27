import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

interface categories {
    category: string;
}

interface tag {
    tag: string;
    categories: categories[];
}

function SideBar(props: any) {
    const [select, setSelect] = useState("");
    const Navigate = useNavigate();


    return (
            <div className="">
            {props.tags.map((tag:tag, index:number) =>{
            return (
                <div>
                <h2 className=""
                onClick={ () => {
                    setSelect(tag.tag)
                    }
                }
                >
                {tag.tag}
                </h2>
                <div className={select === tag.tag ? "flex-col" : "hidden"} >
                    <div className={props.center === "center" ? "text-center" : ""}>
                        <a
                        className="block text-md text-gray-500  hover:bg-gray-50 hover:text-gray-700" 
                        onClick={ () => {
                            Navigate(`/browse?product_tag__tag=` + tag.tag)
                            window.location.reload();
                            }}
                        >
                        全部
                        </a>
                    {tag.categories.map((category, index) => {
                        return(
                        <a
                        className="block text-md text-gray-500  hover:bg-gray-50 hover:text-gray-700"
                        onClick={
                            () => {
                            Navigate(`/browse?product_tag__tag=` + tag.tag + `&product_category__category=` + category.category)
                            window.location.reload();
                            }}
                        >
                        {category.category}
                        </a>
                        )
                        })}
                    </div>
                </div>
                </ div>
            )
            })}
            </ div>
    )
}

export default SideBar;
