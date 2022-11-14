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

  let top_n_tracks = 1000;

  //Energy 
  var energy_all = histogram(energy_list, 0.05);
  var trace1 = {
      x: energy_all[1],
      y: energy_all[0].map(x => x * 100),
      type: 'bar', 
      opacity: 0.5,
      name: "All Songs", 
      marker: {
        color: 'rgb(201, 115, 2)',
      }
    };
  
  var energy_top = histogram(energy_list.slice(0, top_n_tracks), 0.05); // take only the top top_n_tracks songs
  var trace2 = {
      x: energy_all[1],
      y: energy_top[0].map(x => x * 100),
      type: 'bar', 
      opacity: 0.5, 
      name: "Top 1000", 
      marker: {
        color: 'rgb(4, 209, 147)',
      }
    };

  var trace3 = {
      x: energy_all[1],
      y: energy_all[0].map(x => x * 100),
      mode: "lines+markers",
      name: "All Songs", 
      line: {shape: 'spline'},
      type: 'scatter', 
      marker: {
        color: 'rgb(201, 115, 2)',
      }
    }
  
  var trace4 = {
      x: energy_all[1],
      y: energy_top[0].map(x => x * 100),
      mode: "lines+markers",
      name: "Top 1000 Spline", 
      line: {shape: 'spline'},
      type: 'scatter', 
      marker: {
        color: 'rgb(4, 209, 147)',
      }
    }

  var data = [trace1, trace2, trace3, trace4];
  var layout = {title: "Energy", 
                barmode: 'overlay', 
                xaxis: {
                  title: "Energy Value [0-1]"
                },
                yaxis: {
                  title: "Songs [%]"
                }
              };
  
  Plotly.newPlot('energy_div', data, layout);
  
  //Danceability
  var danceability_all = histogram(danceability_list, 0.05);
  var trace1 = {
      x: danceability_all[1],
      y: danceability_all[0].map(x => x * 100),
      type: 'bar', 
      opacity: 0.5,
      name: "All Songs", 
      marker: {
        color: 'rgb(201, 115, 2)',
      }
    };
  
  var danceability_top = histogram(danceability_list.slice(0, top_n_tracks), 0.05); // take only the top top_n_tracks songs
  var trace2 = {
      x: danceability_all[1],
      y: danceability_top[0].map(x => x * 100),
      type: 'bar', 
      opacity: 0.5, 
      name: "Top 1000", 
      marker: {
        color: 'rgb(4, 209, 147)',
      }
    };

  var trace3 = {
      x: danceability_all[1],
      y: danceability_all[0].map(x => x * 100),
      mode: "lines+markers",
      name: "All Songs", 
      line: {shape: 'spline'},
      type: 'scatter', 
      marker: {
        color: 'rgb(201, 115, 2)',
      }
    }
  
  var trace4 = {
      x: danceability_all[1],
      y: danceability_top[0].map(x => x * 100),
      mode: "lines+markers",
      name: "Top 1000 Spline", 
      line: {shape: 'spline'},
      type: 'scatter', 
      marker: {
        color: 'rgb(4, 209, 147)',
      }
    }
  var data = [trace1, trace2, trace3, trace4];
  var layout = {title: "Danceability", 
                barmode: 'overlay', 
                xaxis: {
                  title: "Danceability Value [0-1]"
                },
                yaxis: {
                  title: "Songs [%]"
                }
              };
  
  Plotly.newPlot('danceability_div', data, layout);
  
  //Speechiness 
  var speechiness_all = histogram(speechiness_list, 0.05);
  var trace1 = {
      x: speechiness_all[1],
      y: speechiness_all[0].map(x => x * 100),
      type: 'bar', 
      opacity: 0.5,
      name: "All Songs", 
      marker: {
        color: 'rgb(201, 115, 2)',
      }
    };
  
  var speechiness_top = histogram(speechiness_list.slice(0, top_n_tracks), 0.05); // take only the top top_n_tracks songs
  var trace2 = {
      x: speechiness_all[1],
      y: speechiness_top[0].map(x => x * 100),
      type: 'bar', 
      opacity: 0.5, 
      name: "Top 1000", 
      marker: {
        color: 'rgb(4, 209, 147)',
      }
    };

  var trace3 = {
      x: speechiness_all[1],
      y: speechiness_all[0].map(x => x * 100),
      mode: "lines+markers",
      name: "All Songs", 
      line: {shape: 'spline'},
      type: 'scatter', 
      marker: {
        color: 'rgb(201, 115, 2)',
      }
    }
  
  var trace4 = {
      x: speechiness_all[1],
      y: speechiness_top[0].map(x => x * 100),
      mode: "lines+markers",
      name: "Top 1000 Spline", 
      line: {shape: 'spline'},
      type: 'scatter', 
      marker: {
        color: 'rgb(4, 209, 147)',
      }
    }

  var data = [trace1, trace2, trace3, trace4];
  var layout = {title: "Speechiness", 
                barmode: 'overlay', 
                xaxis: {
                  title: "Speechiness Value [0-1]"
                },
                yaxis: {
                  title: "Songs [%]"
                }
              };
  
  Plotly.newPlot('speechiness_div', data, layout);

  //Acousticness 
  var acousticness_all = histogram(acousticness_list, 0.05);
  var trace1 = {
      x: acousticness_all[1],
      y: acousticness_all[0].map(x => x * 100),
      type: 'bar', 
      opacity: 0.5,
      name: "All Songs", 
      marker: {
        color: 'rgb(201, 115, 2)',
      }
    };
  
  var acousticness_top = histogram(acousticness_list.slice(0, top_n_tracks), 0.05); // take only the top top_n_tracks songs
  var trace2 = {
      x: acousticness_all[1],
      y: acousticness_top[0].map(x => x * 100),
      type: 'bar', 
      opacity: 0.5, 
      name: "Top 1000", 
      marker: {
        color: 'rgb(4, 209, 147)',
      }
    };

  var trace3 = {
      x: acousticness_all[1],
      y: acousticness_all[0].map(x => x * 100),
      mode: "lines+markers",
      name: "All Songs", 
      line: {shape: 'spline'},
      type: 'scatter', 
      marker: {
        color: 'rgb(201, 115, 2)',
      }
    }
  
  var trace4 = {
      x: acousticness_all[1],
      y: acousticness_top[0].map(x => x * 100),
      mode: "lines+markers",
      name: "Top 1000 Spline", 
      line: {shape: 'spline'},
      type: 'scatter', 
      marker: {
        color: 'rgb(4, 209, 147)',
      }
    }

  var data = [trace1, trace2, trace3, trace4];
  var layout = {title: "Acousticness", 
                barmode: 'overlay', 
                xaxis: {
                  title: "Acousticness Value [0-1]"
                },
                yaxis: {
                  title: "Songs [%]"
                }
              };
  
  Plotly.newPlot('acousticness_div', data, layout);

  //Instrumentalness 
  var instrumentalness_all = histogram(instrumentalness_list, 0.05);
  var trace1 = {
      x: instrumentalness_all[1],
      y: instrumentalness_all[0].map(x => x * 100),
      type: 'bar', 
      opacity: 0.5,
      name: "All Songs", 
      marker: {
        color: 'rgb(201, 115, 2)',
      }
    };
  
  var instrumentalness_top = histogram(instrumentalness_list.slice(0, top_n_tracks), 0.05); // take only the top top_n_tracks songs
  var trace2 = {
      x: instrumentalness_all[1],
      y: instrumentalness_top[0].map(x => x * 100),
      type: 'bar', 
      opacity: 0.5, 
      name: "Top 1000", 
      marker: {
        color: 'rgb(4, 209, 147)',
      }
    };

  var trace3 = {
      x: instrumentalness_all[1],
      y: instrumentalness_all[0].map(x => x * 100),
      mode: "lines+markers",
      name: "All Songs", 
      line: {shape: 'spline'},
      type: 'scatter', 
      marker: {
        color: 'rgb(201, 115, 2)',
      }
    }
  
  var trace4 = {
      x: instrumentalness_all[1],
      y: instrumentalness_top[0].map(x => x * 100),
      mode: "lines+markers",
      name: "Top 1000 Spline", 
      line: {shape: 'spline'},
      type: 'scatter', 
      marker: {
        color: 'rgb(4, 209, 147)',
      }
    }

  var data = [trace1, trace2, trace3, trace4];
  var layout = {title: "Instrumentalness", 
                barmode: 'overlay', 
                xaxis: {
                  title: "Instrumentalness Value [0-1]"
                },
                yaxis: {
                  title: "Songs [%]"
                }
              };
  
  Plotly.newPlot('instrumentalness_div', data, layout);
  
  //Liveness 
  var liveness_all = histogram(liveness_list, 0.05);
  var trace1 = {
      x: liveness_all[1],
      y: liveness_all[0].map(x => x * 100),
      type: 'bar', 
      opacity: 0.5,
      name: "All Songs", 
      marker: {
        color: 'rgb(201, 115, 2)',
      }
    };
  
  var liveness_top = histogram(liveness_list.slice(0, top_n_tracks), 0.05); // take only the top top_n_tracks songs
  var trace2 = {
      x: liveness_all[1],
      y: liveness_top[0].map(x => x * 100),
      type: 'bar', 
      opacity: 0.5, 
      name: "Top 1000", 
      marker: {
        color: 'rgb(4, 209, 147)',
      }
    };

  var trace3 = {
      x: liveness_all[1],
      y: liveness_all[0].map(x => x * 100),
      mode: "lines+markers",
      name: "All Songs", 
      line: {shape: 'spline'},
      type: 'scatter', 
      marker: {
        color: 'rgb(201, 115, 2)',
      }
    }
  
  var trace4 = {
      x: liveness_all[1],
      y: liveness_top[0].map(x => x * 100),
      mode: "lines+markers",
      name: "Top 1000 Spline", 
      line: {shape: 'spline'},
      type: 'scatter', 
      marker: {
        color: 'rgb(4, 209, 147)',
      }
    }

  var data = [trace1, trace2, trace3, trace4];
  var layout = {title: "Liveness", 
                barmode: 'overlay', 
                xaxis: {
                  title: "Liveness Value [0-1]"
                },
                yaxis: {
                  title: "Songs [%]"
                }
              };
  
  Plotly.newPlot('liveness_div', data, layout);

  //Process the distribution relevance of the total data in comparison to the selected top data.
  var energy_relevance = 0;
  for (let i=0; i<energy_top[0].length; i++) {
    energy_relevance += Math.abs(energy_all[0][i]-energy_top[0][i]); // the lower this number, the more similar the two distributions are, thus the more irrelevant they are.
  }
  console.log(energy_relevance)

  var danceability_relevance = 0;
  for (let i=0; i<danceability_top[0].length; i++) {
    danceability_relevance += Math.abs(danceability_all[0][i]-danceability_top[0][i]); // the lower this number, the more similar the two distributions are, thus the more irrelevant they are.
  }
  console.log(danceability_relevance)

  var speechiness_relevance = 0;
  for (let i=0; i<speechiness_top[0].length; i++) {
    speechiness_relevance += Math.abs(speechiness_all[0][i]-speechiness_top[0][i]); // the lower this number, the more similar the two distributions are, thus the more irrelevant they are.
  }
  console.log(speechiness_relevance)

  var acousticness_relevance = 0;
  for (let i=0; i<acousticness_top[0].length; i++) {
    acousticness_relevance += Math.abs(acousticness_all[0][i]-acousticness_top[0][i]); // the lower this number, the more similar the two distributions are, thus the more irrelevant they are.
  }
  console.log(acousticness_relevance)

  var instrumentalness_relevance = 0;
  for (let i=0; i<instrumentalness_top[0].length; i++) {
    instrumentalness_relevance += Math.abs(instrumentalness_all[0][i]-instrumentalness_top[0][i]); // the lower this number, the more similar the two distributions are, thus the more irrelevant they are.
  }
  console.log(instrumentalness_relevance)

  var liveness_relevance = 0;
  for (let i=0; i<liveness_top[0].length; i++) {
    liveness_relevance += Math.abs(liveness_all[0][i]-liveness_top[0][i]); // the lower this number, the more similar the two distributions are, thus the more irrelevant they are.
  }
  console.log(liveness_relevance)
  
  var data = [{
    type: "pie",
    values: [energy_relevance, danceability_relevance, speechiness_relevance, acousticness_relevance, instrumentalness_relevance, liveness_relevance],
    labels: ["Energy", "Danceability", "Speechiness", "Acousticness", "Instrumentalness", "Liveness"],
    textinfo: "label+percent",
    textposition: "outside",
    automargin: true
  }]
  
  var layout = {
    height: 400,
    width: 400,
    margin: {"t": 0, "b": 0, "l": 0, "r": 0},
    showlegend: false, 
    title: "Characteristic Relevance for Top 1000 Tracks"
    }
  
  Plotly.newPlot('relevance_div', data, layout)
})