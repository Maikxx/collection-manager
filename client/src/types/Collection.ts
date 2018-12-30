export interface CollectedItemType {
    _id: number
    name: string
    createdAt: Date
    assignedCollection?: CollectionType
}

export interface CollectionType {
    _id: number
    name: string
    createdAt: Date
    collectedItems?: CollectedItemType[]
}
