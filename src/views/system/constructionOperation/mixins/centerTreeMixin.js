import { queryMangeCenter } from "@/api/system/constructionOperation/";
export default {
    data() {
        return {
            selectedCenter: {},
            centerTree: [],
        }
    },
    watch: {
        selectedCenter(center) {
            this.form.centerId = center.id
            this.form.centerName = center.name
        }
    },
    mounted() {
        this.queryMangeCenter();
    },
    methods: {
        nodeClick(node) {
            this.selectedCenter = node
            this.selectedCenterArr.push(node)
        },
        async queryMangeCenter() {
            try {
                const { code, result } = await queryMangeCenter()
                if (code === 200) {
                    this.centerTree = result
                }
            } catch (error) {

            }
        }
    },
}