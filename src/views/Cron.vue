<template>
 <div>
    <el-popover v-model="cronPopover">
        <cron @change="onChangeCron" @close="cronPopover = false"></cron>
        <el-input
            slot="reference"
            @click="cronPopover = true"
            v-model="formData.cronExpression"
            placeholder="请输入定时策略"
            size="small"
        ></el-input>
    </el-popover>
 </div>
</template>

<script>
import {cron} from 'vue-cron'
export default {
    components: { cron },
  data() {
    return {
        cronPopover: false,
        cron: "",
        formData: {
            cronExpression: "",
        },
    }
  },
  methods: {
    onChangeCron(v) {
      this.formData.cronExpression = v;
    },
  }
}
</script>

<style scoped>

</style>
