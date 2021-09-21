export default class YoutubeHttpClient {
  base_url;
  channel_name;
  api_key;

  constructor(base_url, channel_name, api_key) {
    this.base_url = base_url.trim();
    this.channel_name = channel_name.trim();
    this.api_key = api_key.trim();
  }

  async getChannelId() {
    if (!channel_name) {
      throw new Error("channel name is missing.");
    }

    const uri = `${this.base_url}/channels?part=contentDetails&forUsername=${this.channel_name}&key=${this.api_key}`;

    const response = await fetch(uri);
    const responseJson = await response.json();

    return responseJson.items[0].id;
  }

  async getChannelUploadId() {
    if (!channel_name) {
      throw new Error("channel name is missing.");
    }

    const uri = `${this.base_url}/channels?part=contentDetails&forUsername=${this.channel_name}&key=${this.api_key}`;

    const response = await fetch(uri);
    const responseJson = await response.json();

    return responseJson.items[0].contentDetails.relatedPlaylists.uploads;
  }

  /**
   *
   * @param {String} channel_id
   * @param {Number} quantity
   * @returns
   */
  async getPlaylists(channel_id, quantity = 10) {
    if (!channel_id) {
      throw new Error("channel id is missing.");
    }

    const uri = `${this.base_url}/playlists?part=snippet&maxResults=${quantity}&channelId=${channel_id}&key=${this.api_key}`;

    const response = await fetch(uri);
    const responseJson = await response.json();

    return responseJson.items;
  }

  /**
   *
   * @param {String} channelUploadID
   * @param {Number} videosQuantity
   * @returns Response<Object[]>
   */
  async getLatestVideos(channelUploadID, videosQuantity = 10) {
    if (!channelUploadID) {
      throw new Error("channel upload id is missing.");
    }

    const uri = `${this.base_url}/playlistItems?part=snippet&maxResults=${videosQuantity}&playlistId=${channelUploadID}&key=${this.api_key}`;

    const response = await fetch(uri);
    const responseJson = await response.json();

    return responseJson.items;
  }

  /**
   *
   * @param {String} playlistId
   * @param {Number} videosQuantity
   * @returns Response<Object[]>
   */
  async getPlaylistVideos(playlistId, videosQuantity = 10) {
    if (!playlistId) {
      throw new Error("playlist id is missing.");
    }

    const uri = `${this.base_url}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${videosQuantity}&key=${this.api_key}`;

    const response = await fetch(uri);
    const responseJson = await response.json();

    return responseJson.items;
  }
}
