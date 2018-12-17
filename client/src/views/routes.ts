export const routes = {
    index: '/',
    collections: {
        index: '/collections',
        detail: {
            index: '/detail',
            data: (id: string | number = ':id') => `/detail/${id}`,
            edit: (id: string | number = ':id') => `/detail/${id}/edit`,
        },
    },
}
