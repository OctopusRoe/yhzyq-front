import { getDicts } from "@/api/system/org/org";
export default {
    data() {
        return {
            tableData: [],
            selIds: []
        }
    },
    async mounted() {
        this.devStaOptions = await this.getDicts('DEVICE_STATUS');
        this.devTypeOptions = await this.getDicts('DEVICE_TYPE')
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