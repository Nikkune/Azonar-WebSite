import React from 'react';

const Types = ({type_id}) => {
    let type_name = "Unknown";
    switch (type_id) {
        case 1:
            type_name = "Manga"
            break;
        case 2:
            type_name = "Novel"
            break;
        case 3:
            type_name = "Manhua"
            break;
        case 4:
            type_name = "Manhwa"
            break;
        case 5:
            type_name = "Webtoon"
            break;
    }

    return (
        <p>
            {type_name}
        </p>
    );
};

export default Types;