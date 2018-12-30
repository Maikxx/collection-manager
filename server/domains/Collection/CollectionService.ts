import { AddCollectionService } from './AddCollectionService'
import { AddCollectedItemService } from './AddCollectedItemService'
import { DeleteCollectionService } from './DeleteCollectionService'
import { DeleteCollectedItemService } from './DeleteCollectedItemService'
import { EditCollectionService } from './EditCollectionService'
import { GetCollectionService } from './GetCollectionService'
import { ListCollectionsService } from './ListCollectionsService'

export const CollectionService = () => ({
    AddCollection: AddCollectionService,
    AddCollectedItem: AddCollectedItemService,
    DeleteCollection: DeleteCollectionService,
    DeleteCollectedItem: DeleteCollectedItemService,
    EditCollection: EditCollectionService,
    GetCollection: GetCollectionService,
    ListCollections: ListCollectionsService,
})
