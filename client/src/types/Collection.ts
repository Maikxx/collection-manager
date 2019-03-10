export interface CollectedItemType {
    _id: number
    name: string
    description: string | null
    createdAt: string
    assignedCollection?: CollectionType
}

export interface CollectionType {
    _id: number
    name: string
    description: string | null
    createdAt: string
    collectedItems?: CollectedItemType[]
}
