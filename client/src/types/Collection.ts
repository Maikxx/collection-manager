export interface CollectedItemType {
    _id: number
    name: string
    createdAt: string
    assignedCollection?: CollectionType
}

export interface CollectionType {
    _id: number
    name: string
    createdAt: string
    collectedItems?: CollectedItemType[]
}
