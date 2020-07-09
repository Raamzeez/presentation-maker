import wiki from 'wikijs'

const getBullets = async (link: string) => await (await wiki().page(link)).content()

export {
    getBullets
}

