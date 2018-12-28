export interface CollectedItemType {
    _id: string
    name: string
    createdAt: Date
    assignedCollection?: CollectionType
}

export interface CollectionType {
    _id: string
    name: string
    createdAt: Date
    collectedItems?: CollectedItemType[]
}
