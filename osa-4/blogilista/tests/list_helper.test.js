const listHelper = require('../utils/list_helper')

test('dummy returns 1', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of an empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the number of likes for that one blog', () => {
        const likesForSingleBlog = 1337
        const result = listHelper.totalLikes([{likes: likesForSingleBlog}])
        expect(result).toBe(likesForSingleBlog)
    })

    test('of a bigger list is calculated correctly as well', () => {
        const blogs = [
            {
                "_id": "5d2f7444cd308466af899165",
                "title": "Blogautus",
                "author": "Berit Blogaaja",
                "url": "http://blog.it/1",
                "likes": 13,
                "__v": 0
            },
            {
                "_id": "5d30c4a2dbe96c7744a66a11",
                "title": "Humppa on hauskaa",
                "author": "Hessu Humpauttaja",
                "url": "http://blog.it/2",
                "likes": 1324,
                "__v": 0
            }
        ]

        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(1337)
    })
})

describe('favorite blog', () => {
    test('of an empty list is undefined', () => {
        expect(listHelper.favoriteBlog([])).toEqual(undefined)
    })

    test('of a list with just one blog is equal to the single blog', () => {
        const blog = {
            "_id": "5d2f7444cd308466af899165",
            "title": "Blogautus",
            "author": "Berit Blogaaja",
            "url": "http://blog.it/1",
            "likes": 13,
            "__v": 0
        }
        expect(listHelper.favoriteBlog([blog])).toEqual(blog)
    })

    test('of a list with multiple blogs is the one with most likes', () => {
        const blogs = [
            {
                "_id": "5d2f7444cd308466af899165",
                "title": "Blogautus",
                "author": "Berit Blogaaja",
                "url": "http://blog.it/1",
                "likes": 13,
                "__v": 0
            },
            {
                "_id": "5d30c4a2dbe96c7744a66a11",
                "title": "Humppa on hauskaa",
                "author": "Hessu Humpauttaja",
                "url": "http://blog.it/2",
                "likes": 0,
                "__v": 0
            },
            {
                "_id": "5d31ebe01768a41377b270b7",
                "title": "Humppa on myös hassuttelua!",
                "author": "Hessu Humpauttaja",
                "url": "http://blog.it/3",
                "likes": 9,
                "__v": 0
            },
            {
                "_id": "5d31ec001768a41377b270b8",
                "title": "Karate on tyhjä käsi?!",
                "author": "Budo Isti",
                "url": "http://blog.it/4",
                "likes": 14,
                "__v": 0
            },
            {
                "_id": "5d31ed441768a41377b270b9",
                "title": "Foobar on avain onneen",
                "author": "Onnen koodari",
                "url": "http://blog.it/5",
                "likes": 13,
                "__v": 0
            }
        ]
        expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[3])
    })
})
