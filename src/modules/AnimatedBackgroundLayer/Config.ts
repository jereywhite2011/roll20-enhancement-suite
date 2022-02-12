import TransformDirname from '../../utils/TransformDirname'

export default <VTTES.Module_Config> {
  filename: TransformDirname(__dirname),
  id: "animatedBackground",
  name: "Animated Background",
  description: "Displays an animated background if the GM has one set up for the page. Setup can be found in the top-right corner, look for a orange film button.",
  category: VTTES.Module_Category.canvas,
  gmOnly: false,

  media: {
    "animated_bg.webm": "Setup & usage"
  },

  config: {
    muteAudio: false,
    audioVolume: 0.1,
    video_history: []
  },

  configView: {
    muteAudio: {
      display: "Mute Audio?",
      type: VTTES.Config_View_Type.Checkbox
    },

    audioVolume: {
      display: "Audio Volume",
      type: VTTES.Config_View_Type.Slider,
      sliderMin: 0,
      sliderMax: 1,
    }
  },

  mods: [
    {
      includes: "vtt.bundle.js",
      find: `updateCanvasZoom:()=>d20.engine.canvasZoom=ee.canvasZoom`,

      patch: `updateCanvasZoom:()=> {
        if(window.r20es && window.r20es.onZoomChange) {
          window.r20es.onZoomChange(B);
        }
        d20.engine.canvasZoom = ee.canvasZoom;
      }`,

      stability_checks: [
        `d20.engine.setZoom=(B,H,J)`,
      ],
    }
  ]
};
