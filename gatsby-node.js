const path = require("path")
const i18n = require("./config/i18n")
const linkResolver = require("./src/core/linkResolver").linkResolver

// const templateHome = path.resolve("src/templates/home.jsx");
const templateHome = path.resolve("src/templates/Home.jsx")
const templateAgency = path.resolve("src/templates/Agency.jsx")
const templateProjects = path.resolve("src/templates/Projects.jsx")
const templateProject = path.resolve("src/templates/Project.jsx")
const templateNews = path.resolve("src/templates/News.jsx")
const templateContact = path.resolve("src/templates/Contact.jsx")
const templatePageDefault = path.resolve("src/templates/PageDefault.jsx")

// const getLocalizedPath = (node, path) => {
//   // console.log(path, node.locale)
//   return i18n[node.lang].default ? path : `/${i18n[node.lang].path}${path}`
// }

/// /////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////
async function createPages(graphql, actions) {
  const { createPage } = actions

  createPage({
    path: "/",
    component: templateHome,
    context: {
      template: "template-home",
    },
  })

  createPage({
    path: "/agence",
    component: templateAgency,
    context: {
      template: "template-agency",
    },
  })

  createPage({
    path: "/actualites",
    component: templateNews,
    context: {
      template: "template-news",
    },
  })

  createPage({
    path: "/contacts",
    component: templateContact,
    context: {
      template: "template-contact",
    },
  })
}

/// /////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////
async function createProjects(graphql, actions) {
  const { createPage } = actions

  createPage({
    path: "/projets",
    component: templateProjects,
    context: {
      template: "template-projects",
    },
  })
}
/// /////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////
async function createProject(graphql, actions) {
  const { createPage } = actions

  const projects = await graphql(`
    {
      allPrismicProject {
        nodes {
          uid
          type
        }
      }
    }
  `)

  projects.data.allPrismicProject.nodes.forEach((node) => {
    const path = `/project/${node.uid}`

    createPage({
      path: path,
      component: templateProject,
      context: {
        uid: node.uid,
        slug: node.uid,
        template: "template-project",
      },
    })
  })
}

/// /////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////
async function createPagesDefault(graphql, actions) {
  const { createPage } = actions

  const pages = await graphql(`
    {
      allPrismicPage {
        nodes {
          uid
          type
        }
      }
    }
  `)

  pages.data.allPrismicPage.nodes.forEach((node) => {
    const path = `/${node.uid}`
    console.log("path", path)
    createPage({
      path: path,
      component: templatePageDefault,
      context: {
        uid: node.uid,
        slug: node.uid,
        template: "template-page",
      },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  await createPages(graphql, actions)
  await createProjects(graphql, actions)
  await createProject(graphql, actions)
  await createPagesDefault(graphql, actions)
}
