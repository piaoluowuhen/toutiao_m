import request from '@/utils/request'

//获取频道新闻
export function getAtrcleList(params) {
    return request({
        url: '/app/v1_1/articles',
        methed: 'get',
        params,
    })
}

/**
 * 获取文章
 */
export const getArticleById = articleId => {
    return request({
        method: 'GET',
        url: `/app/v1_0/articles/${articleId}`
    })
}

/**
 * 收藏文章
 */
export const addCollect = target => {
    return request({
        method: 'POST',
        url: '/app/v1_0/article/collections',
        data: {
            target
        }
    })
}

/**
 * 取消收藏文章
 */
export const deleteCollect = id => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/collections/${id}`
    })
}

/**
 * 点赞文章
 */
export const addLike = target => {
    return request({
        method: 'POST',
        url: '/app/v1_0/article/likings',
        data: {
            target
        }
    })
}

/**
 * 取消点赞文章
 */
export const deleteLike = target => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/likings/${target}`
    })
}