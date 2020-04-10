<template>
  <div>
    <a-row :gutter="32">
      <a-col :sm="12" :md="6" :xl="4" :style="{ marginBottom: '24px' }">
        <div class="work-info">
          <div class="work-info-item" @click="$router.push('/contract/todo')">
            <a-badge :count="count.oaEntrust" :offset="[0,10]">
              <i class="iconfont">&#xeb71;</i>
            </a-badge>
            <p>签署委托协议</p>
          </div>
        </div>
      </a-col>
      <a-col :sm="12" :md="6" :xl="4" :style="{ marginBottom: '24px' }">
        <div class="work-info">
          <div class="work-info-item" @click="$router.push('/disclosure/sheet')">
            <a-badge :count="count.oaDisclosureInfo" :offset="[0,10]">
              <i class="iconfont">&#xeb96;</i>
            </a-badge>
            <p>披露表制作</p>
          </div>
        </div>
      </a-col>
      <a-col :sm="12" :md="6" :xl="4" :style="{ marginBottom: '24px' }">
        <div class="work-info">
          <div class="work-info-item" @click="$router.push('/disclosure/publish')">
            <a-badge :count="count.publishCount" :offset="[0,10]">
              <i class="iconfont">&#xeb89;</i>
            </a-badge>
            <p>披露发布</p>
          </div>
        </div>
      </a-col>
      <a-col :sm="12" :md="6" :xl="4" :style="{ marginBottom: '24px' }">
        <div class="work-info">
          <div class="work-info-item" @click="$router.push('/account/audit')">
            <a-badge :count="count.oaRegAudit" :offset="[0,10]">
              <i class="iconfont">&#xeb76;</i>
            </a-badge>
            <p>账户资料审核</p>
          </div>
        </div>
      </a-col>
      <a-col :sm="12" :md="6" :xl="4" :style="{ marginBottom: '24px' }">
        <div class="work-info">
          <div class="work-info-item" @click="$router.push('/signUp/audit')">
            <a-badge :count="count.oaSign" :offset="[0,10]">
              <i class="iconfont">&#xeb65;</i>
            </a-badge>
            <p>报名资料审核</p>
          </div>
        </div>
      </a-col>
      <a-col :sm="12" :md="6" :xl="4" :style="{ marginBottom: '24px' }">
        <div class="work-info">
          <div class="work-info-item" @click="$router.push('/lessee/audit')">
            <a-badge :count="count.oaLessee" :offset="[0,10]">
              <i class="iconfont">&#xe815;</i>
            </a-badge>
            <p>审核承租人资格</p>
          </div>
        </div>
      </a-col>
      <a-col :sm="12" :md="6" :xl="4" :style="{ marginBottom: '24px' }">
        <div class="work-info">
          <div class="work-info-item" @click="$router.push('/trade/mode')">
            <a-badge :count="count.oaChoosetradetype" :offset="[0,10]">
              <i class="iconfont">&#xec51;</i>
            </a-badge>
            <p>选择交易方式</p>
          </div>
        </div>
      </a-col>
      <a-col :sm="12" :md="6" :xl="4" :style="{ marginBottom: '24px' }">
        <div class="work-info">
          <div class="work-info-item" @click="$router.push('/trade/result')">
            <a-badge :count="count.oaTradeNotice" :offset="[0,10]">
              <i class="iconfont">&#xe776;</i>
            </a-badge>
            <p>交易结果通知</p>
          </div>
        </div>
      </a-col>
      <a-col :sm="12" :md="6" :xl="4" :style="{ marginBottom: '24px' }">
        <div class="work-info">
          <div class="work-info-item" @click="$router.push('/contract/deal')">
            <a-badge :count="count.oaContractProcess" :offset="[0,10]">
              <i class="iconfont">&#xeb72;</i>
            </a-badge>
            <p>上传租赁合同</p>
          </div>
        </div>
      </a-col>
      <a-col :sm="12" :md="6" :xl="4" :style="{ marginBottom: '24px' }">
        <div class="work-info">
          <div class="work-info-item" @click="$router.push('/charge/list')">
            <a-badge :count="count.oaCharges" :offset="[0,10]">
              <i class="iconfont">&#xe648;</i>
            </a-badge>
            <p>收费通知书</p>
          </div>
        </div>
      </a-col>
      <a-col :sm="12" :md="6" :xl="4" :style="{ marginBottom: '24px' }">
        <div class="work-info">
          <div class="work-info-item" @click="$router.push('/refund/deposit')">
            <a-badge :count="count.oaCharges" :offset="[0,10]">
              <i class="iconfont">&#xe609;</i>
            </a-badge>
            <p>退还保证金</p>
          </div>
        </div>
      </a-col>
      <a-col :sm="12" :md="6" :xl="4" :style="{ marginBottom: '24px' }">
        <div class="work-info">
          <div class="work-info-item" @click="$router.push('/assets/expire')">
            <a-badge :count="count.expireBizAssetsCount" :offset="[0,10]">
              <i class="iconfont">&#xebb8;</i>
            </a-badge>
            <p>租赁到期资产</p>
          </div>
        </div>
      </a-col>
      <a-col :sm="12" :md="6" :xl="4" :style="{ marginBottom: '24px' }">
        <div class="work-info">
          <div class="work-info-item" @click="$router.push('/disclosure/extend')">
            <a-badge :count="count.extendCount" :offset="[0,10]">
              <i class="iconfont">&#xebb7;</i>
            </a-badge>
            <p>延长披露期</p>
          </div>
        </div>
      </a-col>
      <a-col :sm="12" :md="6" :xl="4" :style="{ marginBottom: '24px' }">
        <div class="work-info">
          <div class="work-info-item" @click="$router.push('/re/join')">
            <a-badge :count="count.relistCount" :offset="[0,10]">
              <i class="iconfont">&#xec08;</i>
            </a-badge>
            <p>重新挂牌</p>
          </div>
        </div>
      </a-col>
      <a-col :sm="12" :md="6" :xl="4" :style="{ marginBottom: '24px' }">
        <div class="work-info">
          <div class="work-info-item" @click="$router.push('/stop/break')">
            <a-badge :count="count.oaSuspend" :offset="[0,10]">
              <i class="iconfont">&#xed1a;</i>
            </a-badge>
            <p>终止/中断交易</p>
          </div>
        </div>
      </a-col>
      <a-col :sm="12" :md="6" :xl="4" :style="{ marginBottom: '24px' }">
        <div class="work-info">
          <div class="work-info-item" @click="$router.push('/order/abnormal')">
            <a-badge :count="count.oaErrorOrder" :offset="[0,10]">
              <i class="iconfont">&#xeb6c;</i>
            </a-badge>
            <p>异常订单提醒</p>
          </div>
        </div>
      </a-col>
    </a-row>

    <a-card title="超期工单" :headStyle="{marginBottom: 0}" :bodyStyle="{padding: 0}">
      <a href="#" slot="extra" @click="$router.push('/order/overdue')">查看更多</a>
      <!-- 表格 -->
      <overdue :paging="false"></overdue>
    </a-card>

    <a-card
      :bordered="false"
      title="已办工单"
      :headStyle="{marginBottom: 0}"
      :bodyStyle="{padding: 0}"
      :style="{ marginTop: '24px' }"
    >
      <a href="javascript:;" slot="extra" @click="$router.push('/order/history')">查看更多</a>
      <!-- 表格 -->
      <history :paging="false"></history>
    </a-card>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'
import overdue from '@/views/modules/order/overdue'
import history from '@/views/modules/order/history'

export default {
  name: 'Workplace',
  mixins: [baseMixin, indexMixin],
  components: {
    overdue,
    history
  }
}
</script>
