import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTimeISO: { input: unknown; output: unknown };
};

export type Bank = {
  __typename?: "Bank";
  bankAccounts: Array<BankAccount>;
  id: Scalars["Int"]["output"];
  label: Scalars["String"]["output"];
};

export type BankAccount = {
  __typename?: "BankAccount";
  account_number: Scalars["String"]["output"];
  balance: Scalars["Float"]["output"];
  bank: Bank;
  id: Scalars["Int"]["output"];
  invoices?: Maybe<Array<Invoice>>;
  name: Scalars["String"]["output"];
};

export type Budget = {
  __typename?: "Budget";
  amount: Scalars["Float"]["output"];
  commissionId: Scalars["Float"]["output"];
  commissions: Commission;
  exercise: Exercise;
  exerciseId: Scalars["Float"]["output"];
};

export type Category = {
  __typename?: "Category";
  creditDebit: CreditDebit;
  id: Scalars["Float"]["output"];
  label: Scalars["String"]["output"];
  subcategories: Array<Subcategory>;
};

export type Commission = {
  __typename?: "Commission";
  budgets: Array<Budget>;
  id: Scalars["Float"]["output"];
  invoices: Array<Invoice>;
  name: Scalars["String"]["output"];
  users?: Maybe<Array<User>>;
};

export type CommissionsInput = {
  id: Scalars["Float"]["input"];
};

export type CreditDebit = {
  __typename?: "CreditDebit";
  categories: Category;
  id: Scalars["Float"]["output"];
  invoices: Array<Invoice>;
  label: Scalars["String"]["output"];
};

export type Exercise = {
  __typename?: "Exercise";
  budgets: Array<Budget>;
  end_date: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  label: Scalars["String"]["output"];
  start_date: Scalars["String"]["output"];
};

export type Invoice = {
  __typename?: "Invoice";
  bankAccount?: Maybe<BankAccount>;
  commission: Commission;
  creditDebit: CreditDebit;
  date: Scalars["DateTimeISO"]["output"];
  id: Scalars["Float"]["output"];
  info: Scalars["String"]["output"];
  invoiceNumber: Scalars["String"]["output"];
  label: Scalars["String"]["output"];
  paid: Scalars["Boolean"]["output"];
  price_without_vat: Scalars["Float"]["output"];
  receipt: Scalars["String"]["output"];
  status: Status;
  subcategory: Subcategory;
  user: User;
  vat: Vat;
};

export type Mutation = {
  __typename?: "Mutation";
  addCategory: Category;
  addSubcategory: Subcategory;
  createNewUser: User;
  updateUser: User;
};

export type MutationAddCategoryArgs = {
  creditDebitId: Scalars["Float"]["input"];
  label: Scalars["String"]["input"];
};

export type MutationAddSubcategoryArgs = {
  categoryId: Scalars["Float"]["input"];
  code: Scalars["String"]["input"];
  label: Scalars["String"]["input"];
};

export type MutationCreateNewUserArgs = {
  data: UserInput;
};

export type MutationUpdateUserArgs = {
  data: UserInput;
  userId: Scalars["Float"]["input"];
};

export type PaginatedInvoices = {
  __typename?: "PaginatedInvoices";
  invoices: Array<Invoice>;
  totalCount: Scalars["Int"]["output"];
};

export type PaginatedUsers = {
  __typename?: "PaginatedUsers";
  totalCount: Scalars["Int"]["output"];
  users: Array<User>;
};

export type Query = {
  __typename?: "Query";
  getBankAccounts: Array<BankAccount>;
  getBanks: Array<Bank>;
  getCategories: Array<Category>;
  getCommissions: Array<Commission>;
  getCreditDebits: Array<CreditDebit>;
  getInvoices: Array<Invoice>;
  getInvoicesByCommissionId: PaginatedInvoices;
  getRoles: Array<Role>;
  getStatuss: Array<Status>;
  getSubcategories: Array<Subcategory>;
  getUserById: User;
  getUsers: PaginatedUsers;
  getVats: Array<Vat>;
};

export type QueryGetInvoicesByCommissionIdArgs = {
  commissionId: Scalars["Float"]["input"];
  limit?: Scalars["Float"]["input"];
  offset?: Scalars["Float"]["input"];
};

export type QueryGetUserByIdArgs = {
  userId: Scalars["Float"]["input"];
};

