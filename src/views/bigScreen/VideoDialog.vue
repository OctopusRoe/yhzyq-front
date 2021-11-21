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
      mode: 1,
      muted: true,
      volume: 50,
      volumeOnSvg: {
        template: '<svg t="1624453273744" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1421" width="200" height="200"><path d="M597.994667 138.005333q130.005333 28.010667 213.994667 132.992t84.010667 241.002667-84.010667 241.002667-213.994667 132.992l0-88q93.994667-28.010667 153.002667-106.005333t59.008-180.010667-59.008-180.010667-153.002667-106.005333l0-88zM704 512q0 120-106.005333 172.010667l0-344q106.005333 52.010667 106.005333 172.010667zM128 384l170.005333 0 213.994667-213.994667 0 684.010667-213.994667-213.994667-170.005333 0 0-256z" p-id="1422"></path></svg>'
      },
      volumeOffSvg: {
        template: '<svg t="1624453193279" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9147" width="200" height="200"><path d="M512 170.005333l0 180.010667-90.005333-90.005333zM181.994667 128l714.005333 714.005333-53.994667 53.994667-88-88q-74.005333 58.005333-156.010667 77.994667l0-88q50.005333-13.994667 96-50.005333l-181.994667-181.994667 0 288-213.994667-213.994667-170.005333 0 0-256 202.005333 0-202.005333-202.005333zM810.005333 512q0-101.994667-59.008-180.010667t-153.002667-106.005333l0-88q130.005333 28.010667 213.994667 132.992t84.010667 241.002667q0 96-44.010667 178.005333l-64-66.005333q21.994667-53.994667 21.994667-112zM704 512q0 18.005333-2.005333 26.005333l-104-104 0-93.994667q106.005333 52.010667 106.005333 172.010667z" p-id="9148"></path></svg>'
      },
      timeoutId: null
    }
  },
  methods: {
    async open() {
      this.dialogVisible = true
      await this.customCreatePlayer()
      this.getUrl()
    },
    close() {
      this.dialogVisible = false
      this.stopPlay()
      this.player = null
      clearTimeout(this.timeoutId)
    },
    init() {
      // 设置播放容器的宽高并监听窗口大小变化
      window.addEventListener('resize', () => {
        this.player.JS_Resize()
      })
    },
    createPlayer() {
      const that = this
      this.player = new window.JSPlugin({
        szId: 'player',
        szBasePath: "/yhbi/yhbi",
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

        },
        pluginErrorHandler: function (iWndIndex, iErrorCode, oError) {  //插件错误回调

        },
        windowEventOver: function (iWndIndex) {  //鼠标移过回调

        },
        windowEventOut: function (iWndIndex) {  //鼠标移出回调

        },
        windowEventUp: function (iWndIndex) {  //鼠标mouseup事件回调

        },
        windowFullCcreenChange: function (bFull) {  //全屏切换回调

        },
        firstFrameDisplay: function (iWndIndex, iWidth, iHeight) {  //首帧显示回调
          that.timeoutId = setTimeout(() => {
            that.getUrl()
          }, 4.5 * 60 * 1000)
        },
        performanceLack: function () {  //性能不足回调

        }
      });
    },
    realplay() {
      let { player, mode, urls } = this,
        index = player.currentWindowIndex,
        playURL = urls.realplay

      player.JS_Play(playURL, { playURL, mode }, index).then(
        () => {
          this.openSound()
        },
        e => {
          this.realplay()
          clearTimeout(this.timeoutId)
          this.timeoutId = setTimeout(() => {
            this.getUrl()
          }, 4.5 * 60 * 1000)
        }
      )
    },
    stopPlay() {
      this.player.JS_Stop().then(
        () => { this.playback.rate = 0; },
        e => { }
      )
    },
    // 开启声音
    openSound() {
      const index = this.player.currentWindowIndex
      this.player.JS_OpenSound(index).then(() => {
        console.log('open sound success')
        this.player.JS_SetVolume(index, 50).then(() => {
          console.log('set volume success')
        })
      })
    },
    async customCreatePlayer() {
      await this.init()
      await this.createPlayer()
    },
    async getUrl() {
      const { code, result, message } = await getCameraPreviewURL({ deviceId: this.info.deviceNumber })
      if (code === 200 && result) {
        this.urls.realplay = result
        this.realplay()
      } else if (!result || message === '获取摄像头视频地址失败，请刷新') {
        this.getUrl()
      }
    }
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