import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_PLAYLIST, GET_TRACKS, GET_TRACK_BY_NAME } from './Queries';
import { Col, Image, Row } from 'react-bootstrap';
import spotify from '../../assets/images/spotify.svg';
import _ from "lodash";
import AudioPlayer from 'react-h5-audio-player';
import sampleAudio from '../../assets/images/bensound-ukulele.mp3';
import { usePalette } from 'color-thief-react'
import Fade from 'react-reveal/Fade';
import moment from 'moment';
import profile from '../../assets/images/Profile.svg';

function NewHome() {
  const { data: dataP, /* loading: loadingP, error: errorP */ } = useQuery(GET_PLAYLIST);
  const [selectedTab, setTab] = useState("");
  useEffect(() => {
    if (dataP) {

      setTab(dataP.getPlaylists[0])
    }
  }, [dataP]);
  const { data: dataT,/*  loading: loadingT, error: errorT */ } = useQuery(GET_TRACKS, {
    variables: {
      playlistId: selectedTab && selectedTab.id
    }
  });
  const [selectedTrack, setTrack] = useState("");
  const [trackList, getTrack] = useState([]);
  useEffect(() => {
    if (dataT) {
      getTrack(dataT.getSongs);
    }

  }, [dataT]);
  const [searchValue, setSearch] = useState("");

  const handleSearch = (value) => {
    setSearch(value)
    debounce(value, selectedTab);
  }
  const [searchQuery, { data: dataS, /* loading: loadingS, error: errorS */ }] = useLazyQuery(GET_TRACK_BY_NAME)
  useEffect(() => {
    if (dataS) {
      getTrack(dataS.getSongs);
    }

  }, [dataS]);

  const debounce = useCallback(
    _.debounce((_searchVal, selectedTab) => {
      searchQuery({
        variables: {
          playlistId: selectedTab.id,
          search: _searchVal
        }
      })
    }, 1000),
    []
  );
  const { data: colorData, /* loading: colorLoading, error: colorError */ } = usePalette(selectedTrack.photo, 2, "hex", { crossOrigin: "Anonymous", quality: 10 })

  const audioRef = useRef()
  const playTrack = (item) => {
    setTrack(item);
  }
  useEffect(() => {
    if (selectedTrack) {
      audioRef.current.audio.current.play();
    }
  }, [selectedTrack]);
  return <div className='home-section' style={{ background: `linear-gradient(${colorData && colorData[0]}, ${colorData && colorData[1]})` }}>
    <Row>
      <Col lg={2} md={4} sm={4} xs={12}>
        <div className='category-section'>
          <Image src={spotify} className='logo' />
          <ul>
            {dataP &&
              dataP.getPlaylists.map((item, index) => {
                return (
                  <li key={index} onClick={() => setTab(item)} className={`basier-circle-regular ${selectedTab && selectedTab.id === item.id ? "" : "op-04"}`}>{item.title}</li>
                )
              })
            }
          </ul>
          <Image src={profile} className='profile-pic' />
        </div>
      </Col>
      <Col lg={4} md={8} sm={8} xs={12}>
        <div className='tracks-section'>
          <h2 className='basier-circle-bold f-s-32 lh-36'>{selectedTab && selectedTab.title}</h2>
          <input
            type="text"
            placeholder="Search Song, Artist"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            className='searchbox'
          />
          <Fade bottom cascade>
            <div className='track-wrapper'>
              {
                trackList && trackList.map((item, index) => {
                  return (
                    <div key={index} className={`track ${selectedTrack._id === item._id ? "active" : ""}`} onClick={() => playTrack(item)}>
                      <Image src={item.photo} className='track-image' />
                      <div className='name-wrapper'>
                        <h5 className='basier-circle-regular f-s-18 lh-24'>{item.title}</h5>
                        <h5 className='basier-circle-regular f-s-14 lh-24 op-06'>{item.artist}</h5>
                      </div>
                      <h6 className='basier-circle-regular f-s-18 lh-24 op-06'>{moment.utc(item.duration * 1000).format('mm:ss')}</h6>
                    </div>
                  )
                })
              }
            </div>
          </Fade>
        </div>
      </Col>
      <Col lg={6} md={12} sm={12} xs={12}>
        {
          selectedTrack &&
          <Fade bottom cascade>
            <div className='player-section'>
              <h2 className='basier-circle-bold f-s-32 lh-36'>{selectedTrack.title}</h2>
              <h5 className='basier-circle-regular f-s-16 lh-24 op-06'>{selectedTrack.artist}</h5>
              <Image src={selectedTrack.photo} className='player-image' />
              <AudioPlayer
                ref={audioRef}
                showFilledProgress
                autoPlay
                className='custom-audio-player'
                src={selectedTrack._id === "61b6f14dc2f7cafd968c31f0" ? sampleAudio : selectedTrack.url}
                onPlay={e => console.log("onPlay")}
                showDownloadProgress={false}
              />
            </div>
          </Fade>
        }
      </Col>
    </Row>
  </div>;
}

export default NewHome;