/*** tracks configuraton props*/
class FileLocation {
    constructor(uri, locationType) {
        this.uri = uri;
        this.locationType = locationType;
    }
}

class Index {
    constructor(location) {
        this.location = location;
    }
}

class Adapter {
    constructor(type, bamLocation, index) {
        this.type = type;
        this.bamLocation = bamLocation;
        this.index = index;
    }
}

class Track {
    constructor(trackId, name, assemblyNames, type, adapter) {
        this.trackId = trackId;
        this.name = name;
        this.assemblyNames = assemblyNames;
        this.type = type;
        this.adapter = adapter;
    }
}

/*** dafault session configuraton props*/
class Displays {
    constructor(type, configuration){
        this.type = type;
        this.configuration = configuration;
    }
}

class defaultViewTrack {
    constructor(type, configuration, displays){
        this.type = type;
        this.configuration = configuration;
        this.displays = displays;
    }
}

class View {
    constructor(id, type, tracks){
        this.id = id;
        this.type = type;
        this.tracks = tracks;
    }
}

class Region {
    constructor(refName, start, end, assemblyName){
        this.refName = refName;
        this.start = start;
        this.end = end;
        this.assemblyName = assemblyName;
    }
}

module.exports = {
    FileLocation,
    Index,
    Adapter,
    Track,
    Displays,
    View,
    defaultViewTrack,
    Region,
}