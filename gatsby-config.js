// ================================
// GATSBY CONFIGURATION (gatsby-config.js)
// ================================

// ----------------------------------------------------------------
// CODE
// ----------------------------------------------------------------

// Gatsby makes all data put into siteMetadata automatically available in GraphQL.
// Therefore, it’s a good idea to place information for SEO Component there.
// It is not automatically displayed without GraphQL / React Helmet inserting it
// We use React Helmet to insert the data into head, programatically

module.exports = {
  siteMetadata: {
    title: 'nFront · Venture Capital and App Development',
    titleTemplate: '%s · nFront',
    description: 'nFront invests in exceptional startups and builds professional applications.',
    url: 'https://nfront.io', // No trailing slash
    siteUrl: `https://nfront.io`,
    // Image in metadata is used for twitter cards when shared, etc.
    // Dafault: Just set it to large logo.
    // Default from siteMetadata: Used if main landing page is shared on twitter etc.
    // Because, we use siteMetdata as default provided to SEO component.
    // So, header image of pages should be same as image added to SEO component.
    image: 'src/images/nfront-logo.png',
    twitterUsername: '@nfront_io',
    lang: 'en',
    nav: [
      { path: 'https://nfront.io/News', name: 'News', hidden: true },
      { path: '/#about', name: 'About' },
      { path: '/#expertise', name: 'Expertise' },
      { path: '/#languages', name: 'Languages' },
      { path: '/#contact', name: 'Contact' },
    ],
    // categories: [
    //   { slug: 'confidence', name: 'Confidence' },
    //   { slug: 'better-humans', name: 'Better Humans' },
    //   { slug: 'business-basics', name: 'Business Basics' },
    //   { slug: 'uncomfortable-things', name: 'Uncomfortable Things' },
    // ],
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-global-styles',
      options: {
        // pathToConfigModule: `src/styles/GlobalStyleComponent`,
        props: {
          // theme: `src/styles/theme`,
          other: {
            light: true,
          },
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`, // Support SASS/SCSS in style sheets and CSS Modules
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`, // How: https://www.gatsbyjs.org/docs/add-page-metadata/
    `gatsby-plugin-sitemap`,
    // {
    //   resolve: `gatsby-plugin-layout`, // uses layouts/index.js by default
    //   options: {
    //     component: require.resolve(`./src/layouts/layout.js`),
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace with own Tracking ID
        trackingId: 'UA-XXXXXXXXX-X',
      },
    },
    {
      resolve: `gatsby-source-filesystem`, // <-- For content loaded from disk (e.g. images, Markdowns, etc.)
      options: {
        path: `${__dirname}/content`, // Folder containing content loadable from disk with GraphQL (e.g. images, Markdowns, etc.)
        name: `content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`, // <-- For content loaded from disk (e.g. images, Markdowns, etc.)
      options: {
        path: `${__dirname}/src/images`, // Folder containing content loadable from disk with GraphQL (e.g. images, Markdowns, etc.)
        name: `images`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: `src/utils/typography`,
        omitGoogleFont: false,
      },
    },
    {
      // MUST BE BEFORE OFFLINE PLUGIN
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'nFront',
        short_name: 'nFront',
        start_url: '/',
        background_color: '#6b37bf',
        theme_color: '#6b37bf',

        // Enables "Add to Homescreen" prompt and disables browser UI (including back button).
        // See: https://developers.google.com/web/fundamentals/web-app-manifest/#display.
        display: 'standalone',

        // Plugin automatically creates many size-versions of below favicon.
        // Ensure favicon-base is >= 512x512, as that is largest file generated
        icon: 'src/images/favicon-base.png', // Path is relative to site root.

        // Optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`.
        crossOrigin: `use-credentials`,
      },
    },
    'gatsby-plugin-offline', // MUST BE AFTER MANIFEST PLUGIN
    {
      // MUST BE LAST IN PLUGIN ARRAY
      resolve: `gatsby-plugin-netlify`, // Automatic host config (caching, etc.)
      options: {
        headers: {}, // add headers (path+string) `Link` headers are transformed by below criteria
        allPageHeaders: [], // add headers for ALL pages. `Link` headers are transformed by below criteria
        mergeSecurityHeaders: true, // boolean to turn off default SECURITY headers
        mergeLinkHeaders: true, // boolean to turn off default GATSBY js headers
        mergeCachingHeaders: true, // boolean to turn off default CACHING headers
        transformHeaders: (headers, path) => headers, // Manipulates headers under each path (e.g. sorting), etc.
        generateMatchPathRewrites: true, // boolean, turns off automatic creation of redirect rules for client only paths
      },
    },
  ],
};
