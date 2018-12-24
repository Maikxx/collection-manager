import { ApolloError, ApolloQueryResult } from 'apollo-client'
import { OperationVariables, MutationFunc } from 'react-apollo'

export type RefetchFunction<TData> = (variables?: OperationVariables) => Promise<ApolloQueryResult<TData>>

export interface QueryContent<TData> {
    loading: boolean
    error?: ApolloError
    data?: TData
    refetch?: RefetchFunction<TData>
}

export interface MutationContent<TData> {
    mutate: MutationFunc
    loading: boolean
    data?: TData
    error?: ApolloError
}
