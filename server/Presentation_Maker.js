const wiki = require('wikijs').default

let level = 0

// let finalMessage = ''
let textData = ''

const tabSpacing = numSpaces => {
    let spaceString = ''
    for (i = 0; i < numSpaces; i++){
        spaceString += '     '
    }
    return spaceString
}

const parseParagraphs = stringData => {
    stringData = stringData.split('\n')
    stringData.forEach(paragraph => {
        const firstSentence = paragraph.split('.')[0]
        finalMessage += `* ${firstSentence}`
    })
}

const splitSections = content => {
    content.forEach(section => {
        // let keys = Object.keys(section)
        if (section['items']){
            level += 1
            //console.log('\nMain Section Level ' + level + ': ' + section.title + '\n')
            // console.log('Section:\n', tabSpacing(level) + section.title)
            finalMessage += `Section:\n ${tabSpacing(level)} ${section.title}\n`
            splitSections(section.items)
        }
        else {
            level = 0
            // const firstSentence = section.split('.')[0]
            // console.log(`\nTitle: ${section.title}\n\nFirst Sentence: ${firstSentence}\n`)
            // console.log(`\nTitle: ${section.title}\n\nContent: \n${section.content}\n\n`)
            //console.log(section.content)
            // console.log(`\n\nTitle:\n ${section.title}\n\nContent:\n`)
            finalMessage += `\n\nTitle:\n ${section.title}\n\nContent:\n`
            parseParagraphs(section.content)
        }
    })
}

const getBullets = (link) => {
    console.log('Link in the getBullets(): ' + link)
    // finalMessage = ''
    wiki()
        .page(link)
        .then(async page => {
            textData = await page.content()
            // splitSections(textData)
            console.log(textData)
        }
        )
        .catch(err => console.error(err))
        
    //return finalMessage
    return textData
}

module.exports = getBullets


