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

export function exploreCategories(
  categoryName: string,
  value: any,
  first: any
): Response {
  try {
    const { loading, error, data, refetch } = useQuery(
      schema.exploreCategories,
      {
        variables: {
          categoryName,
          first,
          ...(value && value.length > 2 ? { value } : { value: "" }),
        },
      }
    );
    return { loading, error, data, refetch };
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
    const { loading, error, data, refetch } = useQuery(
      schema.getCategoryPeoples,
      {
        variables: {
          id,
        },
      }
    );
    return { loading, error, data, refetch };
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

export function brandsNearMe({
  orderBy,
  latitude,
  longitude,
  first,
  skip,
}: any) {
  try {
    const { loading, error, data, refetch } = useQuery(schema.brandsNearMe, {
      variables: {
        orderBy,
        latitude,
        longitude,
        first,
        skip,
      },
    });

    return { loading, error, data, refetch };
  } catch (err) {
    console.error("Error in useBrands:", err);
    return { loading: false };
  }
}

export function getScannedBrands(value: any, first: any, skip: any) {
  try {
    const { loading, error, data } = useQuery(schema.scanBrands, {
      variables: {
        value,
        first,
        skip,
      },
    });

    return { scanLoading: loading, scanError: error, scanData: data };
  } catch (err) {
    console.error("Error in useBrands:", err);
    return { loading: false };
  }
}

export function getBrandCount() {
  try {
    const { loading, error, data } = useQuery(schema.brandCount);

    return { countLoading: loading, countError: error, countData: data };
  } catch (err) {
    console.error("Error in getBrandCount:", err);
    return { loading: false };
  }
}
