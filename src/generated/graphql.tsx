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
  news?: Maybe<Array<News>>;
  quackById?: Maybe<Quack>;
  quacksForMe?: Maybe<PaginatedQuacks>;
  search: SearchResponse;
  me?: Maybe<User>;
  userById?: Maybe<User>;
  userByEmail?: Maybe<User>;
  userByUsername?: Maybe<User>;
};


export type QueryNewsArgs = {
  section: Scalars['String'];
};


export type QueryQuackByIdArgs = {
  id: Scalars['Int'];
};


export type QueryQuacksForMeArgs = {
  lastIndex?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QuerySearchArgs = {
  lastIndex?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  fromFollowing?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
  query: Scalars['String'];
};


export type QueryUserByIdArgs = {
  userId: Scalars['String'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};

export type News = {
  __typename?: 'News';
  id: Scalars['Int'];
  publishedAt: Scalars['DateTime'];
  section: Scalars['String'];
  title: Scalars['String'];
  abstract: Scalars['String'];
  author: Scalars['String'];
  thumbnailUrl: Scalars['String'];
  caption: Scalars['String'];
  url: Scalars['String'];
  shortUrl: Scalars['String'];
};


export type Quack = {
  __typename?: 'Quack';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  isVisible: Scalars['Boolean'];
  text: Scalars['String'];
  truncatedText?: Maybe<Scalars['String']>;
  links?: Maybe<Array<Scalars['String']>>;
  mentions?: Maybe<Array<User>>;
  hashtags?: Maybe<Array<Scalars['String']>>;
  quackedByUserId: Scalars['Float'];
  quackedByUser: User;
  inReplyToQuackId?: Maybe<Scalars['Int']>;
  inReplyToQuack?: Maybe<Quack>;
  replies?: Maybe<Array<Quack>>;
  requacks?: Maybe<Array<Requack>>;
  likes?: Maybe<Array<Like>>;
  requackStatus: Scalars['Boolean'];
  likeStatus: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
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
  followers?: Maybe<Array<Follow>>;
  followings?: Maybe<Array<Follow>>;
  haveIBlockedThisUser?: Maybe<Scalars['Boolean']>;
  amIBlockedByThisUser?: Maybe<Scalars['Boolean']>;
  followStatus?: Maybe<Scalars['Boolean']>;
  followBackStatus?: Maybe<Scalars['Boolean']>;
};

export type Requack = {
  __typename?: 'Requack';
  id: Scalars['Int'];
  quackId: Scalars['Float'];
  quack: Quack;
  userId: Scalars['Float'];
  user: User;
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['Float'];
  quackId: Scalars['Float'];
  quack: Quack;
  userId: Scalars['Float'];
  user: User;
};

export type Follow = {
  __typename?: 'Follow';
  id: Scalars['Float'];
  userId: Scalars['Float'];
  user: User;
  followerId: Scalars['Float'];
  follower: User;
};

export type PaginatedQuacks = {
  __typename?: 'PaginatedQuacks';
  quacks?: Maybe<Array<Quack>>;
  hasMore: Scalars['Boolean'];
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  paginatedUsers?: Maybe<PaginatedUsers>;
  paginatedQuacks?: Maybe<PaginatedQuacks>;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  users?: Maybe<Array<User>>;
  hasMore: Scalars['Boolean'];
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
  userId: Scalars['Float'];
};


export type MutationUnblockArgs = {
  userId: Scalars['Float'];
};


export type MutationFollowArgs = {
  userId: Scalars['Float'];
};


export type MutationUnfollowArgs = {
  userId: Scalars['Float'];
};


export type MutationLikeArgs = {
  quackId: Scalars['Float'];
};


export type MutationQuackArgs = {
  input: QuackInput;
};


export type MutationDeleteQuackArgs = {
  quackId: Scalars['String'];
};


export type MutationRequackArgs = {
  quackId: Scalars['Float'];
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
  inReplyToQuackId?: Maybe<Scalars['Int']>;
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

export type RegularQuackFragment = (
  { __typename?: 'Quack' }
  & Pick<Quack, 'id' | 'createdAt' | 'text' | 'truncatedText' | 'links' | 'hashtags' | 'requackStatus' | 'likeStatus'>
  & { mentions?: Maybe<Array<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>>, quackedByUser: (
    { __typename?: 'User' }
    & RegularUserFragment
  ), inReplyToQuack?: Maybe<(
    { __typename?: 'Quack' }
    & Pick<Quack, 'id' | 'createdAt' | 'text' | 'truncatedText' | 'links' | 'hashtags' | 'requackStatus' | 'likeStatus'>
    & { mentions?: Maybe<Array<(
      { __typename?: 'User' }
      & RegularUserFragment
    )>>, quackedByUser: (
      { __typename?: 'User' }
      & RegularUserFragment
    ), replies?: Maybe<Array<(
      { __typename?: 'Quack' }
      & Pick<Quack, 'id'>
    )>>, requacks?: Maybe<Array<(
      { __typename?: 'Requack' }
      & Pick<Requack, 'id'>
    )>>, likes?: Maybe<Array<(
      { __typename?: 'Like' }
      & Pick<Like, 'id'>
    )>> }
  )>, replies?: Maybe<Array<(
    { __typename?: 'Quack' }
    & Pick<Quack, 'id'>
  )>>, requacks?: Maybe<Array<(
    { __typename?: 'Requack' }
    & Pick<Requack, 'id'>
  )>>, likes?: Maybe<Array<(
    { __typename?: 'Like' }
    & Pick<Like, 'id'>
  )>> }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'displayName' | 'username' | 'displayPicture' | 'coverPicture' | 'emailVerified' | 'amIDeactivated'>
  & { followers?: Maybe<Array<(
    { __typename?: 'Follow' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'displayName' | 'username' | 'emailVerified' | 'displayPicture' | 'coverPicture'>
    ), follower: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'displayName' | 'username' | 'emailVerified' | 'displayPicture' | 'coverPicture'>
    ) }
  )>>, followings?: Maybe<Array<(
    { __typename?: 'Follow' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'displayName' | 'username' | 'emailVerified' | 'displayPicture' | 'coverPicture'>
    ), follower: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'displayName' | 'username' | 'emailVerified' | 'displayPicture' | 'coverPicture'>
    ) }
  )>>, quacks?: Maybe<Array<(
    { __typename?: 'Quack' }
    & Pick<Quack, 'id' | 'text' | 'truncatedText' | 'links' | 'hashtags' | 'isVisible' | 'likeStatus' | 'requackStatus'>
    & { mentions?: Maybe<Array<(
      { __typename?: 'User' }
      & ShortUserFragment
    )>>, likes?: Maybe<Array<(
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
      & Pick<Quack, 'id' | 'text' | 'truncatedText' | 'links' | 'hashtags' | 'isVisible' | 'likeStatus' | 'requackStatus'>
      & { mentions?: Maybe<Array<(
        { __typename?: 'User' }
        & ShortUserFragment
      )>>, likes?: Maybe<Array<(
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
      & Pick<Quack, 'id' | 'text' | 'truncatedText' | 'links' | 'hashtags' | 'isVisible' | 'likeStatus' | 'requackStatus'>
      & { mentions?: Maybe<Array<(
        { __typename?: 'User' }
        & ShortUserFragment
      )>>, likes?: Maybe<Array<(
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

export type ShortUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'displayName' | 'displayPicture' | 'coverPicture' | 'emailVerified' | 'followStatus' | 'followBackStatus'>
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

export type QuackMutationVariables = Exact<{
  input: QuackInput;
}>;


export type QuackMutation = (
  { __typename?: 'Mutation' }
  & { quack: (
    { __typename?: 'QuackResponse' }
    & { quack?: Maybe<(
      { __typename?: 'Quack' }
      & RegularQuackFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularFieldErrorFragment
    )>> }
  ) }
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

export type NewsQueryVariables = Exact<{
  section: Scalars['String'];
}>;


export type NewsQuery = (
  { __typename?: 'Query' }
  & { news?: Maybe<Array<(
    { __typename?: 'News' }
    & Pick<News, 'id' | 'publishedAt' | 'section' | 'title' | 'abstract' | 'author' | 'url' | 'shortUrl' | 'thumbnailUrl' | 'caption'>
  )>> }
);

export type QuackByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type QuackByIdQuery = (
  { __typename?: 'Query' }
  & { quackById?: Maybe<(
    { __typename?: 'Quack' }
    & RegularQuackFragment
  )> }
);

export type QuacksForMeQueryVariables = Exact<{ [key: string]: never; }>;


export type QuacksForMeQuery = (
  { __typename?: 'Query' }
  & { quacksForMe?: Maybe<(
    { __typename?: 'PaginatedQuacks' }
    & Pick<PaginatedQuacks, 'hasMore'>
    & { quacks?: Maybe<Array<(
      { __typename?: 'Quack' }
      & RegularQuackFragment
    )>> }
  )> }
);

export type UserByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type UserByEmailQuery = (
  { __typename?: 'Query' }
  & { userByEmail?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type UserByIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserByIdQuery = (
  { __typename?: 'Query' }
  & { userById?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type UserByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserByUsernameQuery = (
  { __typename?: 'Query' }
  & { userByUsername?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const ShortUserFragmentDoc = gql`
    fragment ShortUser on User {
  id
  username
  displayName
  displayPicture
  coverPicture
  emailVerified
  followStatus
  followBackStatus
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  displayName
  username
  displayPicture
  coverPicture
  emailVerified
  followers {
    user {
      id
      displayName
      username
      emailVerified
      displayPicture
      coverPicture
    }
    follower {
      id
      displayName
      username
      emailVerified
      displayPicture
      coverPicture
    }
  }
  followings {
    user {
      id
      displayName
      username
      emailVerified
      displayPicture
      coverPicture
    }
    follower {
      id
      displayName
      username
      emailVerified
      displayPicture
      coverPicture
    }
  }
  amIDeactivated
  quacks {
    id
    text
    truncatedText
    links
    hashtags
    mentions {
      ...ShortUser
    }
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
    likeStatus
    requackStatus
  }
  requacks {
    quack {
      id
      text
      truncatedText
      links
      hashtags
      mentions {
        ...ShortUser
      }
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
      likeStatus
      requackStatus
    }
  }
  likes {
    quack {
      id
      text
      truncatedText
      links
      hashtags
      mentions {
        ...ShortUser
      }
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
      likeStatus
      requackStatus
    }
  }
}
    ${ShortUserFragmentDoc}`;
export const RegularQuackFragmentDoc = gql`
    fragment RegularQuack on Quack {
  id
  createdAt
  text
  truncatedText
  links
  hashtags
  mentions {
    ...RegularUser
  }
  quackedByUser {
    ...RegularUser
  }
  inReplyToQuack {
    id
    createdAt
    text
    truncatedText
    links
    hashtags
    mentions {
      ...RegularUser
    }
    quackedByUser {
      ...RegularUser
    }
    replies {
      id
    }
    requacks {
      id
    }
    likes {
      id
    }
    requackStatus
    likeStatus
  }
  replies {
    id
  }
  requacks {
    id
  }
  likes {
    id
  }
  requackStatus
  likeStatus
}
    ${RegularUserFragmentDoc}`;
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
export const QuackDocument = gql`
    mutation Quack($input: QuackInput!) {
  quack(input: $input) {
    quack {
      ...RegularQuack
    }
    errors {
      ...RegularFieldError
    }
  }
}
    ${RegularQuackFragmentDoc}
${RegularFieldErrorFragmentDoc}`;

export function useQuackMutation() {
  return Urql.useMutation<QuackMutation, QuackMutationVariables>(QuackDocument);
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
export const NewsDocument = gql`
    query News($section: String!) {
  news(section: $section) {
    id
    publishedAt
    section
    title
    abstract
    author
    url
    shortUrl
    thumbnailUrl
    caption
  }
}
    `;

export function useNewsQuery(options: Omit<Urql.UseQueryArgs<NewsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<NewsQuery>({ query: NewsDocument, ...options });
};
export const QuackByIdDocument = gql`
    query QuackById($id: Int!) {
  quackById(id: $id) {
    ...RegularQuack
  }
}
    ${RegularQuackFragmentDoc}`;

export function useQuackByIdQuery(options: Omit<Urql.UseQueryArgs<QuackByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QuackByIdQuery>({ query: QuackByIdDocument, ...options });
};
export const QuacksForMeDocument = gql`
    query QuacksForMe {
  quacksForMe {
    quacks {
      ...RegularQuack
    }
    hasMore
  }
}
    ${RegularQuackFragmentDoc}`;

export function useQuacksForMeQuery(options: Omit<Urql.UseQueryArgs<QuacksForMeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QuacksForMeQuery>({ query: QuacksForMeDocument, ...options });
};
export const UserByEmailDocument = gql`
    query UserByEmail($email: String!) {
  userByEmail(email: $email) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useUserByEmailQuery(options: Omit<Urql.UseQueryArgs<UserByEmailQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserByEmailQuery>({ query: UserByEmailDocument, ...options });
};
export const UserByIdDocument = gql`
    query UserById($userId: String!) {
  userById(userId: $userId) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useUserByIdQuery(options: Omit<Urql.UseQueryArgs<UserByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserByIdQuery>({ query: UserByIdDocument, ...options });
};
export const UserByUsernameDocument = gql`
    query UserByUsername($username: String!) {
  userByUsername(username: $username) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useUserByUsernameQuery(options: Omit<Urql.UseQueryArgs<UserByUsernameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserByUsernameQuery>({ query: UserByUsernameDocument, ...options });
};