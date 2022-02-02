import { gql } from '@apollo/client';

export const GET_PLAYLIST = gql`
query{
  getPlaylists {
    id
    title
  }
}
`

export const GET_TRACKS = gql`
query ($playlistId: Int!){
  getSongs(playlistId: $playlistId) {
    title
    photo
    url
    duration
    artist
    _id
  }
}
`

export const GET_TRACK_BY_NAME = gql`
query ($playlistId: Int!, $search: String){
  getSongs(playlistId: $playlistId, search: $search) {
    title
    photo
    url
    duration
    artist
    _id
  }
}
`