const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => blogs.reduce((acc, val) => acc + val.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((acc, val) => {
    if (acc === undefined) {
        return val
    }
    if (!acc.hasOwnProperty('likes')) {
        return val
    }
    if (!val.hasOwnProperty('likes')) {
        return acc
    }
    if (val.likes > acc.likes) {
        return val
    }
    return acc
}, undefined)

module.exports = {
    dummy, totalLikes, favoriteBlog
}