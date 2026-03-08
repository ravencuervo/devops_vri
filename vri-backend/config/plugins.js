module.exports = ({ env }) => ({
    upload: {
        config: {
            // Al dejar las breakpoints vacías, Strapi NO creará versiones 'Large', 'Medium' o 'Small'
            breakpoints: {},
            // Desactiva la creación automática de miniaturas (thumbnails)
            updatedThumbnail: false,
        },
    },
});
