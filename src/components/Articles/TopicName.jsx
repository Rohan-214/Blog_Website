import React, { useState } from "react";

function TopicName({topic, selected, onSelect}) {


    return(
        <button
            type="button"
            className={`px-4 py-2 rounded-full border font-semibold transition 
                ${selected
                    ? "bg-blue-700 text-white border-blue-700"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100"}
            `}
            onClick={onSelect}
        >
            {topic}
        </button>
    );
}
export default TopicName;