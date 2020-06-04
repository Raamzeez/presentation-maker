import wiki from 'wikijs'

const getBullets = async link => await (await wiki().page(link)).content()

export {
    getBullets
}

