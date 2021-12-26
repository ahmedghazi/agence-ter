const dotenv = require("dotenv")

if (process.env.ENVIRONMENT !== "production") {
  dotenv.config()
}
const { GATSBY_PRIMIC_REPO_NAME, GATSBY_PRIMIC_TOKEN } = process.env
// console.log(process.env.repositoryName);
const linkResolver = require("./src/core/linkResolver").linkResolver

const website = require("./config/website")
const pathPrefix = website.pathPrefix === "/" ? "" : website.pathPrefix

module.exports = {
  siteMetadata: {
    siteTitle: website.title,
    siteDescription: website.description,
    siteUrl: website.url + pathPrefix, // For gatsby-plugin-sitemap
    pathPrefix,
    banner: website.logo,
    ogLanguage: website.ogLanguage,
    author: website.author,
    twitter: website.twitter,
    facebook: website.facebook,
  },
  plugins: [
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: GATSBY_PRIMIC_REPO_NAME,
        accessToken: GATSBY_PRIMIC_TOKEN,
        lang: `*`,
        linkResolver: () => linkResolver,
        // htmlSerializer: () => htmlSerializer,
        schemas: {
          settings: require(`./src/schemas/settings.json`),
          menu: require(`./src/schemas/menu.json`),
          home: require(`./src/schemas/home.json`),
          projects: require(`./src/schemas/projects.json`),
          project: require(`./src/schemas/project.json`),
          tag_localisation: require(`./src/schemas/tag_localisation.json`),
          tag_theme: require(`./src/schemas/tag_theme.json`),
          tag_year: require(`./src/schemas/tag_year.json`),
          agency: require(`./src/schemas/agency.json`),
          news: require(`./src/schemas/news.json`),
          category: require(`./src/schemas/category.json`),
          post: require(`./src/schemas/post.json`),
          award: require(`./src/schemas/award.json`),
          publication: require(`./src/schemas/publication.json`),
          contact: require(`./src/schemas/contact.json`),
          page: require(`./src/schemas/page.json`),
        },
        imageImgixParams: {
          auto: "compress,format",
          fit: "max",
          q: 70,
        },
        imagePlaceholderImgixParams: {
          w: 100,
          blur: 0,
          q: 50,
        },
      },
    },
    {
      resolve: `gatsby-plugin-prismic-previews`,
      options: {
        repositoryName: GATSBY_PRIMIC_REPO_NAME,
        accessToken: GATSBY_PRIMIC_TOKEN,
        lang: `*`,
        imageImgixParams: {
          auto: "compress,format",
          fit: "max",
          q: 80,
        },
        imagePlaceholderImgixParams: {
          w: 100,
          blur: 0,
          q: 50,
        },
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    `gatsby-plugin-styled-components`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: ``,
    //   },
    // },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: website.title,
        short_name: website.titleAlt,
        start_url: `/`,
        background_color: website.backgroundColor,
        theme_color: website.themeColor,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require(`tailwindcss`)],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        // printRejected: true,
        develop: true,
        tailwind: true,
        // printSummary: true,
        // debug: true,
        ignore: [
          `index.scss`,
          `flexboxgrid/`,
          `src/components/ui/slick-slider/slick.css`,
          `gatsby-plugin-prismic-previews/dist/styles.css`,
        ],
        // purgeCSSOptions: {
        //   content: [path.join(process.cwd(), `src/**/*.{js,jsx}`)]
        // }
        // purgeOnly: [`./styles/vendor`]
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `./src/images/`,
      },
      // __key: `images`,
    },
  ],
}
