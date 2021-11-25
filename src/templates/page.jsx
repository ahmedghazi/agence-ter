// import React, { useEffect, useMemo } from "react";
// import { graphql } from "gatsby";
// import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
// import { repositoryConfigs } from "../core/prismicPreviews";
// import SEO from "../components/seo";
// import { RichText } from "prismic-reactjs";
// import FigurePixel from "../components/FigurePixel";
// import Figure from "../components/Figure";

// // console.log(repositoryConfigs);
// export const query = graphql`
//   query PageBySlug($uid: String!) {
//     prismicPage(uid: { eq: $uid }) {
//       _previewable
//       data {
//         home_page
//         meta_title {
//           text
//         }
//         meta_description {
//           text
//         }
//         meta_image {
//           url
//         }
//         title {
//           text
//         }
//         texte {
//           text
//           raw
//         }
//         image {
//           localFile {
//             childImageSharp {
//               gatsbyImageData(
//                 width: 1500
//                 placeholder: BLURRED
//                 formats: [AUTO, WEBP, AVIF]
//               )
//             }
//           }
//           fluid(maxWidth: 1500) {
//             src
//             base64
//             sizes
//             srcSet
//             srcSetWebp
//             srcWebp
//             aspectRatio
//           }
//         }
//       }
//     }
//   }
// `;

// const Page = ({ data }) => {
//   //
//   const { title, texte, meta_title, meta_description, meta_image, image } =
//     data.prismicPage.data;
//   // console.log(image);
//   // useEffect(() => {}, [])

//   return (
//     <div className='page px-md pb-md'>
//       <SEO
//         pageTitle={meta_title.text}
//         pageDescription={meta_description.text}
//         pageImage={meta_image.url}
//         template={`template-page`}
//         page={true}
//       />

//       <h1>{title.text}</h1>
//       {/* <p>{texte.text}</p> */}
//       {RichText.render(texte.raw)}

//       <div className='flex-'>
//         <div className='w-1/2 px-md'>
//           <FigurePixel input={image} />
//         </div>
//         <div className='w-1/2 px-md'>
//           <Figure input={image} />
//         </div>
//         <div className='w-1/2 px-md'>
//           <FigurePixel input={image} />
//         </div>
//         <div className='w-1/2 px-md'>
//           <FigurePixel input={image} />
//         </div>
//         <div className='w-1/2 px-md'>
//           <FigurePixel input={image} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default withPrismicPreview(Page, repositoryConfigs);
