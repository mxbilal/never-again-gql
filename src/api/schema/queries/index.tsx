import { gql } from "@apollo/client";

export default {
  brands: gql`
    query GetBrands($orderBy: BrandOrderByInput, $value: String, $first: Int) {
      brands(orderBy: $orderBy, first: $first, where: { _search: $value }) {
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
      }
    }
  `,
  categories: gql`
    query getCategories {
      categories {
        id
        name
      }
    }
  `,
  exploreCategories: gql`
    query exploreCategories($categoryName: String!) {
      brands(where: { linking_some: { Category: { name: $categoryName } } }) {
        id
        name
        icon {
          url
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
        peopleCategory {
          title
        }
      }
    }
  `,
};
