import logger from "../logger.js";

export function getHooks(hooks, url) {
    let hookQueue = [];
    for (let hook of hooks) {
        if (hook.urlIncludes && !url.includes(hook.urlIncludes)) {
            continue;
        }
        hookQueue.push(hook);
    }
    return hookQueue;
}

export function injectHooks(source, hookQueue, url) {
    for (let hook of hookQueue) {
        const hookSuccessful = source.includes(hook.find);
        source = source.replace(hook.find, hook.replace);
        if (hookSuccessful) {
            logger.debug(`Hook ${hook.name} successfully injected on file ${url}.`);
        } else {
            logger.warn(`Hook ${hook.name} failed to inject, no matching pattern in file ${url}.`);
        }
    }
    return source;
}