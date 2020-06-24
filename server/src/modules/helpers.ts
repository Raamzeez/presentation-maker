// export const tabSpacing = (numSpaces: number ) => {
//     let spaceString = ''
//     for (let i = 0; i < numSpaces; i++){
//         spaceString += '     '
//     }
//     return spaceString
// }

// export const parseParagraphs = (stringData: string) => {
//     const stringDataArr = stringData.split('\n')
//     stringDataArr.map(paragraph => {
//         const firstSentence = paragraph.split('.')[0]
//         finalMessage += `* ${firstSentence}`
//     })
// }

// export const splitSections = content => {
//     content.forEach(section => {
//         // let keys = Object.keys(section)
//         if (section['items']){
//             level += 1
//             //console.log('\nMain Section Level ' + level + ': ' + section.title + '\n')
//             // console.log('Section:\n', tabSpacing(level) + section.title)
//             finalMessage += `Section:\n ${tabSpacing(level)} ${section.title}\n`
//             splitSections(section.items)
//         }
//         else {
//             level = 0
//             // const firstSentence = section.split('.')[0]
//             // console.log(`\nTitle: ${section.title}\n\nFirst Sentence: ${firstSentence}\n`)
//             // console.log(`\nTitle: ${section.title}\n\nContent: \n${section.content}\n\n`)
//             //console.log(section.content)
//             // console.log(`\n\nTitle:\n ${section.title}\n\nContent:\n`)
//             finalMessage += `\n\nTitle:\n ${section.title}\n\nContent:\n`
//             parseParagraphs(section.content)
//         }
//     })
// }