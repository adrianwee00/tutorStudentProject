import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
    return(
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{props.Name}</h2>
            <p className="text-gray-600 text-sm mb-2">Qualification: {props.Qualifications}</p>
            <p className="text-gray-600 text-sm mb-4">Subjects: {props.Subjects}</p>
            <div className="flex items-center">
            {/*
            <span className="text-gray-700 text-sm">Ratings:</span>
            <div className="ml-2">
                ★★★★★
            </div>
            */}
            </div>
        </div>
    )
}

export default Card;