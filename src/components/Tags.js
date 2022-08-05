import React from 'react';

const Tags = ({genres}) => {
    return (
        <p className="tag tag-lg">
            {genres}
        </p>
    );
};

export default Tags;