export type QueryGetUsersArgs = {
  limit?: Scalars["Int"]["input"];
  offset?: Scalars["Int"]["input"];
};

export type Role = {
  __typename?: "Role";
  id: Scalars["Int"]["output"];
  label: Scalars["String"]["output"];
  users: Array<User>;
};

export type RolesInput = {
  id: Scalars["Float"]["input"];
};

export type Status = {
  __typename?: "Status";
  id: Scalars["Float"]["output"];
  invoices: Array<Invoice>;
  label: Scalars["String"]["output"];
};

export type Subcategory = {
  __typename?: "Subcategory";
  category: Category;
  code: Scalars["String"]["output"];
  id: Scalars["Float"]["output"];
  invoices: Array<Invoice>;
  label: Scalars["String"]["output"];
};

export type User = {
  __typename?: "User";
  commissions?: Maybe<Array<Commission>>;
  email: Scalars["String"]["output"];
  firstname: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  invoices: Array<Invoice>;
  lastname: Scalars["String"]["output"];
  password: Scalars["String"]["output"];
  roles: Array<Role>;
};

export type UserInput = {
  commissions: Array<CommissionsInput>;
  email: Scalars["String"]["input"];
  firstname: Scalars["String"]["input"];
  lastname: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  roles: Array<RolesInput>;
};

export type Vat = {
  __typename?: "Vat";
  id: Scalars["Float"]["output"];
  invoices: Array<Invoice>;
  label: Scalars["String"]["output"];
  rate: Scalars["Float"]["output"];
};

export type AddCategoryMutationVariables = Exact<{
  label: Scalars["String"]["input"];
  creditDebitId: Scalars["Float"]["input"];
}>;

export type AddCategoryMutation = {
  __typename?: "Mutation";
  addCategory: { __typename?: "Category"; id: number; label: string };
};

export type AddSubcategoryMutationVariables = Exact<{
  label: Scalars["String"]["input"];
  code: Scalars["String"]["input"];
  categoryId: Scalars["Float"]["input"];
}>;

export type AddSubcategoryMutation = {
  __typename?: "Mutation";
  addSubcategory: {
    __typename?: "Subcategory";
    id: number;
    label: string;
    code: string;
  };
};

export type CreateNewUserMutationVariables = Exact<{
  data: UserInput;
}>;

export type CreateNewUserMutation = {
  __typename?: "Mutation";
  createNewUser: {
    __typename?: "User";
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    roles: Array<{ __typename?: "Role"; id: number }>;
    commissions?: Array<{ __typename?: "Commission"; id: number }> | null;
  };
};

export type UpdateUserMutationVariables = Exact<{
  data: UserInput;
  userId: Scalars["Float"]["input"];
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  updateUser: {
    __typename?: "User";
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    roles: Array<{ __typename?: "Role"; id: number }>;
    commissions?: Array<{ __typename?: "Commission"; id: number }> | null;
  };
};

export type GetUsersQueryVariables = Exact<{
  limit: Scalars["Int"]["input"];
  offset: Scalars["Int"]["input"];
}>;

export type GetUsersQuery = {
  __typename?: "Query";
  getUsers: {
    __typename?: "PaginatedUsers";
    totalCount: number;
    users: Array<{
      __typename?: "User";
      id: number;
      firstname: string;
      lastname: string;
      email: string;
      password: string;
      roles: Array<{ __typename?: "Role"; id: number; label: string }>;
      commissions?: Array<{
        __typename?: "Commission";
        id: number;
        name: string;
      }> | null;
    }>;
  };
};

export type GetRolesQueryVariables = Exact<{ [key: string]: never }>;

export type GetRolesQuery = {
  __typename?: "Query";
  getRoles: Array<{ __typename?: "Role"; id: number; label: string }>;
};

export type GetInvoicesQueryVariables = Exact<{ [key: string]: never }>;

