<template>
  <a-modal
    :title="textMap[dialogStatus]"
    :width="980"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="模板名称">
          <span>{{model.name}}</span>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="协议内容">
          <quill-editor
            class="editor"
            ref="myTextEditor"
            :options="editorOption"
            v-model="model.content"
          ></quill-editor>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import pick from 'lodash.pick'
import { quillEditor } from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ['blockquote'], // 引用  代码块-----['blockquote', 'code-block']
  [
    {
      list: 'ordered'
    },
    {
      list: 'bullet'
    }
  ], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [
    {
      script: 'sub'
    },
    {
      script: 'super'
    }
  ], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  [
    {
      indent: '-1'
    },
    {
      indent: '+1'
    }
  ], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  [
    {
      direction: 'rtl'
    }
  ], // 文本方向-----[{'direction': 'rtl'}]
  [
    {
      header: [1, 2, 3, 4, 5, 6, false]
    }
  ], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [
    {
      color: []
    },
    {
      background: []
    }
  ], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [
    {
      align: []
    }
  ], // 对齐方式-----[{ align: [] }]
  ['clean'], // 清除文本格式-----['clean']
]
export default {
  name: 'AgreeModel',
  mixins: [modalMixin],
  components: {
    quillEditor
  },
  data() {
    return {
      Urls: {
        addUrl: '/biz/oaAgreement/insert',
        editUrl: '/biz/oaAgreement/update/'
      },
      textMap: {
        add: '新增协议',
        edit: '编辑协议'
      },
      editorOption: {
        placeholder: '内容',
        theme: 'snow',
        modules: {
          toolbar: {
            container: toolbarOptions
          }
        }
      }
    }
  },
  methods: {
    beforeSubmit(form) {
      form.content = this.model.content
      return form
    },
    setForm(data) {
      this.model = data
    }
  }
}
</script>

<style>
.editor {
  line-height: normal !important;
  height: 400px;
  width: 100%;
  margin-bottom: 50px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
  content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
  content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
  content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '字体尺寸';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
  content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
  content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
  content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
  content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
  content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
  content: '标题6';
}
</style>