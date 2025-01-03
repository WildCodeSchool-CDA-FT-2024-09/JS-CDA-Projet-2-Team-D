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
  DateTimeISO: { input: string; output: string };
};

export type AuthenticatedUserResponse = {
  __typename?: "AuthenticatedUserResponse";
  email: Scalars["String"]["output"];
  firstname: Scalars["String"]["output"];
  id: Scalars["Float"]["output"];
  lastname: Scalars["String"]["output"];
  roles: Array<UserRoleInput>;
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

export type BudgetOverview = {
  __typename?: "BudgetOverview";
  budgets: Array<Budget>;
  globalBudget: Scalars["Float"]["output"];
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

export type DeleteResponseStatus = {
  __typename?: "DeleteResponseStatus";
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type Exercise = {
  __typename?: "Exercise";
  budgets: Array<Budget>;
  end_date: Scalars["DateTimeISO"]["output"];
  id: Scalars["Int"]["output"];
  label: Scalars["String"]["output"];
  start_date: Scalars["DateTimeISO"]["output"];
};

export type ExerciseInput = {
  end_date: Scalars["DateTimeISO"]["input"];
  label: Scalars["String"]["input"];
  start_date: Scalars["DateTimeISO"]["input"];
};

export type ExerciseInput = {
  end_date: Scalars["String"]["input"];
  label: Scalars["String"]["input"];
  start_date: Scalars["String"]["input"];
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

export type LoginResponse = {
  __typename?: "LoginResponse";
  email: Scalars["String"]["output"];
  firstname: Scalars["String"]["output"];
  id: Scalars["Float"]["output"];
  lastname: Scalars["String"]["output"];
  roles: Array<UserRoleInput>;
  token: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  addCategory: Category;
  addSubcategory: Subcategory;
  createNewExercise: Exercise;
  createNewUser: User;
  login: LoginResponse;
  logout: Scalars["String"]["output"];
  restoreUser: RestoreResponseStatus;
  softDeleteUser: DeleteResponseStatus;
  updateCategory: Category;
  updateSubcategory: Subcategory;
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

export type MutationCreateNewExerciseArgs = {
  data: ExerciseInput;
};

export type MutationCreateNewUserArgs = {
  data: UserInput;
};

export type MutationLoginArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationRestoreUserArgs = {
  data: UserIdInput;
};

export type MutationSoftDeleteUserArgs = {
  data: UserIdInput;
};

export type MutationUpdateCategoryArgs = {
  creditDebitId: Scalars["Float"]["input"];
  id: Scalars["Float"]["input"];
  label: Scalars["String"]["input"];
};

export type MutationUpdateSubcategoryArgs = {
  categoryId: Scalars["Float"]["input"];
  code: Scalars["String"]["input"];
  id: Scalars["Float"]["input"];
  label: Scalars["String"]["input"];
};

export type MutationUpdateUserArgs = {
  data: UserInput;
  userId: Scalars["Float"]["input"];
};

export type PaginatedInvoices = {
  __typename?: "PaginatedInvoices";
  invoices: Array<Invoice>;
  totalAmount: Scalars["Float"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type PaginatedUsers = {
  __typename?: "PaginatedUsers";
  totalCount: Scalars["Int"]["output"];
  users: Array<User>;
};

export type Query = {
  __typename?: "Query";
  getAuthenticatedUser: AuthenticatedUserResponse;
  getBankAccounts: Array<BankAccount>;
  getBanks: Array<Bank>;
  getBudgetOverview: BudgetOverview;
  getCategories: Array<Category>;
  getCommissions: Array<Commission>;
  getCreditDebits: Array<CreditDebit>;
  getCurrentBudgetByCommissionID?: Maybe<Budget>;
  getExercises: Array<Exercise>;
  getInvoices: Array<Invoice>;
  getInvoicesByCommissionId: PaginatedInvoices;
  getRoles: Array<Role>;
  getStatus: Array<Status>;
  getSubcategories: Array<Subcategory>;
  getUserById: User;
  getUsers: PaginatedUsers;
  getVats: Array<Vat>;
};

export type QueryGetCurrentBudgetByCommissionIdArgs = {
  commissionId: Scalars["Int"]["input"];
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

export type RestoreResponseStatus = {
  __typename?: "RestoreResponseStatus";
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
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
  deletedAt?: Maybe<Scalars["String"]["output"]>;
  email: Scalars["String"]["output"];
  firstname: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  invoices: Array<Invoice>;
  lastname: Scalars["String"]["output"];
  password: Scalars["String"]["output"];
  roles: Array<Role>;
};

export type UserIdInput = {
  id: Scalars["Float"]["input"];
};

export type UserInput = {
  commissions: Array<CommissionsInput>;
  deletedAt?: InputMaybe<Scalars["String"]["input"]>;
  email: Scalars["String"]["input"];
  firstname: Scalars["String"]["input"];
  lastname: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  roles: Array<RolesInput>;
};

export type UserRoleInput = {
  __typename?: "UserRoleInput";
  id: Scalars["Float"]["output"];
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
  addCategory: {
    __typename?: "Category";
    label: string;
    creditDebit: { __typename?: "CreditDebit"; id: number };
  };
};

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars["Float"]["input"];
  label: Scalars["String"]["input"];
  creditDebitId: Scalars["Float"]["input"];
}>;

export type UpdateCategoryMutation = {
  __typename?: "Mutation";
  updateCategory: {
    __typename?: "Category";
    id: number;
    label: string;
    creditDebit: { __typename?: "CreditDebit"; id: number };
  };
};

export type UpdateSubcategoryMutationVariables = Exact<{
  id: Scalars["Float"]["input"];
  label: Scalars["String"]["input"];
  code: Scalars["String"]["input"];
  categoryId: Scalars["Float"]["input"];
}>;

export type UpdateSubcategoryMutation = {
  __typename?: "Mutation";
  updateSubcategory: {
    __typename?: "Subcategory";
    id: number;
    label: string;
    code: string;
  };
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

export type SoftDeleteUserMutationVariables = Exact<{
  data: UserIdInput;
}>;

export type SoftDeleteUserMutation = {
  __typename?: "Mutation";
  softDeleteUser: {
    __typename?: "DeleteResponseStatus";
    message?: string | null;
    success: boolean;
  };
};

export type RestoreUserMutationVariables = Exact<{
  data: UserIdInput;
}>;

export type RestoreUserMutation = {
  __typename?: "Mutation";
  restoreUser: {
    __typename?: "RestoreResponseStatus";
    message?: string | null;
    success: boolean;
  };
};

export type LoginMutationVariables = Exact<{
  password: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "LoginResponse";
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    token: string;
    roles: Array<{ __typename?: "UserRoleInput"; id: number }>;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: string };

export type CreateNewExerciseMutationVariables = Exact<{
  data: ExerciseInput;
}>;

export type CreateNewExerciseMutation = {
  __typename?: "Mutation";
  createNewExercise: {
    __typename?: "Exercise";
    id: number;
    label: string;
    start_date: string;
    end_date: string;
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
      deletedAt?: string | null;
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
    date: string;
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
    totalAmount: number;
    invoices: Array<{
      __typename?: "Invoice";
      date: string;
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

export type GetCurrentBudgetByCommissionIdQueryVariables = Exact<{
  commissionId: Scalars["Int"]["input"];
}>;

export type GetCurrentBudgetByCommissionIdQuery = {
  __typename?: "Query";
  getCurrentBudgetByCommissionID?: {
    __typename?: "Budget";
    amount: number;
  } | null;
};

export type GetAuthenticatedUserQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetAuthenticatedUserQuery = {
  __typename?: "Query";
  getAuthenticatedUser: {
    __typename?: "AuthenticatedUserResponse";
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    roles: Array<{ __typename?: "UserRoleInput"; id: number }>;
  };
};

export const AddCategoryDocument = gql`
  mutation AddCategory($label: String!, $creditDebitId: Float!) {
    addCategory(label: $label, creditDebitId: $creditDebitId) {
      creditDebit {
        id
      }
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
export const UpdateCategoryDocument = gql`
  mutation UpdateCategory(
    $id: Float!
    $label: String!
    $creditDebitId: Float!
  ) {
    updateCategory(id: $id, label: $label, creditDebitId: $creditDebitId) {
      id
      label
      creditDebit {
        id
      }
    }
  }
`;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      label: // value for 'label'
 *      creditDebitId: // value for 'creditDebitId'
 *   },
 * });
 */
export function useUpdateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >(UpdateCategoryDocument, options);
}
export type UpdateCategoryMutationHookResult = ReturnType<
  typeof useUpdateCategoryMutation
>;
export type UpdateCategoryMutationResult =
  Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>;
export const UpdateSubcategoryDocument = gql`
  mutation UpdateSubcategory(
    $id: Float!
    $label: String!
    $code: String!
    $categoryId: Float!
  ) {
    updateSubcategory(
      id: $id
      label: $label
      code: $code
      categoryId: $categoryId
    ) {
      id
      label
      code
    }
  }
`;
export type UpdateSubcategoryMutationFn = Apollo.MutationFunction<
  UpdateSubcategoryMutation,
  UpdateSubcategoryMutationVariables
>;

/**
 * __useUpdateSubcategoryMutation__
 *
 * To run a mutation, you first call `useUpdateSubcategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubcategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubcategoryMutation, { data, loading, error }] = useUpdateSubcategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      label: // value for 'label'
 *      code: // value for 'code'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useUpdateSubcategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateSubcategoryMutation,
    UpdateSubcategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateSubcategoryMutation,
    UpdateSubcategoryMutationVariables
  >(UpdateSubcategoryDocument, options);
}
export type UpdateSubcategoryMutationHookResult = ReturnType<
  typeof useUpdateSubcategoryMutation
>;
export type UpdateSubcategoryMutationResult =
  Apollo.MutationResult<UpdateSubcategoryMutation>;
export type UpdateSubcategoryMutationOptions = Apollo.BaseMutationOptions<
  UpdateSubcategoryMutation,
  UpdateSubcategoryMutationVariables
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
export const SoftDeleteUserDocument = gql`
  mutation SoftDeleteUser($data: UserIdInput!) {
    softDeleteUser(data: $data) {
      message
      success
    }
  }
`;
export type SoftDeleteUserMutationFn = Apollo.MutationFunction<
  SoftDeleteUserMutation,
  SoftDeleteUserMutationVariables
>;

/**
 * __useSoftDeleteUserMutation__
 *
 * To run a mutation, you first call `useSoftDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSoftDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [softDeleteUserMutation, { data, loading, error }] = useSoftDeleteUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSoftDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SoftDeleteUserMutation,
    SoftDeleteUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SoftDeleteUserMutation,
    SoftDeleteUserMutationVariables
  >(SoftDeleteUserDocument, options);
}
export type SoftDeleteUserMutationHookResult = ReturnType<
  typeof useSoftDeleteUserMutation
>;
export type SoftDeleteUserMutationResult =
  Apollo.MutationResult<SoftDeleteUserMutation>;
export type SoftDeleteUserMutationOptions = Apollo.BaseMutationOptions<
  SoftDeleteUserMutation,
  SoftDeleteUserMutationVariables
>;
export const RestoreUserDocument = gql`
  mutation RestoreUser($data: UserIdInput!) {
    restoreUser(data: $data) {
      message
      success
    }
  }
`;
export type RestoreUserMutationFn = Apollo.MutationFunction<
  RestoreUserMutation,
  RestoreUserMutationVariables
>;

/**
 * __useRestoreUserMutation__
 *
 * To run a mutation, you first call `useRestoreUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreUserMutation, { data, loading, error }] = useRestoreUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRestoreUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RestoreUserMutation,
    RestoreUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RestoreUserMutation, RestoreUserMutationVariables>(
    RestoreUserDocument,
    options,
  );
}
export type RestoreUserMutationHookResult = ReturnType<
  typeof useRestoreUserMutation
>;
export type RestoreUserMutationResult =
  Apollo.MutationResult<RestoreUserMutation>;
export type RestoreUserMutationOptions = Apollo.BaseMutationOptions<
  RestoreUserMutation,
  RestoreUserMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      id
      firstname
      lastname
      email
      roles {
        id
      }
      token
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options,
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const CreateNewExerciseDocument = gql`
  mutation CreateNewExercise($data: ExerciseInput!) {
    createNewExercise(data: $data) {
      id
      label
      start_date
      end_date
    }
  }
`;
export type CreateNewExerciseMutationFn = Apollo.MutationFunction<
  CreateNewExerciseMutation,
  CreateNewExerciseMutationVariables
>;

/**
 * __useCreateNewExerciseMutation__
 *
 * To run a mutation, you first call `useCreateNewExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewExerciseMutation, { data, loading, error }] = useCreateNewExerciseMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewExerciseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateNewExerciseMutation,
    CreateNewExerciseMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateNewExerciseMutation,
    CreateNewExerciseMutationVariables
  >(CreateNewExerciseDocument, options);
}
export type CreateNewExerciseMutationHookResult = ReturnType<
  typeof useCreateNewExerciseMutation
>;
export type CreateNewExerciseMutationResult =
  Apollo.MutationResult<CreateNewExerciseMutation>;
export type CreateNewExerciseMutationOptions = Apollo.BaseMutationOptions<
  CreateNewExerciseMutation,
  CreateNewExerciseMutationVariables
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
        deletedAt
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
      totalAmount
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
export const GetCurrentBudgetByCommissionIdDocument = gql`
  query GetCurrentBudgetByCommissionID($commissionId: Int!) {
    getCurrentBudgetByCommissionID(commissionId: $commissionId) {
      amount
    }
  }
`;

/**
 * __useGetCurrentBudgetByCommissionIdQuery__
 *
 * To run a query within a React component, call `useGetCurrentBudgetByCommissionIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentBudgetByCommissionIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentBudgetByCommissionIdQuery({
 *   variables: {
 *      commissionId: // value for 'commissionId'
 *   },
 * });
 */
export function useGetCurrentBudgetByCommissionIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCurrentBudgetByCommissionIdQuery,
    GetCurrentBudgetByCommissionIdQueryVariables
  > &
    (
      | {
          variables: GetCurrentBudgetByCommissionIdQueryVariables;
          skip?: boolean;
        }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCurrentBudgetByCommissionIdQuery,
    GetCurrentBudgetByCommissionIdQueryVariables
  >(GetCurrentBudgetByCommissionIdDocument, options);
}
export function useGetCurrentBudgetByCommissionIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentBudgetByCommissionIdQuery,
    GetCurrentBudgetByCommissionIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCurrentBudgetByCommissionIdQuery,
    GetCurrentBudgetByCommissionIdQueryVariables
  >(GetCurrentBudgetByCommissionIdDocument, options);
}
export function useGetCurrentBudgetByCommissionIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetCurrentBudgetByCommissionIdQuery,
        GetCurrentBudgetByCommissionIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetCurrentBudgetByCommissionIdQuery,
    GetCurrentBudgetByCommissionIdQueryVariables
  >(GetCurrentBudgetByCommissionIdDocument, options);
}
export type GetCurrentBudgetByCommissionIdQueryHookResult = ReturnType<
  typeof useGetCurrentBudgetByCommissionIdQuery
>;
export type GetCurrentBudgetByCommissionIdLazyQueryHookResult = ReturnType<
  typeof useGetCurrentBudgetByCommissionIdLazyQuery
>;
export type GetCurrentBudgetByCommissionIdSuspenseQueryHookResult = ReturnType<
  typeof useGetCurrentBudgetByCommissionIdSuspenseQuery
>;
export type GetCurrentBudgetByCommissionIdQueryResult = Apollo.QueryResult<
  GetCurrentBudgetByCommissionIdQuery,
  GetCurrentBudgetByCommissionIdQueryVariables
>;
export const GetAuthenticatedUserDocument = gql`
  query GetAuthenticatedUser {
    getAuthenticatedUser {
      id
      firstname
      lastname
      email
      roles {
        id
      }
    }
  }
`;

/**
 * __useGetAuthenticatedUserQuery__
 *
 * To run a query within a React component, call `useGetAuthenticatedUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthenticatedUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthenticatedUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAuthenticatedUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAuthenticatedUserQuery,
    GetAuthenticatedUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAuthenticatedUserQuery,
    GetAuthenticatedUserQueryVariables
  >(GetAuthenticatedUserDocument, options);
}
export function useGetAuthenticatedUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAuthenticatedUserQuery,
    GetAuthenticatedUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAuthenticatedUserQuery,
    GetAuthenticatedUserQueryVariables
  >(GetAuthenticatedUserDocument, options);
}
export function useGetAuthenticatedUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAuthenticatedUserQuery,
        GetAuthenticatedUserQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAuthenticatedUserQuery,
    GetAuthenticatedUserQueryVariables
  >(GetAuthenticatedUserDocument, options);
}
export type GetAuthenticatedUserQueryHookResult = ReturnType<
  typeof useGetAuthenticatedUserQuery
>;
export type GetAuthenticatedUserLazyQueryHookResult = ReturnType<
  typeof useGetAuthenticatedUserLazyQuery
>;
export type GetAuthenticatedUserSuspenseQueryHookResult = ReturnType<
  typeof useGetAuthenticatedUserSuspenseQuery
>;
export type GetAuthenticatedUserQueryResult = Apollo.QueryResult<
  GetAuthenticatedUserQuery,
  GetAuthenticatedUserQueryVariables
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
    GetCurrentBudgetByCommissionID: "GetCurrentBudgetByCommissionID",
    GetAuthenticatedUser: "GetAuthenticatedUser",
  },
  Mutation: {
    AddCategory: "AddCategory",
    UpdateCategory: "UpdateCategory",
    UpdateSubcategory: "UpdateSubcategory",
    AddSubcategory: "AddSubcategory",
    CreateNewUser: "CreateNewUser",
    UpdateUser: "UpdateUser",
    SoftDeleteUser: "SoftDeleteUser",
    RestoreUser: "RestoreUser",
    Login: "Login",
    Logout: "Logout",
    CreateNewExercise: "CreateNewExercise",
  },
};
