<template>
  <el-dialog
    title="摄像头-实时视频"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    destroy-on-close
    :close-on-click-modal="false"
    width="50%"
  >
    <div id="player"></div>
  </el-dialog>
</template>

<script>
import { getCameraPreviewURL } from './api';
export default {
  props: {
    info: {
      type: Object | null,
      default: () => {
        return { deviceNumber: 'b9a6dfb9cb4a4cb5ad753cb8361f581c' }
      }
    },
  },
  data() {
    return {
      dialogVisible: false,
      player: null,
      IS_MOVE_DEVICE: false,
      urls: {
        realplay: 'ws://59.63.158.26:559/openUrl/ltmEPeg',
        talk: '',
        playback: ''
      },
      model: 0,
    }
  },
  methods: {
    async open() {
      this.dialogVisible = true
      if (this.info.deviceNumber) {
        // const { code, result } = await getCameraPreviewURL({ deviceId: this.info.deviceNumber })
        // if (code === 200) {
        //   this.urls.realplay = result
        //   console.log('%c 🍣 this.urls.realplay: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', this.urls.realplay);
        // }
        setTimeout(() => {
          this.init()
          this.createPlayer()
          this.realplay()
        }, 1000)
      }

    },
    close() {
      this.dialogVisible = false
      this.player = null
    },
    init() {
      // 设置播放容器的宽高并监听窗口大小变化
      window.addEventListener('resize', () => {
        this.player.JS_Resize()
      })
    },
    createPlayer() {
      this.player = new JSPlugin({
        szId: 'player',
        szBasePath: "/",
        iMaxSplit: 1,
        iCurrentSplit: this.IS_MOVE_DEVICE ? 1 : 2,
        openDebug: true,
        oStyle: {
          borderSelect: this.IS_MOVE_DEVICE ? '#000' : '#FFCC00',
        }
      })

      // 事件回调绑定
      this.player.JS_SetWindowControlCallback({
        windowEventSelect: function (iWndIndex) {  //插件选中窗口回调
          console.log('windowSelect callback: ', iWndIndex);
        },
        pluginErrorHandler: function (iWndIndex, iErrorCode, oError) {  //插件错误回调
          console.log('pluginError callback: ', iWndIndex, iErrorCode, oError);
        },
        windowEventOver: function (iWndIndex) {  //鼠标移过回调
          //console.log(iWndIndex);
        },
        windowEventOut: function (iWndIndex) {  //鼠标移出回调
          //console.log(iWndIndex);
        },
        windowEventUp: function (iWndIndex) {  //鼠标mouseup事件回调
          //console.log(iWndIndex);
        },
        windowFullCcreenChange: function (bFull) {  //全屏切换回调
          console.log('fullScreen callback: ', bFull);
        },
        firstFrameDisplay: function (iWndIndex, iWidth, iHeight) {  //首帧显示回调
          console.log('firstFrame loaded callback: ', iWndIndex, iWidth, iHeight);
        },
        performanceLack: function () {  //性能不足回调
          console.log('performanceLack callback: ');
        }
      });
    },
    realplay() {
      let { player, mode, urls } = this,
        index = player.currentWindowIndex,
        playURL = urls.realplay

      player.JS_Play(playURL, { playURL, mode }, index).then(
        () => { console.log('realplay success') },
        e => { console.error(e) }
      )
    },
    stopPlay() {
      this.player.JS_Stop().then(
        () => { this.playback.rate = 0; console.log('stop realplay success') },
        e => { console.error(e) }
      )
    },
  },
}
</script>

<style lang="scss" scoped>
#player {
  width: 100%;
  height: 500px;
  border: 1px solid black;
}
</style>