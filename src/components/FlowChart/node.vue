<template>
  <div
    ref="node"
    :style="nodeContainerStyle"
    :class="nodeContainerClass"
    @click="clickNode"
    @mouseup="changeNodeSite"
    @dblclick="dblclickNode"
  >
    <!-- 最左侧的那条竖线 -->
    <div class="ef-node-left"></div>
    <!-- 节点类型的图标 -->
    <div class="ef-node-left-ico flow-node-drag">
      <i :class="nodeIcoClass" class=" flow-node-drag"></i>
    </div>
    <!-- 节点名称 -->
    <div class="ef-node-text" :show-overflow-tooltip="true">
      {{node.name}}
    </div>
  </div>
</template>

<script>

export default {
  name: "node",
  props:{
    node:Object,
    activeElement:Object
  },
  data(){
    return {}
  },
  computed:{
    nodeContainerClass() {
      return {
        'ef-node-container': true,
        'ef-node-active': this.activeElement.type === 'node' ? this.activeElement.nodeId === this.node.id : false
      }
    },
    // 节点容器样式
    nodeContainerStyle() {
      return {
        top: this.node.top,
        left: this.node.left
      }
    },
    nodeIcoClass() {
      let nodeIcoClass = {}
      nodeIcoClass[this.node.ico] = true
      // 拖拽连线
      nodeIcoClass['flow-node-drag'] = this.node.viewOnly ? true : false
      return nodeIcoClass
    }
  },
  methods:{
    dblclickNode(){
      this.$emit('dblclickNode' , this.node.id)
    },
    clickNode() {
      this.$emit('clickNode' , this.node.id)
    },
    // 鼠标移动后抬起
    changeNodeSite(e) {
      // 避免抖动
      if (this.node.left == this.$refs.node.style.left && this.node.top == this.$refs.node.style.top) return;
      // console.log(e.currentTarget)
      this.$emit('changeNodeSite', {
        nodeId: this.node.id,
        left: this.$refs.node.style.left,
        top: this.$refs.node.style.top,
      })
    }

  }
}
</script>
