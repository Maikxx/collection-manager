import { ApolloError, ApolloQueryResult } from 'apollo-client'
import { OperationVariables } from 'react-apollo'

export type RefetchFunction<TData> = (variables?: OperationVariables) => Promise<ApolloQueryResult<TData>>

export interface QueryContent<TData> {
    loading: boolean
    error?: ApolloError
    data?: TData
    refetch?: RefetchFunction<TData>
}

export interface MutationContent<TData> {
    loading: boolean
    data?: TData
    error?: ApolloError
}
