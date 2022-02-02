import React, { Component } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import spotify from '../../assets/images/spotify.svg';
// import reverse from '../../assets/images/reverse.svg';
// import forward from '../../assets/images/forward.svg';
// import play from '../../assets/images/play-icon.svg';
import sampleAudio from '../../assets/images/bensound-ukulele.mp3';
import AudioPlayer from 'react-h5-audio-player';
import QueryFunction from './QueryFunction';


export class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      trackList: [
        {
          id: 1,
          name: "Starboy",
          content: "The Weeknd",
          src: "https://i.pinimg.com/originals/1d/a7/9a/1da79a9ed751285378a05535ddb71ec8.png",
          duration: "4:16",
          trackType: 1,
        },
        {
          id: 2,
          name: "Starboy",
          content: "The Weeknd",
          src: "https://i.pinimg.com/originals/1d/a7/9a/1da79a9ed751285378a05535ddb71ec8.png",
          duration: "4:16",
          trackType: 2,
        },
        {
          id: 3,
          name: "Starboy",
          content: "The Weeknd",
          src: "https://i.pinimg.com/originals/1d/a7/9a/1da79a9ed751285378a05535ddb71ec8.png",
          duration: "4:16",
          trackType: 1,
        },
        {
          id: 4,
          name: "Starboy",
          content: "The Weeknd",
          src: "https://i.pinimg.com/originals/1d/a7/9a/1da79a9ed751285378a05535ddb71ec8.png",
          duration: "4:16",
          trackType: 3,
        },
        {
          id: 5,
          name: "Starboy",
          content: "The Weeknd",
          src: "https://i.pinimg.com/originals/1d/a7/9a/1da79a9ed751285378a05535ddb71ec8.png",
          duration: "4:16",
          trackType: 3,
        },
        {
          id: 6,
          name: "Starboy",
          content: "The Weeknd",
          src: "https://i.pinimg.com/originals/1d/a7/9a/1da79a9ed751285378a05535ddb71ec8.png",
          duration: "4:16",
          trackType: 4,
        },
      ],
      searchValue: "",
      play: false,
      tabList: [
        { value: 1, label: "For You" },
        { value: 2, label: "Top Tracks" },
        { value: 3, label: "Favourites" },
        { value: 4, label: "Recently Played" },
      ],
      selectedTab: 1,
      selectedTrack: "",
    }
    this.audio = new Audio(sampleAudio);
  }

  componentDidMount() {
  }

  // delayTimer;
  setSearch = (value) => {
    // clearTimeout(this.delayTimer);
    // this.delayTimer = setTimeout(() => {
    this.setState({
      searchValue: value
    })
    // }, 1000)

  }

  setTab = (value) => {
    this.setState({
      selectedTab: value
    })
  }
  setTrack = (track) => {
    this.setState({
      selectedTrack: track
    })
  }
  render() {

    return (

      <div className='home-section'>
        <Row>
          <Col lg={2} md={3} sm={3} xs={3}>
            <div className='category-section'>
              {/* <QueryFunction /> */}
              <Image src={spotify} className='logo' />
              <ul>
                {
                  this.state.tabList.map((item) => {
                    return (
                      <li onClick={() => this.setTab(item.value)} className={`basier-circle-regular ${this.state.selectedTab === item.value ? "" : "op-04"}`}>{item.label}</li>
                    )
                  })
                }

              </ul>
            </div>
          </Col>
          <Col lg={4} md={4} sm={3} xs={3}>
            <div className='tracks-section'>
              <h2 className='basier-circle-bold f-s-32 lh-36'>For You</h2>
              <input
                type="text"
                placeholder="Search Song, Artist"
                value={this.state.searchValue}
                onChange={(e) => this.setSearch(e.target.value)}
                className='searchbox'
              />
              <div className='track-wrapper'>
                {
                  this.state.trackList.map((item) => {
                    if (item.trackType === this.state.selectedTab) {
                      return (
                        <div className={`track ${item.id === this.state.selectedTrack.id ? "active" : ""}`} onClick={() => this.setTrack(item)}>
                          <Image src={item.src} className='track-image' />
                          <div className='name-wrapper'>
                            <h5 className='basier-circle-regular f-s-18 lh-24'>{item.name}</h5>
                            <h5 className='basier-circle-regular f-s-14 lh-24 op-06'>{item.content}</h5>
                          </div>
                          <h6 className='basier-circle-regular f-s-18 lh-24 op-06'>{item.duration}</h6>
                        </div>
                      )
                    } else {
                      return null
                    }

                  })
                }
              </div>
            </div>
          </Col>
          <Col lg={6} md={5} sm={3} xs={3}>
            <div className='player-section'>
              <h2 className='basier-circle-bold f-s-32 lh-36'>{this.state.selectedTrack.name}</h2>
              <h5 className='basier-circle-regular f-s-16 lh-24 op-06'>{this.state.selectedTrack.content}</h5>
              <Image src={this.state.selectedTrack.src} className='player-image' />
              <AudioPlayer
                showFilledProgress
                className='custom-audio-player'
                src={sampleAudio}
                onPlay={e => console.log("onPlay")}
                showDownloadProgress={false}
              />
              {/* </div> */}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home;
