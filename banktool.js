#!/usr/bin/env node

const program = require('commander')
const fs = require('fs-extra')
const replace = require('replace-in-file')

program
    .version('0.0.1')

program
    .command('clean')
    .action(() => fs.remove('target'))

program
    .command('generate-proxy')
    .option('-n --name <name>', 'Sandbox name')
    .option('-b --basepath <basepath>', 'Basepath for sandbox')
    .action((opts) => {
        if (!opts.name || !opts.basepath) {
            throw 'missing option: check --help'
        }
        fs.copy('src/proxies/template-api-v1', 'target/' + opts.name)
            .then(() => replace({
                files: 'target/' + opts.name + '/apiproxy/proxies/default.xml',
                from: '<BasePath/>',
                to: '<BasePath>' + opts.basepath + '</BasePath>'
            }))
            .then(() => replace({
                files: 'target/' + opts.name + '/deploy.sh',
                from: '-n ""',
                to: '-n "' + opts.name + '"'
            }))
            .catch((err) => console.error(err))
    })

program
    .command('generate-sandbox')
    .option('-n --name <name>', 'Sandbox name')
    .option('-s --specification <spec>', 'Path to specification')
    .option('-b --basepath <basepath>', 'Basepath for sandbox')
    .action((opts) => {
        if (!opts.name || !opts.specification || !opts.basepath) {
            throw 'missing option: check --help'
        }
        const targetPath = 'target/sandboxes/' + opts.name

        fs.copy('src/proxies/sandbox-v1', targetPath)
            .then(() => fs.copy(opts.specification,
                targetPath + '/apiproxy/resources/hosted/swagger.json'))
            .then(() => replace({
                files: targetPath + '/apiproxy/proxies/default.xml',
                from: '<BasePath/>',
                to: '<BasePath>' + opts.basepath + '</BasePath>'
            }))
            .then(() => replace({
                files: targetPath + '/deploy.sh',
                from: '-n ""',
                to: '-n "' + opts.name + '"'
            }))
            .catch((err) => console.error(err))
    })

program
    .command('generate-shared-flow')
    .option('-n --name <name>', 'Shared flow name')
    .option('-d --directory <dir>', 'Directory name')
    .action((opts) => {
        const targetPath = 'target/shared/' + opts.name
        fs.copy(opts.directory, targetPath)
            .then(() => replace({
                files: targetPath + '/deploy.sh',
                from: '-n ""',
                to: '-n "' + opts.name + '"'
            }))
    })

/**
 * Usage: ./banking-workshop-tools.js attach-shared-flow -a identity-v1 -E proxy -f preflow -s oauth-clientcreds-v1
 * 
 * Creates a Flow Callout policy and attaches it to the correct flow
 */
program
    .command('attach-shared-flow')
    .option('-a --apiproxy <apiproxy>', 'API Proxy')
    .option('-f --flow <flow>', 'PreFlow or PostFlow')
    .option('-d --direction <direction>', 'Request or Response')
    .option('-s --shared-flow <sharedflow>', 'Shared flow name to attach')
    .option('-n --name <name>', 'Policy name')
    .action((opts) => {
        //TODO add validation
        const targetPrefix = 'target/' + opts.apiproxy
        const targetPolicyPath = targetPrefix + '/apiproxy/policies/' + opts.name + '.xml'
        const targetFlowPath = targetPrefix + '/apiproxy/proxies/default.xml'

        fs.copy('src/sharedflows/FlowCallout.xml', targetPolicyPath)
            .then(() => replace({
                files: targetPolicyPath,
                from: 'name=""',
                to: 'name="' + opts.name + '"'
            }))
            .then(() => replace({
                files: targetPolicyPath,
                from: '<SharedFlowBundle/>',
                to: '<SharedFlowBundle>' + opts.name + '</SharedFlowBundle>'
            }))
            .then(() => {
                const replaceTag = '<!-- add ' + opts.direction + ' ' + opts.flow + ' steps here -->'
                replace({
                    files: targetFlowPath,
                    from: replaceTag,
                    to: '<Step><Name>' + opts.name + '</Name></Step>' + replaceTag
                })
            })
            .catch((err) => console.error(err))
    })

// create proxy
// environment stuff
program.parse(process.argv)
