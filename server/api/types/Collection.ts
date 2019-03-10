export interface CollectedItemInterface {
    _id: string
    name: string
    description: string | null
    createdAt: Date | string
    assignedCollection?: CollectionInterface
}

export interface CollectionInterface {
    _id: string
    name: string
    description: string | null
    createdAt: Date | string
    collectedItems?: CollectedItemInterface[]
}
