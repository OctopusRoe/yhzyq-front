import { queryMangeCenter } from "@/api/system/constructionOperation/";
export default {
    data() {
        return {
            centerTree: []
        }
    },
    mounted() {
        this.queryMangeCenter();
    },
    methods: {
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