export type GetInvoicesQuery = {
  __typename?: "Query";
  getInvoices: Array<{
    __typename?: "Invoice";
    id: number;
    price_without_vat: number;
    label: string;
    receipt: string;
    info: string;
    paid: boolean;
    date: unknown;
    invoiceNumber: string;
    status: { __typename?: "Status"; id: number; label: string };
    vat: { __typename?: "Vat"; id: number; rate: number };
    creditDebit: { __typename?: "CreditDebit"; id: number; label: string };
    subcategory: { __typename?: "Subcategory"; id: number; label: string };
    commission: { __typename?: "Commission"; id: number; name: string };
    bankAccount?: {
      __typename?: "BankAccount";
      id: number;
      name: string;
    } | null;
    user: {
      __typename?: "User";
      id: number;
      firstname: string;
      lastname: string;
    };
  }>;
};

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCategoriesQuery = {
  __typename?: "Query";
  getCategories: Array<{
    __typename?: "Category";
    id: number;
    label: string;
    subcategories: Array<{
      __typename?: "Subcategory";
      id: number;
      label: string;
      code: string;
    }>;
    creditDebit: { __typename?: "CreditDebit"; id: number; label: string };
  }>;
};

export type GetVatsQueryVariables = Exact<{ [key: string]: never }>;

export type GetVatsQuery = {
  __typename?: "Query";
  getVats: Array<{
    __typename?: "Vat";
    id: number;
    label: string;
    rate: number;
    invoices: Array<{ __typename?: "Invoice"; id: number; label: string }>;
  }>;
};

export type GetCommissionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetCommissionsQuery = {
  __typename?: "Query";
  getCommissions: Array<{
    __typename?: "Commission";
    id: number;
    name: string;
  }>;
};

export type GetInvoicesByCommissionIdQueryVariables = Exact<{
  commissionId: Scalars["Float"]["input"];
  offset: Scalars["Float"]["input"];
  limit: Scalars["Float"]["input"];
}>;

export type GetInvoicesByCommissionIdQuery = {
  __typename?: "Query";
  getInvoicesByCommissionId: {
    __typename?: "PaginatedInvoices";
    totalCount: number;
    invoices: Array<{
      __typename?: "Invoice";
      date: unknown;
      id: number;
      invoiceNumber: string;
      label: string;
      price_without_vat: number;
      status: { __typename?: "Status"; label: string; id: number };
      vat: { __typename?: "Vat"; rate: number; label: string; id: number };
      creditDebit: { __typename?: "CreditDebit"; label: string; id: number };
    }>;
  };
};

export type GetUserByIdQueryVariables = Exact<{
  userId: Scalars["Float"]["input"];
}>;

export type GetUserByIdQuery = {
  __typename?: "Query";
  getUserById: {
    __typename?: "User";
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    roles: Array<{ __typename?: "Role"; id: number; label: string }>;
    commissions?: Array<{
      __typename?: "Commission";
      id: number;
      name: string;
    }> | null;
  };
};

export const AddCategoryDocument = gql`
  mutation AddCategory($label: String!, $creditDebitId: Float!) {
    addCategory(label: $label, creditDebitId: $creditDebitId) {
      id
      label
    }
  }
`;
export type AddCategoryMutationFn = Apollo.MutationFunction<
  AddCategoryMutation,
  AddCategoryMutationVariables
>;

/**
 * __useAddCategoryMutation__
 *
 * To run a mutation, you first call `useAddCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCategoryMutation, { data, loading, error }] = useAddCategoryMutation({
 *   variables: {
 *      label: // value for 'label'
 *      creditDebitId: // value for 'creditDebitId'
 *   },
 * });
 */
export function useAddCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddCategoryMutation,
    AddCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddCategoryMutation, AddCategoryMutationVariables>(
    AddCategoryDocument,
    options,
  );
}
export type AddCategoryMutationHookResult = ReturnType<
  typeof useAddCategoryMutation
>;
export type AddCategoryMutationResult =
  Apollo.MutationResult<AddCategoryMutation>;
export type AddCategoryMutationOptions = Apollo.BaseMutationOptions<
  AddCategoryMutation,
  AddCategoryMutationVariables
>;
export const AddSubcategoryDocument = gql`
  mutation AddSubcategory(
    $label: String!
    $code: String!
    $categoryId: Float!
  ) {
    addSubcategory(label: $label, code: $code, categoryId: $categoryId) {
      id
      label
      code
    }
  }
`;
export type AddSubcategoryMutationFn = Apollo.MutationFunction<
  AddSubcategoryMutation,
  AddSubcategoryMutationVariables
>;

