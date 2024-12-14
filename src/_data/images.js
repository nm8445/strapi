module.exports = async function () {
  try {
    // Fetching car data from Strapi with population
    const response = await fetch('http://localhost:1337/api/cars?populate=Jesko');
    
    // Parse the JSON response
    const data = await response.json();

    // Log the fetched data to inspect its structure
    console.log('Fetched Data:', data);

    // Check if the data and Jesko field exist
    if (data.data && data.data.length > 0) {
      const images = data.data.map(car => {
        const image = car.Jesko; // Jesko field contains the image data
        const imageSize = image.formats.small || image.formats.medium; // Select medium size, fallback to small

        return {
          url: `http://localhost:1337${imageSize.url}`, // Full URL to the medium or small image
          alt: image.name || 'Default Alt Text' // Alt text (name of the image)
        };
      });

      console.log('Mapped Images:', images);
      return images; // Return the list of images
    }

    return []; // Return empty array if no valid data
  } catch (error) {
    console.error('Error fetching data from Strapi:', error);
    return []; // Return empty array if there's an error
  }
};
