import { getDicts } from "@/api/system/org/org";
export default {
    data() {
        return {
            worStaOptions: [],
        }
    },
    async mounted() {
        this.worStaOptions = await this.getDicts('WORK_JOB_STATUS');
    },
    methods: {
        async getDicts(type) {
            try {
                return await getDicts({ type })
            } catch (error) {
            }
        },
    },
}