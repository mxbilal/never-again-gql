import { gql } from "@apollo/client";

export default {
  approvedBrands: gql`
    query GetApprovedBrands(
      $orderBy: ApprovedBrandOrderByInput
      $value: String
      $first: Int
      $skip: Int
    ) {
      approvedBrands(
        orderBy: $orderBy
        first: $first
        skip: $skip
        where: { name_contains: $value }
      ) {
        id
        description
        name
        icon {
          url
        }
        path
        featured
      }
    }
  `,
  approvedBrandDetails: gql`
    query getApprovedBrandDetails($id: ID) {
      approvedBrand(where: { id: $id }) {
        id
        name
        descriptionSmall
        description
        subTitle
        instructions
        shopLink
        icon {
          url
        }
        linking {
          ... on Category {
            name
          }
        }
      }
    }
  `,
  brands: gql`
    query GetBrands(
      $orderBy: BrandOrderByInput
      $value: String
      $first: Int
      $skip: Int
    ) {
      brands(
        orderBy: $orderBy
        first: $first
        skip: $skip
        where: { name_contains: $value }
      ) {
        id
        description
        name
        icon {
          url
        }
        path
      }
    }
  `,
  brandDetails: gql`
    query getBrands($id: ID) {
      brand(where: { id: $id }) {
        id
        name
        descriptionSmall
        description
        subTitle
        proofLinks
        instructions
        icon {
          url
        }
        linking {
          ... on Category {
            name
          }
        }
        alternativeLinks {
          ... on ApprovedBrand {
            id
            name
            icon {
              url
            }
          }
        }
      }
    }
  `,
  categories: gql`
    query getCategories {
      categories(first: 100, orderBy: createdAt_DESC) {
        id
        name
      }
    }
  `,
  exploreCategories: gql`
    query exploreCategories(
      $categoryName: String!
      $first: Int
      $value: String
    ) {
      brands(
        first: $first
        where: {
          linking_some: { Category: { name: $categoryName } }
          _search: $value
        }
      ) {
        id
        name
        icon {
          url
        }
      }
    }
  `,
  exploreApprovedCategories: gql`
    query exploreApprovedCategories($categoryId: ID) {
      category(where: { id: $categoryId }) {
        approvedBrands {
          name
          id
          icon {
            url
          }
        }
      }
    }
  `,
  getPeopleCategories: gql`
    query peopleCategories {
      peopleCategories {
        title
        id
      }
    }
  `,
  getCategoryPeoples: gql`
    query categoryPeoples($id: ID) {
      peopleCategory(where: { id: $id }) {
        title
        peoples {
          id
          name
          dateOfBirth
          detail
          description
          profileUrl
          profilePhoto {
            id
            url
            fileName
          }
          peopleCategory {
            title
          }
        }
      }
    }
  `,
  getCelebrity: gql`
    query getCelebrity($id: ID) {
      people(where: { id: $id }) {
        name
        id
        detail
        description
        dateOfBirth
        height
        profileUrl
        profilePhoto {
          id
          url
          fileName
        }
        proofLinks
        facebookUrl
        instagramUrl
        twitterUrl
      }
    }
  `,
  getPeople: gql`
    query getPeople($value: String, $first: Int) {
      peoples(
        orderBy: createdAt_DESC
        skip: 0
        first: $first
        where: { _search: $value }
      ) {
        name
        id
        description
        dateOfBirth
        profileUrl
        profilePhoto {
          id
          url
          fileName
        }
        peopleCategory {
          title
        }
      }
    }
  `,
  brandsNearMe: gql`
    query brandsNearMe(
      $orderBy: BrandOrderByInput
      $latitude: Float!
      $longitude: Float!
      $first: Int
      $skip: Int
    ) {
      brands(orderBy: $orderBy, first: $first, skip: $skip) {
        id
        description
        name
        icon {
          url
        }
        path
        gps {
          distance(from: { latitude: $latitude, longitude: $longitude })
        }
      }
    }
  `,
  scanBrands: gql`
    query getScannedBrands($name: String, $brand: String, $barcode: [Float!]) {
      brands(
        orderBy: createdAt_ASC
        first: 100000
        where: {
          OR: [
            { barcodes_contains_some: $barcode }
            { name_contains: $name }
            { description_contains: $brand }
            { subTitle_contains: $brand }
            { descriptionSmall_contains: $brand }
            { path_contains: $brand }
          ]
        }
      ) {
        id
        barcodes
        description
        name
        icon {
          url
        }
        path
      }
    }
  `,
  brandCount: gql`
    query getBrandCount {
      brandsConnection {
        aggregate {
          count
        }
      }
    }
  `,
  approvedBrandCount: gql`
    query getApprovedBrandCount {
      approvedBrandsConnection {
        aggregate {
          count
        }
      }
    }
  `,
};
