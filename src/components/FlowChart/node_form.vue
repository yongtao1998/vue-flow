<template>
  <div class="dialog_node_form">
  <el-dialog
    title="当前节点设置"
    :visible.sync="activeTopTemp"
    width="600px"
    :close-on-click-modal='false'
    :show-close='false'
    >
      <!-- SHELL 类型 -->
    <div class="ef-node-form" v-show="type === 'SHELL'">
      <div class="ef-node-form-body">
        <el-form :model="shellFrom" ref="shellFrom" :rules="shellFromRules" label-width="120px" :disabled="readOnly">
          <el-form-item label="节点名称：" prop="name">
              <el-input v-model="shellFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="运行标志：">
            <el-radio-group v-model="shellFrom.type">
              <el-radio label="正常"></el-radio>
              <el-radio label="禁止直行"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="描述：">
            <el-input type="textarea" :rows="3" v-model="shellFrom.desc"></el-input>
          </el-form-item>
          <el-form-item label="优先级：">
            <el-select v-model="shellFrom.region" class="region_select" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="失败重试次数：">
              <div class="line_inline">
                <el-input v-model="shellFrom.frequency"></el-input>
                <div>
                  <span>失败重试间隔：</span>
                  <el-input v-model="shellFrom.interval"></el-input>
                </div>
              </div>
          </el-form-item>
          <el-form-item label="延迟执行时间：">
            <div class="line_inline">
              <el-input v-model="shellFrom.executionTime"></el-input>
            </div>
          </el-form-item>
         
          <el-form-item label="脚本：" prop="scripts">
              <CodeMirror @blurCode='blurCode' :scripts='shellFrom.scripts'/>
          </el-form-item>
          <el-form-item label="资源：">
            <div class="form_resources">
              <el-select v-model="shellFrom.resources"  placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            <el-button type="primary" class="resources_btn" size="small">添加</el-button>
            </div>
          </el-form-item>
          <el-form-item class="btn_botttom">
          <el-button v-if="!readOnly" type="primary" class="btn_one" @click="save('shellFrom')">确定</el-button>
          <el-button v-if="!readOnly" type="primary" @click="closeDialog()">取消</el-button>
          <!-- <el-button v-else-if="shellFrom.status" type="primary" @click="closeDialog()">取消</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- FLINK 类型 -->
    <div class="ef-node-form" v-show="type === 'FLINK'">
      <div class="ef-node-form-body">
        <el-form :model="flinkFrom" ref="flinkFrom" :rules="flinkFromFules" label-width="160px" :disabled="readOnly">
          <el-form-item label="节点名称：" prop="name">
              <el-input v-model="flinkFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="运行标志：">
            <el-radio-group v-model="flinkFrom.type">
              <el-radio label="正常"></el-radio>
              <el-radio label="禁止运行"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="描述：">
            <el-input type="textarea" :rows="3" v-model="flinkFrom.desc"></el-input>
          </el-form-item>
          <el-form-item label="主函数的Class：" prop="class">
            <el-input v-model="flinkFrom.class"></el-input>
          </el-form-item>
          <el-form-item label="主程序包：" prop="resources">
            <div class="form_resources">
              <el-select v-model="flinkFrom.resources"  placeholder="请选择主程序包">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            <el-button type="primary" class="resources_btn" size="small">添加</el-button>
            </div>
          </el-form-item>
          <el-form-item label="任务名称：">
            <el-input v-model="flinkFrom.taskName"></el-input>
          </el-form-item>
          <el-form-item label="JobManage内存数：">
              <div class="line_inline">
                <el-input v-model="flinkFrom.JobNums"></el-input>
                <div>
                  <span>TaskManager内存数：</span>
                  <el-input v-model="flinkFrom.TaskInternalNums"></el-input>
                </div>
              </div>
          </el-form-item>
          <el-form-item label="Slot数量：">
              <div class="line_inline">
                <el-input v-model="flinkFrom.SlotNums"></el-input>
                <div>
                  <span>TaskManager数量：</span>
                  <el-input v-model="flinkFrom.TaskNums"></el-input>
                </div>
              </div>
          </el-form-item>
          <el-form-item label="并行度：">
            <div class="line_inline">
              <el-input v-model="flinkFrom.parallelNums"></el-input>
            </div>
          </el-form-item>
         
          <el-form-item label="主函数参数：">
              <el-input type="textarea" v-model="flinkFrom.mainFun"></el-input>
          </el-form-item>
          <el-form-item label="选项参数：">
              <el-input type="textarea" v-model="flinkFrom.selectParameter"></el-input>
          </el-form-item>
          <el-form-item label="资源：">
            <div class="form_resources">
              <el-select v-model="flinkFrom.resources2"  placeholder="请选择资源">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            <el-button type="primary" class="resources_btn" size="small">添加</el-button>
            </div>
          </el-form-item>
          <el-form-item class="btn_botttom">
          <el-button v-if="!readOnly" type="primary" class="btn_one" @click="save('flinkFrom')">确定</el-button>
          <el-button v-if="!readOnly" type="primary" @click="closeDialog()">取消</el-button>
          </el-form-item>
        </el-form>      
      </div>
    </div>

    <!-- Line -->
    <el-form :model="line" ref="dataForm" label-width="80px" v-show="type === 'line'"  :disabled="readOnly">
          <el-form-item label="条件">
            <el-input v-model="line.label"></el-input>
          </el-form-item>
          <el-form-item class="btn_botttom">
              <el-button v-if="!readOnly" type="primary" @click="saveLine">确定</el-button>
              <el-button v-if="!readOnly" type="primary" @click="shutDialog">取消</el-button>
          </el-form-item>
    </el-form>

  </el-dialog>
