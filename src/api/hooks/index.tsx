import schema from "../schema/queries";
import {
  ApolloError,
  ApolloQueryResult,
  OperationVariables,
  useQuery,
} from "@apollo/client";

interface brandsInput {
  orderBy: string;
  value: string;
  first: number;
}

interface ID {
  id: string;
}

interface Response {
  loading?: boolean;
  error?: ApolloError | undefined;
  data?: any;
  pLoad?: boolean;
  pError?: ApolloError | undefined;
  pData?: any;
  refetch?: (
    variables?: Partial<OperationVariables>
  ) => Promise<ApolloQueryResult<any>> | undefined;
}

export function useBrands(props: brandsInput): Response {
  try {
    let { orderBy, value, first } = props;
    const { loading, error, data, refetch } = useQuery(schema.brands, {
      variables: {
        orderBy,
        first,
        ...(value && value.length > 2 ? { value } : { value: "" }), // Only include value if it meets certain criteria
      },
    });

    return { loading, error, data, refetch };
  } catch (err) {
    console.error("Error in useBrands:", err);
    return { loading: false };
  }
}
export function brandDetails(props: ID): Response {
  try {
    let { id } = props;
    const { loading, error, data } = useQuery(schema.brandDetails, {
      variables: { id },
    });
    return { loading, error, data };
  } catch (err) {
    getCategoryPeoples;
    console.log("error", err);
    return { loading: false };
  }
}

export function getCategories(): Response {
  try {
    const { loading, error, data } = useQuery(schema.categories);
    return { loading, error, data };
  } catch (err) {
    console.log("error", err);
    return { loading: false };
  }
}

export function exploreCategories(categoryName: string): Response {
  try {
    const { loading, error, data } = useQuery(schema.exploreCategories, {
      variables: { categoryName },
    });
    return { loading, error, data };
  } catch (err) {
    console.log("error", err);
    return { loading: false };
  }
}

export function getPeopleCategories(): Response {
  try {
    const { loading, error, data } = useQuery(schema.getPeopleCategories);
    return { loading, error, data };
  } catch (err) {
    console.log("error", err);
    return { loading: false };
  }
}

export function getCategoryPeoples(props: ID): Response {
  try {
    let { id } = props;
    const { loading, error, data } = useQuery(schema.getCategoryPeoples, {
      variables: {
        id,
      },
    });
    return { loading, error, data };
  } catch (err) {
    console.log("error", err);
    return { loading: false };
  }
}

export function getCelebrity(props: ID): Response {
  try {
    let { id } = props;
    const { loading, error, data } = useQuery(schema.getCelebrity, {
      variables: {
        id,
      },
    });
    return { loading, error, data };
  } catch (err) {
    console.log("error", err);
    return { loading: false };
  }
}

export function getPeople({
  value,
  first,
}: {
  value: string;
  first: number;
}): Response {
  try {
    const { loading, error, data, refetch } = useQuery(schema.getPeople, {
      variables: {
        ...(value && value.length > 2 ? { value } : { value: "" }),
        first,
      },
    });
    return { pLoad: loading, pError: error, pData: data, refetch };
  } catch (err) {
    console.log("error", err);
    return { pLoad: false };
  }
}
