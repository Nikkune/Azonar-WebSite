import React from 'react';

const LTableRow = ({manga}) => {
    let name = manga.name
    if (manga.name.length >= 30)
        name = manga.name.substring(0, 30) + " ..."
    const date = new Intl.DateTimeFormat('en-US', {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false
    }).format(new Date(manga.last_update));
    let site;
    if (manga.site_id.toString() === "1")
        site = "JapScan";
    else site = "Mangas Origines"
    return (
        <tr>
            <td>{manga._id}</td>
            <td>{name}</td>
            <td>{site}</td>
            <td>{manga.chapter_number}</td>
            <td>{date}</td>
        </tr>
    );
};

export default LTableRow;