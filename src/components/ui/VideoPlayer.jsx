import React, { useState, useRef } from "react"
import ReactPlayer from "react-player"

const VideoPlayer = ({ input }) => {
  const { url, poster } = input
  const [status, setStatus] = useState({
    mute: true,
    playing: true,
  })
  // console.log(input)
  const player = useRef()

  const config = {
    youtube: {
      playerVars: {
        controls: 0,
        disablekb: 1,
        enablejsapi: 1,
        iv_load_policy: 3,
        modestbranding: 1,
        showinfo: 0,
        cc_load_policy: 0,
        modestbranding: 1,
        showinfo: 0,
        rel: 0,
        origin: "https://agence-ter.netlify.app",
      },
    },
    vimeo: {
      title: "false",
      background: true,
      controls: false,
    },
  }

  const _onReady = () => {}
  const _onEnded = () => {}

  return (
    <div className="video-player " ref={player}>
      <ReactPlayer
        className={`player w-full h-full`}
        url={url}
        // url="https://vimeo.com/78429727"
        // playing={status.playing}
        playing={status.playing}
        loop={true}
        muted={status.mute}
        playsinline
        config={config}
        width="100%"
        height="100%"
        onReady={_onReady}
        onEnded={_onEnded}
      />
    </div>
  )
}

export default VideoPlayer
