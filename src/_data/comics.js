const axios = require('axios');
const Cache = require("@11ty/eleventy-cache-assets");

const route = 'https://bornonatuesday.com/wp-json/wp/v2/jetpack-comic?per_page=100&_embed'

module.exports = async function () {
    const firstPage = await axios.get(route);
    const totalPages = firstPage.headers["x-wp-totalpages"];

    let allPages = [];

    results = firstPage.data;

    try {
        let response = await Cache(route, {
            duration: "1d",
            type: "json"
        });
    
        allPages = allPages.concat(response);    
    } catch(e) {
        console.log( "Failed getting comics." );
    }

    for (let index = 2; index <= totalPages; index++) {
        try {
            let response = await Cache(`${route}&page=${index}`, {
                duration: "1d",
                type: "json"
            });
        
            allPages = allPages.concat(response);    
        } catch(e) {
            console.log( "Failed getting comics." );
        }
    }

    return allPages;
};
