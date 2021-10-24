import MapInit from 'octopus-map-one'
import { getMapData, tileBaseUrl } from '@/views/bigScreen/api'
export default {
    data() {
        return {
            map: null
        }
    },
    mounted() {
        this.getMap()
    },
    methods: {
        // 初始化地图
        mapInit(data) {
            this.map = new MapInit({
                target: this.$refs.map,
                useControl: false
            })

            this.map.addView({
                center: [115.904642, 28.680854],
                proj: 'EPSG:4326',
                zoom: 8,
                minZoom: 7
            })

            this.map.useGLKF({
                url: tileBaseUrl,
                data: data,
                proj: 'EPSG: 4326'
            })
        },

        async getMap() {
            try {
                const back = await getMapData()
                this.mapInit(back.data)
            } catch (e) {

            }
        },
    },
}