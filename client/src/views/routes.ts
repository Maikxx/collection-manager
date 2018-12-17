export const routes = {
    index: '/',
    collections: {
        index: '/collections',
        detail: {
            index: '/collections/detail',
            data: (id: string | number = ':id') => `/collections/detail/${id}`,
            edit: (id: string | number = ':id') => `/collections/detail/${id}/edit`,
        },
    },
}
