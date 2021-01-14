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
  followersByUserId?: Maybe<PaginatedUsers>;
  followingsByUserId?: Maybe<PaginatedUsers>;
  likesByQuackId?: Maybe<PaginatedUsers>;
  likesByUserId?: Maybe<PaginatedQuacks>;
  news?: Maybe<Array<News>>;
  quackById?: Maybe<Quack>;
  quacksForMe?: Maybe<PaginatedQuacks>;
  quacksFromUser?: Maybe<PaginatedQuacks>;
  requacksByQuackId?: Maybe<PaginatedUsers>;
  requacksByUserId?: Maybe<PaginatedQuacks>;
  search: SearchResponse;
  me?: Maybe<User>;
  userById?: Maybe<User>;
  userByEmail?: Maybe<User>;
  userByUsername?: Maybe<User>;
};


export type QueryFollowersByUserIdArgs = {
  lastIndex?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  userId: Scalars['Int'];
};


export type QueryFollowingsByUserIdArgs = {
  lastIndex?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  userId: Scalars['Int'];
};


export type QueryLikesByQuackIdArgs = {
  lastIndex?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  quackId: Scalars['Int'];
};


export type QueryLikesByUserIdArgs = {
  lastIndex?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  userId: Scalars['Int'];
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


export type QueryQuacksFromUserArgs = {
  lastIndex?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  userId: Scalars['Int'];
};


export type QueryRequacksByQuackIdArgs = {
  lastIndex?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  quackId: Scalars['Int'];
};


export type QueryRequacksByUserIdArgs = {
  lastIndex?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  userId: Scalars['Int'];
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

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  users?: Maybe<Array<User>>;
  hasMore: Scalars['Boolean'];
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
  quacks?: Maybe<Scalars['Int']>;
  followers?: Maybe<Scalars['Int']>;
  followings?: Maybe<Scalars['Int']>;
  haveIBlockedThisUser?: Maybe<Scalars['Boolean']>;
  amIBlockedByThisUser?: Maybe<Scalars['Boolean']>;
  followStatus?: Maybe<Scalars['Boolean']>;
  followBackStatus?: Maybe<Scalars['Boolean']>;
};


export type PaginatedQuacks = {
  __typename?: 'PaginatedQuacks';
  quacks?: Maybe<Array<Quack>>;
  hasMore: Scalars['Boolean'];
};

export type Quack = {
  __typename?: 'Quack';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  isVisible: Scalars['Boolean'];
  text: Scalars['String'];
  truncatedText?: Maybe<Scalars['String']>;
  links?: Maybe<Array<Link>>;
  mentions?: Maybe<Array<User>>;
  hashtags?: Maybe<Array<Scalars['String']>>;
  quackedByUserId: Scalars['Float'];
  quackedByUser: User;
  inReplyToQuackId?: Maybe<Scalars['Int']>;
  inReplyToQuack?: Maybe<Quack>;
  replies?: Maybe<Array<Quack>>;
  requacks?: Maybe<Scalars['Int']>;
  likes?: Maybe<Scalars['Int']>;
  requackStatus: Scalars['Boolean'];
  likeStatus: Scalars['Boolean'];
};

export type Link = {
  __typename?: 'Link';
  id: Scalars['Int'];
  url: Scalars['String'];
  exactUrl: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  favicon?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
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

export type SearchResponse = {
  __typename?: 'SearchResponse';
  paginatedUsers?: Maybe<PaginatedUsers>;
  paginatedQuacks?: Maybe<PaginatedQuacks>;
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
  userId: Scalars['Int'];
};


export type MutationUnblockArgs = {
  userId: Scalars['Int'];
};


export type MutationFollowArgs = {
  userId: Scalars['Int'];
};


export type MutationUnfollowArgs = {
  userId: Scalars['Int'];
};


export type MutationLikeArgs = {
  quackId: Scalars['Int'];
};


export type MutationQuackArgs = {
  input: QuackInput;
};


export type MutationDeleteQuackArgs = {
  quackId: Scalars['Int'];
};


export type MutationRequackArgs = {
  quackId: Scalars['Int'];
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

export type FullLinkFragment = (
  { __typename?: 'Link' }
  & Pick<Link, 'id' | 'title' | 'description' | 'url' | 'exactUrl' | 'favicon' | 'image' | 'author'>
);

export type RegularFieldErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularQuackFragment = (
  { __typename?: 'Quack' }
  & Pick<Quack, 'id' | 'createdAt' | 'text' | 'truncatedText' | 'hashtags' | 'requacks' | 'likes' | 'requackStatus' | 'likeStatus'>
  & { links?: Maybe<Array<(
    { __typename?: 'Link' }
    & FullLinkFragment
  )>>, mentions?: Maybe<Array<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>>, quackedByUser: (
    { __typename?: 'User' }
    & RegularUserFragment
  ), inReplyToQuack?: Maybe<(
    { __typename?: 'Quack' }
    & Pick<Quack, 'id' | 'createdAt' | 'text' | 'truncatedText' | 'hashtags' | 'requacks' | 'likes' | 'requackStatus' | 'likeStatus'>
    & { links?: Maybe<Array<(
      { __typename?: 'Link' }
      & FullLinkFragment
    )>>, mentions?: Maybe<Array<(
      { __typename?: 'User' }
      & RegularUserFragment
    )>>, quackedByUser: (
      { __typename?: 'User' }
      & RegularUserFragment
    ), inReplyToQuack?: Maybe<(
      { __typename?: 'Quack' }
      & Pick<Quack, 'id'>
      & { quackedByUser: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )> }
  )>, replies?: Maybe<Array<(
    { __typename?: 'Quack' }
    & Pick<Quack, 'id' | 'createdAt' | 'text' | 'truncatedText' | 'hashtags' | 'requacks' | 'likes' | 'requackStatus' | 'likeStatus'>
    & { links?: Maybe<Array<(
      { __typename?: 'Link' }
      & FullLinkFragment
    )>>, mentions?: Maybe<Array<(
      { __typename?: 'User' }
      & RegularUserFragment
    )>>, quackedByUser: (
      { __typename?: 'User' }
      & RegularUserFragment
    ) }
  )>> }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'displayName' | 'username' | 'displayPicture' | 'coverPicture' | 'emailVerified' | 'followers' | 'followings' | 'amIDeactivated' | 'quacks' | 'amIBlockedByThisUser' | 'haveIBlockedThisUser' | 'followStatus' | 'followBackStatus'>
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

export type BlockMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type BlockMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'block'>
);

export type DeleteQuackMutationVariables = Exact<{
  quackId: Scalars['Int'];
}>;


export type DeleteQuackMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteQuack'>
);

export type FollowMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type FollowMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'follow'>
);

export type LikeMutationVariables = Exact<{
  quackId: Scalars['Int'];
}>;


export type LikeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'like'>
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

export type RequackMutationVariables = Exact<{
  quackId: Scalars['Int'];
}>;


export type RequackMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'requack'>
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

export type UnblockMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type UnblockMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'unblock'>
);

export type UnfollowMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type UnfollowMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'unfollow'>
);

