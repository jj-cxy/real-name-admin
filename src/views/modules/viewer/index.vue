<template>
  <div>
    <div class="attachment-btn" v-for="(item,index) in fileList" :key="index">
      <a-button type="dashed" size="small" icon="search" @click="handleView(item.url)">查看附件</a-button>
    </div>
    <!-- <ul class="file-list">
      <li v-for="(item,index) in fileList" :key="index">
        <a
          href="javascript:;"
          @click="handleView(item.url)"
          v-if="imgFormat[item.ext]"
        >{{item.name}}</a>
        <a
          href="javascript:;"
          @click="handleFile(item.name, item.url)"
          v-if="fileFormat[item.ext]"
        >{{item.name}}</a>
      </li>
    </ul>-->
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel" class="img-modal">
      <img alt="example" @load="loadImage" :src="previewImage" v-show="imgShow" />
    </a-modal>
  </div>
</template>

<script>
import { axios } from '@/utils/request'
export default {
  name: 'viewer',
  props: {
    ids: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      Urls: {
        imgListUrl: '/file/api/file/batchSelect'
      },
      previewVisible: false,
      previewImage: '',
      imgFormat: {
        jpg: 'jpg',
        png: 'png',
        jpeg: 'jpeg'
      },
      fileFormat: {
        pdf: 'pdf',
        xlsx: 'xlsx',
        docx: 'docx'
      },
      fileList: [],
      imgShow: false
    }
  },
  watch: {
    ids: function(val, oldVal) {
      this.ids = val
      this.getImg()
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.ids) {
        this.getImg()
      }
    })
  },
  methods: {
    // 获取图片
    getImg() {
      axios({
        url: this.Urls.imgListUrl,
        method: 'get',
        params: {
          ids: this.ids
        }
      }).then(res => {
        this.fileList = res.data
      })
    },
    // 下载文件
    handleFile(name, url) {
      let link = document.createElement('a')
      link.download = name
      link.href = url
      link.click()
    },
    // 查看图片
    handleView(url) {
      this.previewVisible = true
      this.previewImage = url
    },
    handleCancel() {
      this.previewVisible = false
    },
    loadImage() {
      this.imgShow = true
    }
  }
}
</script>

<style scoped>
</style>