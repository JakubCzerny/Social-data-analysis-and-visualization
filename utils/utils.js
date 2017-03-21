add = function(a, b) {
    return a+b
}

getData = function(dataset){
    var values = d3.values(dataset)
    var keys   = d3.keys(dataset)
    var data   = []
    var centroids = [
      new Array(2).fill(0),
      new Array(3).fill(0),
      new Array(4).fill(0),
      new Array(5).fill(0),
      new Array(6).fill(0)
    ]

    for(var key in dataset){
      if(dataset.hasOwnProperty(key)){
        var clusters = dataset[key]
        data.push([JSON.parse(key),clusters])
      }
    }
    return {"data": data, "centroids": centroids}
}
