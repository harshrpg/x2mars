import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"

const useAllImages = () => {
  const { images } = useStaticQuery(graphql`
    query {
      images: allFile {
        edges {
          node {
            relativePath
            name
            childrenImageSharp {
              gatsbyImageData(width: 150, height: 150)
            }
          }
        }
      }
    }
  `)
  return images
}

export const useImageForData = data => {
  const images = useAllImages()
  if (!!data) {
    const myImage = images.edges.find(n => {
        return n.node.relativePath.includes(data)
      })
      return getImage(myImage.node.childrenImageSharp[0])
  }
  return null
  
}
