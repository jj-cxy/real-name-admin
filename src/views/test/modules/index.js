import {
  axios
} from '@/utils/request'

var indexMixin = {
  data() {
    return {
      persons: [{
        type: '负责人1',
        name: '小样1',
        phone: '18786631878',
        idCard: '52012199309135522'
      }, {
        type: '负责人2',
        name: '小样2',
        phone: '18786631879',
        idCard: '52012199309135522'
      }, {
        type: '负责人3',
        name: '小样3',
        phone: '18786631870',
        idCard: '52012199309135522'
      }],
      form: this.$form.createForm(this, {
        name: 'form'
      })
    }
  },
  filters: {},
  created() {},
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // 取值
          console.log('Received values of form: ', values);
          let contant = this.persons.map((key, index) => {
            console.log(values.name[index])
            return {
              name: values.name[index],
              phone: values.phone[index]
            }
          })
          console.log('Merged values:', contant);
        }
      });
    },
    handleSet(e) {
      e.preventDefault();
      this.persons.map((key, index) => {
        this.form.setFieldsValue({
          
        });
      })
    },
  }
}
export default indexMixin