</div>

</template>

<script scope>
  import { cloneDeep } from 'lodash'
  import CodeMirror from './Codemirror/codeMirror.vue'
  import Bus from './eventBus'
	//TODO: 表单配置
  export default {
    props:{
      readOnly: { // 只读
        type: Boolean,
        default: false
      },
      centerDialogVisible:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        visible: true,
        type: '',
        node: {},
        line: {},
        data: {},
        activeTopTemp:false,
        shellFrom:{
          name:'',
          type:'',
          desc:'',
          region:'',
          scripts:'',
          resources:'',
          frequency:'',
          interval:'',
          executionTime:'',
        },
        flinkFrom:{
          name:'',
          type:'',
          desc:'',
          class:'',
          resources:'',
          resources2:'',
          taskName:'',
          JobNums:'',
          TaskInternalNums:'',
          SlotNums:'',
          TaskNums:'',
          parallelNums:'',
          mainFun:'',
          selectParameter:'',
        },
        formType:'', // 表单类型
        shellFromRules:{  // shell表单校验
          name: [{ required: true, message: '请输入节点名称', trigger: 'blur' }],
          scripts:[{ required: true, validator: this.checkScript, trigger: 'blur' }]
        },
        flinkFromFules:{  // flink表单校验
          name: [{ required: true, message: '请输入节点名称', trigger: 'blur' }],
          class:[{ required: true, message: '请输入主函数的Class', trigger: 'blur' }],
          resources:[{ required: true, message: '请选择主程序包', trigger: 'blur' }]
        }
      }
    },
    components:{
      CodeMirror
    },
    watch:{
      centerDialogVisible(news,olds){
        this.activeTopTemp = news
      },
    },
    methods: {
      shutDialog(){
        this.$emit('closeDialog')
      },
      checkScript(rule, value, callback){
        value = this.shellFrom.scripts
        if (!value) {
          callback(new Error("请输入脚本内容"));
        }else{
          callback();
        }
      },
      blurCode(code){
        this.shellFrom.scripts = code
      },
      closeDialog(){
         this.data.nodeList.filter((node) => {
            if (node.id === this.node.id && node.status !== true) Bus.$emit('formDeleteNode', node)
        })
        this.$emit('closeDialog')
      },
      /**
       * 表单修改，这里可以根据传入的ID进行业务信息获取
       * @param data
       * @param id
       */
      nodeInit(data, id) {
        this.data = data
        data.nodeList.filter((node) => {
          if (node.id === id) {
            this.node = cloneDeep(node)
            console.log("Init:",node);
            this.type = node.type
            if (node.type == 'SHELL' ) {
              this.shellFrom = cloneDeep(node.formFields)
              this.$refs.shellFrom.clearValidate();  
            }else{
              this.flinkFrom = cloneDeep(node.formFields)
              this.$refs.flinkFrom.clearValidate();  
            }
          }
        })
      },
      lineInit(line) {
        this.type = 'line'
        this.line = line
      },
      // 修改连线
      saveLine(){
        this.$emit('setLineLabel', this.line.from, this.line.to, this.line.label)
        this.$emit('closeDialog')
      },
      save(type){
        this.$refs[type].validate((valid)=>{
          if (valid) {
              this.data.nodeList.filter((node) => {
                if (node.id === this.node.id) {
                  console.log(1,"save",node);
                    node.status = true
                    node.name = this[type].name
                    node.left = this.node.left
                    node.top = this.node.top
                    node.ico = this.node.ico
                    node.formFields = this[type]
                    console.log(2,"save",node);
                    this.closeDialog()
                    this.$emit('repaintEverything')
                }
              })
            }else{
              return false
            }
          })
        
      },
      cancelCreate(){
        console.log("取消");
        //  this.data.nodeList.filter((node) => {
        //         // if (node.id === this.node.id) {
                
        //         // }
        //       })
      }
    }
  }
</script>

<style scoped>
/deep/ .el-dialog__wrapper{
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
.region_select{
  width: 100%;
}
.btn_botttom{
  display: flex;
  justify-content: center;
}
.form_resources{
  width: 100%;
  display: flex;
  align-items: center;
}
.form_resources /deep/ .el-select{
  flex: 1;
}
.resources_btn{
  height: 32px;
  /* line-height: 32px; */
  margin-left: 20px;
}

.line_inline{
  display: flex;
  justify-content: space-between;
}
.line_inline /deep/ .el-input{
  width: 110px;
}
/deep/ .el-dialog{
  position: relative;
  float: right;
  margin: 0!important;
  min-height: 100%;
}
</style>
<style >
  .btn_one{
    margin-right: 40px;
  }
  .el-node-form-tag {
    position: absolute;
    top: 50%;
    margin-left: -15px;
    height: 40px;
    width: 15px;
    background-color: #fbfbfb;
    border: 1px solid rgb(220, 227, 232);
    border-right: none;
    z-index: 0;
  }
  .ef-node-form{
    z-index: 2002;
  }
  .dialog_node_form{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
@keyframes  dialog-fade-in {
    0% {
      transform: translate3d(100%, 0, 0);
      opacity: 0;
    }
    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @keyframes  dialog-fade-out {
    0% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    100% {
      transform: translate3d(100%, 0, 0);
      opacity: 0;
    }
  }
</style>
