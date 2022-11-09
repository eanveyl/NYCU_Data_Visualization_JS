d3.csv("http://vis.lab.djosix.com:2020/data/spotify_tracks.csv").then( function(data) {
  console.log(data)
  console.log(data[42])

  const sorted_indexes = new Array();

  for (let platz=0; platz<=100; platz++) {
    ranking = 100-platz;

    for (let i=0; i<data.length; i++){
      if (data[i]["popularity"] == ranking) {
        sorted_indexes.push(i);
      }
    }


  }

  console.log(sorted_indexes);

  

})