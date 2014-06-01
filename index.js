var detective = require('detective'),
    glob = require('glob'),
    fs = require('fs');

function getModuleName(src){
    var regex = /define\(['"](.*)['"],\s?function\s?\(/,
        match = src.match(regex);
    if (match) {
        return match[1];
    }
}

function walk(file) {
    var src = fs.readFileSync(file, 'utf8'),
        moduleName = getModuleName(src),
        dependencies = detective(src);
    return {
        id: moduleName,
        dependencies: dependencies
    }
}

function getModules(src, cb) {
    glob(src, function(err, files){
        var modules = files.map(walk);
        cb(modules);
    });
}

function getModulesObject(modules) {
    return modules.reduce(function (acc, module) {
        acc[module.id] = module.dependencies;
        return acc;
    }, {});
}

function sortDependencies (tree) {
    tree = Object.keys(tree).sort().reduce(function (acc, id) {
        (acc[id] = tree[id]).sort();
        return acc;
    }, {});
}

function build(src, cb) {
    getModules(src, function (modules) {
        var tree = getModulesObject(modules);
        sortDependencies(tree);
        cb(tree);
    });
}

module.exports = {
    build: build
};