/**
 * __useAddSubcategoryMutation__
 *
 * To run a mutation, you first call `useAddSubcategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSubcategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSubcategoryMutation, { data, loading, error }] = useAddSubcategoryMutation({
 *   variables: {
 *      label: // value for 'label'
 *      code: // value for 'code'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useAddSubcategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddSubcategoryMutation,
    AddSubcategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddSubcategoryMutation,
    AddSubcategoryMutationVariables
  >(AddSubcategoryDocument, options);
}
export type AddSubcategoryMutationHookResult = ReturnType<
  typeof useAddSubcategoryMutation
>;
export type AddSubcategoryMutationResult =
  Apollo.MutationResult<AddSubcategoryMutation>;
export type AddSubcategoryMutationOptions = Apollo.BaseMutationOptions<
  AddSubcategoryMutation,
  AddSubcategoryMutationVariables
>;
export const CreateNewUserDocument = gql`
  mutation CreateNewUser($data: UserInput!) {
    createNewUser(data: $data) {
      id
      firstname
      lastname
      email
      password
      roles {
        id
      }
      commissions {
        id
      }
    }
  }
`;
export type CreateNewUserMutationFn = Apollo.MutationFunction<
  CreateNewUserMutation,
  CreateNewUserMutationVariables
>;

/**
 * __useCreateNewUserMutation__
 *
 * To run a mutation, you first call `useCreateNewUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewUserMutation, { data, loading, error }] = useCreateNewUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateNewUserMutation,
    CreateNewUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateNewUserMutation,
    CreateNewUserMutationVariables
  >(CreateNewUserDocument, options);
}
export type CreateNewUserMutationHookResult = ReturnType<
  typeof useCreateNewUserMutation
>;
export type CreateNewUserMutationResult =
  Apollo.MutationResult<CreateNewUserMutation>;
export type CreateNewUserMutationOptions = Apollo.BaseMutationOptions<
  CreateNewUserMutation,
  CreateNewUserMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation UpdateUser($data: UserInput!, $userId: Float!) {
    updateUser(data: $data, userId: $userId) {
      id
      firstname
      lastname
      email
      password
      roles {
        id
      }
      commissions {
        id
      }
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options,
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const GetUsersDocument = gql`
  query GetUsers($limit: Int!, $offset: Int!) {
    getUsers(limit: $limit, offset: $offset) {
      users {
        id
        firstname
        lastname
        email
        password
        roles {
          id
          label
        }
        commissions {
          id
          name
        }
      }
      totalCount
    }
  }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables> &
    ({ variables: GetUsersQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export function useGetUsersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>;
export type GetUsersSuspenseQueryHookResult = ReturnType<
  typeof useGetUsersSuspenseQuery
>;
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>;
export const GetRolesDocument = gql`
  query GetRoles {
    getRoles {
      id
      label
    }
  }
`;

/**
 * __useGetRolesQuery__
 *
 * To run a query within a React component, call `useGetRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRolesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetRolesQuery, GetRolesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetRolesQuery, GetRolesQueryVariables>(
    GetRolesDocument,
    options,
  );
}
export function useGetRolesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRolesQuery,
    GetRolesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetRolesQuery, GetRolesQueryVariables>(
    GetRolesDocument,
    options,
  );
}
export function useGetRolesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetRolesQuery, GetRolesQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetRolesQuery, GetRolesQueryVariables>(
    GetRolesDocument,
    options,
  );
}
export type GetRolesQueryHookResult = ReturnType<typeof useGetRolesQuery>;
export type GetRolesLazyQueryHookResult = ReturnType<
  typeof useGetRolesLazyQuery
>;
export type GetRolesSuspenseQueryHookResult = ReturnType<
  typeof useGetRolesSuspenseQuery
>;
export type GetRolesQueryResult = Apollo.QueryResult<
  GetRolesQuery,
  GetRolesQueryVariables
>;
export const GetInvoicesDocument = gql`
  query GetInvoices {
    getInvoices {
      id
      price_without_vat
      label
      receipt
      info
      paid
      date
      invoiceNumber
      status {
        id
        label
      }
      vat {
        id
        rate
      }
      creditDebit {
        id
        label
      }
      subcategory {
        id
        label
      }
      commission {
        id
        name
      }
      bankAccount {
        id
        name
      }
      user {
        id
        firstname
        lastname
      }
    }
  }
`;

/**
 * __useGetInvoicesQuery__
 *
 * To run a query within a React component, call `useGetInvoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInvoicesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetInvoicesQuery,
    GetInvoicesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetInvoicesQuery, GetInvoicesQueryVariables>(
    GetInvoicesDocument,
    options,
  );
}
export function useGetInvoicesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetInvoicesQuery,
    GetInvoicesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetInvoicesQuery, GetInvoicesQueryVariables>(
    GetInvoicesDocument,
    options,
  );
}
export function useGetInvoicesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetInvoicesQuery,
        GetInvoicesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetInvoicesQuery, GetInvoicesQueryVariables>(
    GetInvoicesDocument,
    options,
  );
}
export type GetInvoicesQueryHookResult = ReturnType<typeof useGetInvoicesQuery>;
export type GetInvoicesLazyQueryHookResult = ReturnType<
  typeof useGetInvoicesLazyQuery
>;
export type GetInvoicesSuspenseQueryHookResult = ReturnType<
  typeof useGetInvoicesSuspenseQuery
>;
export type GetInvoicesQueryResult = Apollo.QueryResult<
  GetInvoicesQuery,
  GetInvoicesQueryVariables
>;
export const GetCategoriesDocument = gql`
  query GetCategories {
    getCategories {
      id
      label
      subcategories {
        id
        label
        code
      }
      creditDebit {
        id
        label
      }
    }
  }
`;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GetCategoriesDocument,
    options,
  );
}
export function useGetCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GetCategoriesDocument,
    options,
  );
}
export function useGetCategoriesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetCategoriesQuery,
        GetCategoriesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(GetCategoriesDocument, options);
}
export type GetCategoriesQueryHookResult = ReturnType<
  typeof useGetCategoriesQuery
>;
export type GetCategoriesLazyQueryHookResult = ReturnType<
  typeof useGetCategoriesLazyQuery
>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<
  typeof useGetCategoriesSuspenseQuery
>;
export type GetCategoriesQueryResult = Apollo.QueryResult<
  GetCategoriesQuery,
  GetCategoriesQueryVariables
>;
export const GetVatsDocument = gql`
  query GetVats {
    getVats {
      id
      label
      rate
      invoices {
        id
        label
      }
    }
  }
`;

/**
 * __useGetVatsQuery__
 *
 * To run a query within a React component, call `useGetVatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetVatsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetVatsQuery, GetVatsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetVatsQuery, GetVatsQueryVariables>(
    GetVatsDocument,
    options,
  );
}
export function useGetVatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetVatsQuery,
    GetVatsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetVatsQuery, GetVatsQueryVariables>(
    GetVatsDocument,
    options,
  );
}
export function useGetVatsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetVatsQuery, GetVatsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetVatsQuery, GetVatsQueryVariables>(
    GetVatsDocument,
    options,
  );
}
export type GetVatsQueryHookResult = ReturnType<typeof useGetVatsQuery>;
export type GetVatsLazyQueryHookResult = ReturnType<typeof useGetVatsLazyQuery>;
export type GetVatsSuspenseQueryHookResult = ReturnType<
  typeof useGetVatsSuspenseQuery
>;
export type GetVatsQueryResult = Apollo.QueryResult<
  GetVatsQuery,
  GetVatsQueryVariables
>;
export const GetCommissionsDocument = gql`
  query GetCommissions {
    getCommissions {
      id
      name
    }
  }
`;

/**
 * __useGetCommissionsQuery__
 *
 * To run a query within a React component, call `useGetCommissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommissionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCommissionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCommissionsQuery,
    GetCommissionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCommissionsQuery, GetCommissionsQueryVariables>(
    GetCommissionsDocument,
    options,
  );
}
export function useGetCommissionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCommissionsQuery,
    GetCommissionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCommissionsQuery, GetCommissionsQueryVariables>(
    GetCommissionsDocument,
    options,
  );
}
export function useGetCommissionsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetCommissionsQuery,
        GetCommissionsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetCommissionsQuery,
    GetCommissionsQueryVariables
  >(GetCommissionsDocument, options);
}
export type GetCommissionsQueryHookResult = ReturnType<
  typeof useGetCommissionsQuery
>;
export type GetCommissionsLazyQueryHookResult = ReturnType<
  typeof useGetCommissionsLazyQuery
>;
export type GetCommissionsSuspenseQueryHookResult = ReturnType<
  typeof useGetCommissionsSuspenseQuery
>;
export type GetCommissionsQueryResult = Apollo.QueryResult<
  GetCommissionsQuery,
  GetCommissionsQueryVariables
>;
export const GetInvoicesByCommissionIdDocument = gql`
  query GetInvoicesByCommissionId(
    $commissionId: Float!
    $offset: Float!
    $limit: Float!
  ) {
    getInvoicesByCommissionId(
      commissionId: $commissionId
      offset: $offset
      limit: $limit
    ) {
      invoices {
        date
        id
        invoiceNumber
        label
        price_without_vat
        status {
          label
          id
        }
        vat {
          rate
          label
          id
        }
        creditDebit {
          label
          id
        }
      }
      totalCount
    }
  }
`;

/**
 * __useGetInvoicesByCommissionIdQuery__
 *
 * To run a query within a React component, call `useGetInvoicesByCommissionIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoicesByCommissionIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoicesByCommissionIdQuery({
 *   variables: {
 *      commissionId: // value for 'commissionId'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetInvoicesByCommissionIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetInvoicesByCommissionIdQuery,
    GetInvoicesByCommissionIdQueryVariables
  > &
    (
      | { variables: GetInvoicesByCommissionIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetInvoicesByCommissionIdQuery,
    GetInvoicesByCommissionIdQueryVariables
  >(GetInvoicesByCommissionIdDocument, options);
}
export function useGetInvoicesByCommissionIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetInvoicesByCommissionIdQuery,
    GetInvoicesByCommissionIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetInvoicesByCommissionIdQuery,
    GetInvoicesByCommissionIdQueryVariables
  >(GetInvoicesByCommissionIdDocument, options);
}
export function useGetInvoicesByCommissionIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetInvoicesByCommissionIdQuery,
        GetInvoicesByCommissionIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetInvoicesByCommissionIdQuery,
    GetInvoicesByCommissionIdQueryVariables
  >(GetInvoicesByCommissionIdDocument, options);
}
export type GetInvoicesByCommissionIdQueryHookResult = ReturnType<
  typeof useGetInvoicesByCommissionIdQuery
>;
export type GetInvoicesByCommissionIdLazyQueryHookResult = ReturnType<
  typeof useGetInvoicesByCommissionIdLazyQuery
>;
export type GetInvoicesByCommissionIdSuspenseQueryHookResult = ReturnType<
  typeof useGetInvoicesByCommissionIdSuspenseQuery
>;
export type GetInvoicesByCommissionIdQueryResult = Apollo.QueryResult<
  GetInvoicesByCommissionIdQuery,
  GetInvoicesByCommissionIdQueryVariables
>;
export const GetUserByIdDocument = gql`
  query GetUserById($userId: Float!) {
    getUserById(userId: $userId) {
      id
      email
      firstname
      lastname
      roles {
        id
        label
      }
      commissions {
        id
        name
      }
    }
  }
`;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUserByIdQuery,
    GetUserByIdQueryVariables
  > &
    (
      | { variables: GetUserByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(
    GetUserByIdDocument,
    options,
  );
}
export function useGetUserByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserByIdQuery,
    GetUserByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(
    GetUserByIdDocument,
    options,
  );
}
export function useGetUserByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetUserByIdQuery,
        GetUserByIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(
    GetUserByIdDocument,
    options,
  );
}
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<
  typeof useGetUserByIdLazyQuery
>;
export type GetUserByIdSuspenseQueryHookResult = ReturnType<
  typeof useGetUserByIdSuspenseQuery
>;
export type GetUserByIdQueryResult = Apollo.QueryResult<
  GetUserByIdQuery,
  GetUserByIdQueryVariables
>;
export const namedOperations = {
  Query: {
    GetUsers: "GetUsers",
    GetRoles: "GetRoles",
    GetInvoices: "GetInvoices",
    GetCategories: "GetCategories",
    GetVats: "GetVats",
    GetCommissions: "GetCommissions",
    GetInvoicesByCommissionId: "GetInvoicesByCommissionId",
    GetUserById: "GetUserById",
  },
  Mutation: {
    AddCategory: "AddCategory",
    AddSubcategory: "AddSubcategory",
    CreateNewUser: "CreateNewUser",
    UpdateUser: "UpdateUser",
  },
};
