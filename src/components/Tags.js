import React from 'react';

const Tags = ({genres, size}) => {
    let classList = "tag";
    if (size !== undefined)
        classList = "tag " + size

    function capitalize(text) {
        const words = text.split(" ");
        let result = []
        for (const word of words) {
            const lower = word.toLowerCase();
            result.push(lower.charAt(0).toUpperCase() + lower.substring(1))
        }
        return result.join(" ");
    }

    return (
        <p className={classList}>
            {capitalize(genres)}
        </p>
    );
};

export default Tags;