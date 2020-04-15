<template>
  <div>
    <!-- 表格 -->
    <a-card :bordered="false">
      <a-table
        :columns="columns"
        :dataSource="listData"
        :loading="localLoading"
        :rowKey="(record,index)=> index"
        :pagination="false"
        size="middle"
      >
        <span slot="action" slot-scope="text, record">
          <a-button
            type="dashed"
            size="small"
            shape="circle"
            icon="edit"
            @click.native="handleEdit(record)"
          ></a-button>
          <a-divider type="vertical" />
          <a-button
            type="dashed"
            size="small"
            shape="circle"
            icon="eye"
            @click.native="handleDetail(record)"
          ></a-button>
        </span>
      </a-table>
    </a-card>

    <!-- 表单 -->
    <agree-modal ref="modalForm" @ok="afterSubmit"></agree-modal>
    <form-drawer ref="detailForm"></form-drawer>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'
import AgreeModal from '@/views/modules/AgreeModal'
import formDrawer from './modules/formDrawer'

export default {
  name: 'contract',
  mixins: [baseMixin, indexMixin],
  components: {
    AgreeModal,
    formDrawer
  }
}
</script>
