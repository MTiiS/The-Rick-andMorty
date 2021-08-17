async function fetchEpisode(url) {
  let episodeResponse = await fetch(url);
  return episodeResponse.json();
}

export { fetchEpisode };