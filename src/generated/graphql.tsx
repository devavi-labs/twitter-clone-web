import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  quacks?: Maybe<Array<Quack>>;
  quacksFromFollowings?: Maybe<Array<Quack>>;
  me?: Maybe<User>;
  user?: Maybe<User>;
};


export type QueryQuacksFromFollowingsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  userId: Scalars['String'];
};

export type Quack = {
  __typename?: 'Quack';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  isVisible: Scalars['Boolean'];
  text: Scalars['String'];
  truncatedText?: Maybe<Scalars['String']>;
  urls?: Maybe<Array<Scalars['String']>>;
  quackedByUserId: Scalars['String'];
  quackedByUser: User;
  inReplyToQuackId?: Maybe<Scalars['String']>;
  inReplyToQuack?: Maybe<Quack>;
  replies?: Maybe<Array<Quack>>;
  requacks?: Maybe<Array<Requack>>;
  likes?: Maybe<Array<Like>>;
  requackStatus: Scalars['Boolean'];
  likeStatus: Scalars['Boolean'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  displayName: Scalars['String'];
  displayPicture: Scalars['String'];
  coverPicture: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  amIDeactivated: Scalars['Boolean'];
  quacks?: Maybe<Array<Quack>>;
  requacks?: Maybe<Array<Requack>>;
  likes?: Maybe<Array<Like>>;
  followers?: Maybe<Array<User>>;
  followings?: Maybe<Array<User>>;
  haveIBlockedThisUser?: Maybe<Scalars['Boolean']>;
  amIBlockedByThisUser?: Maybe<Scalars['Boolean']>;
};

export type Requack = {
  __typename?: 'Requack';
  id: Scalars['Float'];
  quackId: Scalars['String'];
  quack: Quack;
  userId: Scalars['String'];
  user: User;
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['Float'];
  quackId: Scalars['String'];
  quack: Quack;
  userId: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  block: Scalars['Boolean'];
  unblock: Scalars['Boolean'];
  follow: Scalars['Boolean'];
  unfollow: Scalars['Boolean'];
  like: Scalars['Boolean'];
  quack: QuackResponse;
  deleteQuack: Scalars['Boolean'];
  requack: Scalars['Boolean'];
  signup: UserResponse;
  login: UserResponse;
  sendEmailVerificationLink: Scalars['Boolean'];
  verifyEmail: UserResponse;
  forgotPassword: Scalars['Boolean'];
  changePasswordWithToken: UserResponse;
  changePasswordWithOldPassword: UserResponse;
  deactivate?: Maybe<UserResponse>;
  activate?: Maybe<UserResponse>;
  logout: Scalars['Boolean'];
};


export type MutationBlockArgs = {
  userId: Scalars['String'];
};


export type MutationUnblockArgs = {
  userId: Scalars['String'];
};


export type MutationFollowArgs = {
  userId: Scalars['String'];
};


export type MutationUnfollowArgs = {
  userId: Scalars['String'];
};


export type MutationLikeArgs = {
  quackId: Scalars['String'];
};


export type MutationQuackArgs = {
  input: QuackInput;
};


export type MutationDeleteQuackArgs = {
  quackId: Scalars['String'];
};


export type MutationRequackArgs = {
  quackId: Scalars['String'];
};


export type MutationSignupArgs = {
  input: UserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  emailOrUsername: Scalars['String'];
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordWithTokenArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationChangePasswordWithOldPasswordArgs = {
  newPassword: Scalars['String'];
  password: Scalars['String'];
};


export type MutationDeactivateArgs = {
  password: Scalars['String'];
};

export type QuackResponse = {
  __typename?: 'QuackResponse';
  quack?: Maybe<Quack>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type QuackInput = {
  text: Scalars['String'];
  inReplyToQuackId?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FieldError>>;
};

export type UserInput = {
  displayName: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegularFieldErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'displayName' | 'username' | 'displayPicture' | 'coverPicture' | 'emailVerified' | 'amIDeactivated'>
  & { followers?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'displayName' | 'username' | 'emailVerified' | 'displayPicture'>
  )>>, followings?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'displayName' | 'username' | 'emailVerified' | 'displayPicture'>
  )>>, quacks?: Maybe<Array<(
    { __typename?: 'Quack' }
    & Pick<Quack, 'id' | 'text' | 'truncatedText' | 'urls' | 'isVisible'>
    & { likes?: Maybe<Array<(
      { __typename?: 'Like' }
      & Pick<Like, 'id'>
    )>>, requacks?: Maybe<Array<(
      { __typename?: 'Requack' }
      & Pick<Requack, 'id'>
    )>>, replies?: Maybe<Array<(
      { __typename?: 'Quack' }
      & Pick<Quack, 'id'>
    )>> }
  )>>, requacks?: Maybe<Array<(
    { __typename?: 'Requack' }
    & { quack: (
      { __typename?: 'Quack' }
      & Pick<Quack, 'id' | 'text' | 'truncatedText' | 'urls' | 'isVisible'>
      & { likes?: Maybe<Array<(
        { __typename?: 'Like' }
        & Pick<Like, 'id'>
      )>>, requacks?: Maybe<Array<(
        { __typename?: 'Requack' }
        & Pick<Requack, 'id'>
      )>>, replies?: Maybe<Array<(
        { __typename?: 'Quack' }
        & Pick<Quack, 'id'>
      )>> }
    ) }
  )>>, likes?: Maybe<Array<(
    { __typename?: 'Like' }
    & { quack: (
      { __typename?: 'Quack' }
      & Pick<Quack, 'id' | 'text' | 'truncatedText' | 'urls' | 'isVisible'>
      & { likes?: Maybe<Array<(
        { __typename?: 'Like' }
        & Pick<Like, 'id'>
      )>>, requacks?: Maybe<Array<(
        { __typename?: 'Requack' }
        & Pick<Requack, 'id'>
      )>>, replies?: Maybe<Array<(
        { __typename?: 'Quack' }
        & Pick<Quack, 'id'>
      )>> }
    ) }
  )>> }
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & Pick<UserResponse, 'accessToken' | 'refreshToken'>
  & { user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>, errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularFieldErrorFragment
  )>> }
);