export type LikesByQuackIdQueryVariables = Exact<{
  quackId: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  lastIndex?: Maybe<Scalars['Int']>;
}>;


export type LikesByQuackIdQuery = (
  { __typename?: 'Query' }
  & { likesByQuackId?: Maybe<(
    { __typename?: 'PaginatedUsers' }
    & Pick<PaginatedUsers, 'hasMore'>
    & { users?: Maybe<Array<(
      { __typename?: 'User' }
      & RegularUserFragment
    )>> }
  )> }
);

export type LikesByUserIdQueryVariables = Exact<{
  userId: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  lastIndex?: Maybe<Scalars['Int']>;
}>;


export type LikesByUserIdQuery = (
  { __typename?: 'Query' }
  & { likesByUserId?: Maybe<(
    { __typename?: 'PaginatedQuacks' }
    & Pick<PaginatedQuacks, 'hasMore'>
    & { quacks?: Maybe<Array<(
      { __typename?: 'Quack' }
      & RegularQuackFragment
    )>> }
  )> }
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

export type QuacksForMeQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  lastIndex?: Maybe<Scalars['Int']>;
}>;


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

export type QuacksFromUserQueryVariables = Exact<{
  userId: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  lastIndex?: Maybe<Scalars['Int']>;
}>;


export type QuacksFromUserQuery = (
  { __typename?: 'Query' }
  & { quacksFromUser?: Maybe<(
    { __typename?: 'PaginatedQuacks' }
    & Pick<PaginatedQuacks, 'hasMore'>
    & { quacks?: Maybe<Array<(
      { __typename?: 'Quack' }
      & RegularQuackFragment
    )>> }
  )> }
);

