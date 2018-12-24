import { AddCollectionService } from './AddCollectionService'
import { DeleteCollectionService } from './DeleteCollectionService'
import { EditCollectionService } from './EditCollectionService'
import { GetCollectionService } from './GetCollectionService'
import { ListCollectionsService } from './ListCollectionsService'

export const CollectionService = () => ({
    AddCollection: AddCollectionService,
    DeleteCollection: DeleteCollectionService,
    EditCollection: EditCollectionService,
    GetCollection: GetCollectionService,
    ListCollections: ListCollectionsService,
})
