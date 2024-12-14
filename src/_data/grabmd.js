module.exports = async function () {
    try {
        // Dynamically import node-fetch
        const fetch = (await import("node-fetch")).default;

        // Fetch data from Strapi
        const response = await fetch("http://localhost:1337/api/markdown-posts");
        const data = await response.json();

        //console.log('Fetched Data:', data);
        return data.data; // Returns an array of posts
    } catch (error) {
        console.error('Error fetching data from Strapi:', error);
        return []; // Return an empty array if there's an error
    }
};