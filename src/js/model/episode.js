async function getEpisodeName(url) {
 let episode = await fetchEpisode(url);
 return (episode.name);
}

async function fetchEpisode(url) {
  let episodeResponse = await fetch(url);
  return await episodeResponse.json();
}

  export { getEpisodeName };