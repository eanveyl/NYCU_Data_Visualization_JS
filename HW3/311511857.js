/***
* Histogram "bins" numbers in the array X in to group ranges. 
* Example usage histogram([1,5,2,4,2,5,2,3,1], 2) would return back [5,2,2] where bin ranges are [1-2, 3-4, 5-6] as bin range is 2
* Example usage histogram([1,5,2,4,2,5,2,3,1], 1) would return back [2,3,1,1,2] where bin ranges are [1,2,3,4,5] as bin range is 1
*/
function histogram(X, binRange) {
  //inclusive of the first number  
  var max = Math.max(...X);
  var min = Math.min(...X);
  var len = max - min; // changed from originally var len = max - min + 1;
  var numberOfBins = Math.ceil(len / binRange);
  var bins = new Array(numberOfBins).fill(0);
  //-min to normalise values for the array
  X.forEach((x) => bins[Math.floor((x-min) / binRange)]++);

  //normalize to 1
  let total_n = X.length;
  for (let i=0; i<bins.length; i++) {
    bins[i] = bins[i] / total_n;
  }

  var bin_labels = new Array(); 
  for (let i=0; i<numberOfBins; i++) {
    var start = min + i*binRange;
    var end = start + binRange;
    var label = start.toFixed(2).toString().concat("-", end.toFixed(2).toString());
    bin_labels.push(label);
  }

  return [bins, bin_labels];
}

function generate_bin_labels() {

  var numberOfBins = Math.ceil(len / binRange);
  var min = Math.min(...X);
  var bin_labels = new Array(); 
  for (let i=0; i<numberOfBins; i++) {
    var start = min + i*binRange;
    var end = start + binRange;
    var label = start.toString().concat(end.toString());
    bin_labels.push(label);
  }

  return label;
}



d3.csv("http://vis.lab.djosix.com:2020/data/spotify_tracks.csv").then( function(data) {
  console.log(data)
  console.log(data[42])

  const sorted_indexes = new Array(); // this list contains the song indexes sorted from highest popularity (100) to lowest popularity (0)

  for (let platz=0; platz<=100; platz++) {
    ranking = 100-platz;

    for (let i=0; i<data.length; i++){
      if (data[i]["popularity"] == ranking) {
        sorted_indexes.push(i);
      }
    }


  }

  console.log(sorted_indexes);
  const track_id_list = new Array();
  const artist_list = new Array();
  const track_name_list = new Array();
  const popularity_list = new Array();
  const duration_ms_list = new Array();
  const danceability_list = new Array();
  const energy_list = new Array();
  const speechiness_list = new Array();
  const acousticness_list = new Array();
  const instrumentalness_list = new Array();
  const liveness_list = new Array();
  const valence_list = new Array();
  const tempo_list = new Array();
  const track_genre_list = new Array();
  
  for (let i=0; i<sorted_indexes.length; i++) {
    track_id_list.push(data[sorted_indexes[i]]["track_id"]);
    artist_list.push(data[sorted_indexes[i]]["artist"]);
    track_name_list.push(data[sorted_indexes[i]]["track_name"]);
    duration_ms_list.push(data[sorted_indexes[i]]["duration_ms"]);
    danceability_list.push(data[sorted_indexes[i]]["danceability"]);
    energy_list.push(data[sorted_indexes[i]]["energy"]);
    speechiness_list.push(data[sorted_indexes[i]]["speechiness"]);
    acousticness_list.push(data[sorted_indexes[i]]["acousticness"]);
    instrumentalness_list.push(data[sorted_indexes[i]]["instrumentalness"]);
    liveness_list.push(data[sorted_indexes[i]]["liveness"]);
    valence_list.push(data[sorted_indexes[i]]["valence"]);
    tempo_list.push(data[sorted_indexes[i]]["tempo"]);
    track_genre_list.push(data[sorted_indexes[i]]["track_genre"]);
  }



  //Energy 
  var energy_all = histogram(energy_list, 0.05);
  var trace1 = {
      x: energy_all[1],
      y: energy_all[0],
      type: 'bar', 
      opacity: 0.5,
      name: "All Songs"
    };
  
  var energy_top = histogram(energy_list.slice(0, 1000), 0.05); // take only the top 1000 songs
  var trace2 = {
      x: energy_all[1],
      y: energy_top[0],
      type: 'bar', 
      opacity: 0.5, 
      name: "Top 1000"
    };
  
  var data = [trace1, trace2];
  var layout = {title: "Energy", 
                barmode: 'overlay'
              };
  
  Plotly.newPlot('energy_div', data, layout);
  
  //Danceability
  var danceability_all = histogram(danceability_list, 0.05);
  var trace1 = {
      x: danceability_all[1],
      y: danceability_all[0],
      type: 'bar', 
      opacity: 0.5,
      name: "All Songs"
    };
  
  var danceability_top = histogram(danceability_list.slice(0, 1000), 0.05); // take only the top 1000 songs
  var trace2 = {
      x: danceability_all[1],
      y: danceability_top[0],
      type: 'bar', 
      opacity: 0.5, 
      name: "Top 1000"
    };
  
  var data = [trace1, trace2];
  var layout = {title: "Danceability", 
                barmode: 'overlay'
              };
  
  Plotly.newPlot('danceability_div', data, layout);
  
})