export type RequacksByQuackIdQueryVariables = Exact<{
  quackId: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  lastIndex?: Maybe<Scalars['Int']>;
}>;


export type RequacksByQuackIdQuery = (
  { __typename?: 'Query' }
  & { requacksByQuackId?: Maybe<(
    { __typename?: 'PaginatedUsers' }
    & Pick<PaginatedUsers, 'hasMore'>
    & { users?: Maybe<Array<(
      { __typename?: 'User' }
      & RegularUserFragment
    )>> }
  )> }
);

export type RequacksByUserIdQueryVariables = Exact<{
  userId: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  lastIndex?: Maybe<Scalars['Int']>;
}>;


export type RequacksByUserIdQuery = (
  { __typename?: 'Query' }
  & { requacksByUserId?: Maybe<(
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

export const FullLinkFragmentDoc = gql`
    fragment FullLink on Link {
  id
  title
  description
  url
  exactUrl
  favicon
  image
  author
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
  followers
  followings
  amIDeactivated
  quacks
  amIBlockedByThisUser
  haveIBlockedThisUser
  followStatus
  followBackStatus
}
    `;
export const RegularQuackFragmentDoc = gql`
    fragment RegularQuack on Quack {
  id
  createdAt
  text
  truncatedText
  links {
    ...FullLink
  }
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
    links {
      ...FullLink
    }
    hashtags
    mentions {
      ...RegularUser
    }
    quackedByUser {
      ...RegularUser
    }
    inReplyToQuack {
      id
      quackedByUser {
        username
      }
    }
    requacks
    likes
    requackStatus
    likeStatus
  }
  replies {
    id
    createdAt
    text
    truncatedText
    links {
      ...FullLink
    }
    hashtags
    mentions {
      ...RegularUser
    }
    quackedByUser {
      ...RegularUser
    }
    requacks
    likes
    requackStatus
    likeStatus
  }
  requacks
  likes
  requackStatus
  likeStatus
}
    ${FullLinkFragmentDoc}
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
export const BlockDocument = gql`
    mutation Block($userId: Int!) {
  block(userId: $userId)
}
    `;

export function useBlockMutation() {
  return Urql.useMutation<BlockMutation, BlockMutationVariables>(BlockDocument);
};
export const DeleteQuackDocument = gql`
    mutation DeleteQuack($quackId: Int!) {
  deleteQuack(quackId: $quackId)
}
    `;

export function useDeleteQuackMutation() {
  return Urql.useMutation<DeleteQuackMutation, DeleteQuackMutationVariables>(DeleteQuackDocument);
};
export const FollowDocument = gql`
    mutation Follow($userId: Int!) {
  follow(userId: $userId)
}
    `;

export function useFollowMutation() {
  return Urql.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument);
};
export const LikeDocument = gql`
    mutation Like($quackId: Int!) {
  like(quackId: $quackId)
}
    `;

export function useLikeMutation() {
  return Urql.useMutation<LikeMutation, LikeMutationVariables>(LikeDocument);
};
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
export const RequackDocument = gql`
    mutation Requack($quackId: Int!) {
  requack(quackId: $quackId)
}
    `;

export function useRequackMutation() {
  return Urql.useMutation<RequackMutation, RequackMutationVariables>(RequackDocument);
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
export const UnblockDocument = gql`
    mutation Unblock($userId: Int!) {
  unblock(userId: $userId)
}
    `;

export function useUnblockMutation() {
  return Urql.useMutation<UnblockMutation, UnblockMutationVariables>(UnblockDocument);
};
export const UnfollowDocument = gql`
    mutation Unfollow($userId: Int!) {
  unfollow(userId: $userId)
}
    `;

export function useUnfollowMutation() {
  return Urql.useMutation<UnfollowMutation, UnfollowMutationVariables>(UnfollowDocument);
};
export const LikesByQuackIdDocument = gql`
    query LikesByQuackId($quackId: Int!, $limit: Int, $lastIndex: Int) {
  likesByQuackId(quackId: $quackId, limit: $limit, lastIndex: $lastIndex) {
    hasMore
    users {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useLikesByQuackIdQuery(options: Omit<Urql.UseQueryArgs<LikesByQuackIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<LikesByQuackIdQuery>({ query: LikesByQuackIdDocument, ...options });
};
export const LikesByUserIdDocument = gql`
    query LikesByUserId($userId: Int!, $limit: Int, $lastIndex: Int) {
  likesByUserId(userId: $userId, limit: $limit, lastIndex: $lastIndex) {
    hasMore
    quacks {
      ...RegularQuack
    }
  }
}
    ${RegularQuackFragmentDoc}`;

export function useLikesByUserIdQuery(options: Omit<Urql.UseQueryArgs<LikesByUserIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<LikesByUserIdQuery>({ query: LikesByUserIdDocument, ...options });
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
    query QuacksForMe($limit: Int, $lastIndex: Int) {
  quacksForMe(limit: $limit, lastIndex: $lastIndex) {
    hasMore
    quacks {
      ...RegularQuack
    }
  }
}
    ${RegularQuackFragmentDoc}`;

export function useQuacksForMeQuery(options: Omit<Urql.UseQueryArgs<QuacksForMeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QuacksForMeQuery>({ query: QuacksForMeDocument, ...options });
};
export const QuacksFromUserDocument = gql`
    query QuacksFromUser($userId: Int!, $limit: Int, $lastIndex: Int) {
  quacksFromUser(userId: $userId, limit: $limit, lastIndex: $lastIndex) {
    hasMore
    quacks {
      ...RegularQuack
    }
  }
}
    ${RegularQuackFragmentDoc}`;

export function useQuacksFromUserQuery(options: Omit<Urql.UseQueryArgs<QuacksFromUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QuacksFromUserQuery>({ query: QuacksFromUserDocument, ...options });
};
export const RequacksByQuackIdDocument = gql`
    query RequacksByQuackId($quackId: Int!, $limit: Int, $lastIndex: Int) {
  requacksByQuackId(quackId: $quackId, limit: $limit, lastIndex: $lastIndex) {
    hasMore
    users {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useRequacksByQuackIdQuery(options: Omit<Urql.UseQueryArgs<RequacksByQuackIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RequacksByQuackIdQuery>({ query: RequacksByQuackIdDocument, ...options });
};
export const RequacksByUserIdDocument = gql`
    query RequacksByUserId($userId: Int!, $limit: Int, $lastIndex: Int) {
  requacksByUserId(userId: $userId, limit: $limit, lastIndex: $lastIndex) {
    hasMore
    quacks {
      ...RegularQuack
    }
  }
}
    ${RegularQuackFragmentDoc}`;

export function useRequacksByUserIdQuery(options: Omit<Urql.UseQueryArgs<RequacksByUserIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RequacksByUserIdQuery>({ query: RequacksByUserIdDocument, ...options });
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