export type LoginMutationVariables = Exact<{
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type SignupMutationVariables = Exact<{
  input: UserInput;
}>;


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & { signup: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  displayName
  username
  displayPicture
  coverPicture
  emailVerified
  followers {
    id
    displayName
    username
    emailVerified
    displayPicture
  }
  followings {
    id
    displayName
    username
    emailVerified
    displayPicture
  }
  amIDeactivated
  quacks {
    id
    text
    truncatedText
    urls
    isVisible
    likes {
      id
    }
    requacks {
      id
    }
    replies {
      id
    }
  }
  requacks {
    quack {
      id
      text
      truncatedText
      urls
      isVisible
      likes {
        id
      }
      requacks {
        id
      }
      replies {
        id
      }
    }
  }
  likes {
    quack {
      id
      text
      truncatedText
      urls
      isVisible
      likes {
        id
      }
      requacks {
        id
      }
      replies {
        id
      }
    }
  }
}
    `;
export const RegularFieldErrorFragmentDoc = gql`
    fragment RegularFieldError on FieldError {
  field
  message
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  user {
    ...RegularUser
  }
  accessToken
  refreshToken
  errors {
    ...RegularFieldError
  }
}
    ${RegularUserFragmentDoc}
${RegularFieldErrorFragmentDoc}`;
export const LoginDocument = gql`
    mutation Login($emailOrUsername: String!, $password: String!) {
  login(emailOrUsername: $emailOrUsername, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const SignupDocument = gql`
    mutation Signup($input: UserInput!) {
  signup(input: $input) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};