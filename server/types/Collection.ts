export interface CollectedItemInterface {
    _id: string
    name: string
    createdAt?: Date | string
    assignedCollection?: CollectionInterface
}

export interface CollectionInterface {
    _id: string
    name: string
    createdAt?: Date | string
    collectedItems?: CollectedItemInterface[]
}
