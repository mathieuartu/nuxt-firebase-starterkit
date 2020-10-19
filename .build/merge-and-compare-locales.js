import fs from 'fs'
import path from 'path'
import deepDiff from 'deep-diff'
import recursiveReaddirSync from 'recursive-readdir-sync'
import consoleColors from './utils/console/colors'

const localesPath = path.resolve('./locales/')

const mergeLocales = () => {
    console.log(
        `  * ${consoleColors.LIGHT_BLUE}Processing path${consoleColors.RESET}\n    ${localesPath}\n`
    )
    try {
        // Get all locale directories names
        const allLocaleDirectoriesNames = fs.readdirSync(localesPath)
        const filteredLocaleDirectoriesNames = allLocaleDirectoriesNames.filter(
            directoryName => directoryName.indexOf('.') === -1
        )
        console.log(
            `  * ${consoleColors.LIGHT_BLUE}Detected locales folders to merge${consoleColors.RESET}`
        )
        console.log(`    ${filteredLocaleDirectoriesNames}\n`)

        filteredLocaleDirectoriesNames.forEach(directoryName => {
            const allLocaleFilesInsideDirectory = recursiveReaddirSync(
                path.join(localesPath, directoryName)
            )

            const allLocaleFilesInsideDirectoryContents =
                allLocaleFilesInsideDirectory.map(localeFile => {
                    return JSON.parse(
                        fs.readFileSync(localeFile, {
                            encoding: 'utf8',
                        })
                    )
                })


            const mergedLocalesForThisDirectory = allLocaleFilesInsideDirectoryContents.reduce(
                (previousFileContents, currentFileContents) => {
                    return {
                        ...previousFileContents,
                        ...currentFileContents,
                    }
                }
            )

            try {
                fs.writeFileSync(
                    path.join(localesPath, `${directoryName}.json`),
                    JSON.stringify(mergedLocalesForThisDirectory),
                    'utf-8'
                )

                console.log(
                    `  * ${consoleColors.LIGHT_BLUE}Successfully merged${consoleColors.RESET} ${directoryName}.json\n`
                )
            } catch (e) {
                console.log(e)
                process.exit(1)
            }
        })
    } catch (e) {
        console.log(e)
        process.exit(1)
    }

}

const compareLocales = ({ defaultLocale }) => {
    try {
        const baseLocaleFilename = `${defaultLocale}.json`

        // Get all locale files & their contents
        const allLocaleFilenames = fs.readdirSync(localesPath)
        const filteredLocaleFilenames = allLocaleFilenames.filter(
            name => name.indexOf('.json') !== -1
        )

        let originalLocaleFile = null

        const allLocaleFilesContents =
            filteredLocaleFilenames.map(localeFilename => {
                try {
                    const fileContents = fs.readFileSync(
                        `${localesPath}/${localeFilename}`,
                        {
                            encoding: 'utf8',
                        }
                    )

                    const fileContentsObject = {
                        filename: localeFilename,
                        contents: JSON.parse(fileContents),
                    }

                    if (localeFilename === baseLocaleFilename) {
                        originalLocaleFile = fileContentsObject
                    } else {
                        return fileContentsObject
                    }
                } catch (e) {
                    console.log(e)
                    process.exit(1)
                }
            })


        // Remove fr.json created by the map
        const filteredAllLocaleFilesContents = allLocaleFilesContents.filter(
            l => l !== undefined
        )

        // Compare all locale files between them
        const allDiffs = []

        filteredAllLocaleFilesContents.forEach((locale, index) => {
            const comparedToLocaleFile =
                filteredAllLocaleFilesContents[index]

            const diff = deepDiff.diff(
                originalLocaleFile.contents,
                comparedToLocaleFile.contents
            )
            allDiffs.push({
                originalLocaleFile: originalLocaleFile.filename,
                comparedToLocaleFile: comparedToLocaleFile.filename,
                diff,
            })
        })

        // print in console all key differences from locale files
        console.log(
            `  * ${consoleColors.LIGHT_BLUE}Comparing locale files${consoleColors.RESET}\n`
        )

        allDiffs.forEach(diffObject => {
            const diffArray = diffObject.diff.filter(
                d => d.kind === 'D' || d.kind === 'N'
            )

            if (diffArray.length) {
                diffArray.forEach(diff => {
                    if (diff.kind === 'N') {
                        console.log(
                            `    ⚠ ${consoleColors.RED}${diffObject.comparedToLocaleFile} has a key that ${diffObject.originalLocaleFile} does not have :${consoleColors.RESET}\n`
                        )
                        console.log(
                            `     * key path is : [${diff.path}]\n`
                        )
                        console.log(
                            `       please add this key to ${diffObject.originalLocaleFile} \n---\n`
                        )
                    } else if (diff.kind === 'D') {
                        console.log(
                            `    ⚠ ${consoleColors.RED}${diffObject.originalLocaleFile} has a key that ${diffObject.comparedToLocaleFile} does not have :${consoleColors.RESET}\n`
                        )
                        console.log(
                            `     * key path is : [${diff.path}]\n`
                        )
                        console.log(
                            `       please add this key to ${diffObject.comparedToLocaleFile} \n---\n`
                        )
                    }
                })

                console.error(
                    '${consoleColors.BG_RED}Please fix the above errors to continue${consoleColors.RESET}'
                )

                //If there is any difference between fr.json and the other locale files, return an error and exit process
                process.exit(1)
            }
        })
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

export default ({ defaultLocale }) => {
    console.log(
        `${consoleColors.LIGHT_BLUE}### RUN merge-and-compare-locales${consoleColors.RESET}\n`
    )
    mergeLocales()
    compareLocales({ defaultLocale })
    console.log(
        `${consoleColors.LIGHT_BLUE}### END merge-and-compare-locales${consoleColors.RESET}\n`
    )
}
