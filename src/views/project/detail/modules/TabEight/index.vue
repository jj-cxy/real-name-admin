<template>
  <div>
    <ul class="board">
      <li>
        <img src="board.jpg" />
      </li>
      <li>
        <img src="board.jpg" />
      </li>
    </ul>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'

export default {
  name: 'punchList',
  mixins: [baseMixin, indexMixin],
  components: {}
}
</script>
<style lang="scss" scoped>
.board {
  display: flex;
  align-items: center;
  li {
    &:last-child {
      margin-right: 0;
    }
    margin-right: 24px;
    img {
      width: 600px;
    }
  }
}
</style>
