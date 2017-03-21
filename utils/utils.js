add = function(a, b) {
    return a+b
}

getData = function(dataset){
    var no_options = 5
    var values = d3.values(dataset)
    var keys   = d3.keys(dataset)
    var data   = []
    var centroids = []
    var counter   = []

    // It's pretty bad implementation but I encounter a weird behaviour while trying:
    // var counter   = Array(5).fill(0).map(function(item) {return [0];});
    // var centroids = Array(5).fill(0).map(function(item) {return Array(5).fill([0,0]);});

    for(var i=0; i<no_options; i++){
      centroids.push(Array(i+2).fill([]))
      counter.push(Array(i+2).fill(0))
      for(var j=0; j<=i+1; j++){
        centroids[i][j] = [0,0]
     }
   }

    for(var key in dataset){
      if(dataset.hasOwnProperty(key)){
        var clusters = dataset[key]
        var coords = JSON.parse(key)
        data.push([coords, clusters])

        for(var i=0; i<no_options; i++){
          var cluster = clusters[i]
          centroids[i][cluster][0] = centroids[i][cluster][0] + coords[0]
          centroids[i][cluster][1] = centroids[i][cluster][1] + coords[1]
          counter[i][cluster] = counter[i][cluster] + 1
        }
      }
    }

    for(var i=0; i<no_options; i++){
      for(var j=0; j<=i+1; j++){
        centroids[i][j][0] = centroids[i][j][0] / counter[i][j]
        centroids[i][j][1] = centroids[i][j][1] / counter[i][j]
      }
    }

    return {"data": data, "centroids": centroids}
}
