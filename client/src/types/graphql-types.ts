import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Bank = {
  __typename?: 'Bank';
  bankAccounts: Array<BankAccount>;
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
};

export type BankAccount = {
  __typename?: 'BankAccount';
  account_number: Scalars['String']['output'];
  balance: Scalars['Float']['output'];
  bank: Bank;
  id: Scalars['Int']['output'];
  invoices: Array<Invoice>;
  name: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  creditDebit: CreditDebit;
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
  subcategories: Array<Subcategory>;
};

export type Commission = {
  __typename?: 'Commission';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  users: Array<User>;
};

export type CreditDebit = {
  __typename?: 'CreditDebit';
  categories: Category;
  id: Scalars['Float']['output'];
  invoices: Array<Invoice>;
  label: Scalars['String']['output'];
};

export type Invoice = {
  __typename?: 'Invoice';
  bankAccount: BankAccount;
  commission: Commission;
  creditDebit: CreditDebit;
  id: Scalars['Float']['output'];
  info: Scalars['String']['output'];
  label: Scalars['String']['output'];
  paid: Scalars['Boolean']['output'];
  price_without_vat: Scalars['Float']['output'];
  receipt: Scalars['String']['output'];
  status: Status;
  subcategory: Subcategory;
  user: User;
  vat: Vat;
};

export type Query = {
  __typename?: 'Query';
  getBankAccounts: Array<BankAccount>;
  getBanks: Array<Bank>;
  getCategories: Array<Category>;
  getCommissions: Array<Commission>;
  getCreditDebits: Array<CreditDebit>;
  getInvoices: Array<Invoice>;
  getRoles: Array<Role>;
  getStatuss: Array<Status>;
  getSubcategories: Array<Subcategory>;
  getUsers: Array<User>;
  getVats: Array<Vat>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
  users: Array<User>;
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['Float']['output'];
  invoices: Array<Invoice>;
  label: Scalars['String']['output'];
};

export type Subcategory = {
  __typename?: 'Subcategory';
  category: Category;
  category_id: Scalars['Float']['output'];
  code: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  invoices: Array<Invoice>;
  label: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  commissions: Array<Commission>;
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  invoices: Array<Invoice>;
  lastname: Scalars['String']['output'];
  password: Scalars['String']['output'];
  roles: Array<Role>;
};

export type Vat = {
  __typename?: 'Vat';
  id: Scalars['Float']['output'];
  invoices: Array<Invoice>;
  label: Scalars['String']['output'];
  rate: Scalars['Float']['output'];
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: number, firstname: string, lastname: string, email: string }> };

export type GetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRolesQuery = { __typename?: 'Query', getRoles: Array<{ __typename?: 'Role', id: number, label: string }> };


export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    firstname
    lastname
    email
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
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
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
export function useGetRolesQuery(baseOptions?: Apollo.QueryHookOptions<GetRolesQuery, GetRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, options);
      }
export function useGetRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRolesQuery, GetRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, options);
        }
export function useGetRolesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRolesQuery, GetRolesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, options);
        }
export type GetRolesQueryHookResult = ReturnType<typeof useGetRolesQuery>;
export type GetRolesLazyQueryHookResult = ReturnType<typeof useGetRolesLazyQuery>;
export type GetRolesSuspenseQueryHookResult = ReturnType<typeof useGetRolesSuspenseQuery>;
export type GetRolesQueryResult = Apollo.QueryResult<GetRolesQuery, GetRolesQueryVariables>;
export const namedOperations = {
  Query: {
    GetUsers: 'GetUsers',
    GetRoles: 'GetRoles'
  }
}